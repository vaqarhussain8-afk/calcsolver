"use client";

import { useEffect, useReducer } from "react";
import { Delete, History } from "lucide-react";
import {
  appendToken,
  backspace,
  formatResult,
  prettify,
  toggleSign,
  type AngleMode,
  type EvalResult,
  type TokenKind,
} from "@/lib/expression";

type Evaluate = (expression: string, mode: AngleMode, ans: number | null) => EvalResult;

/**
 * mathjs is large, so the evaluator is downloaded only when the visitor first hovers, focuses or
 * types into the calculator. Keys pressed before it arrives are kept and evaluated once it loads.
 */
let evaluator: Evaluate | null = null;
let engineRequest: Promise<void> | null = null;

function loadEngine(onReady: () => void): void {
  if (evaluator) return;
  if (!engineRequest) {
    engineRequest = import("@/lib/calculator").then((engine) => {
      evaluator = engine.evaluateExpression;
    });
  }
  engineRequest.then(onReady).catch(() => {
    engineRequest = null; // allow a retry on the next interaction (e.g. after a network hiccup)
  });
}

type HistoryItem = { expression: string; result: string };

type State = {
  expr: string;
  display: string;
  lastExpr: string | null;
  ans: number | null;
  mode: AngleMode;
  error: boolean;
  history: HistoryItem[];
  /** "=" was pressed before the evaluator finished loading. */
  pendingEvaluate: boolean;
};

type Action =
  | { type: "input"; token: string; kind: TokenKind }
  | { type: "evaluate" }
  | { type: "clear" }
  | { type: "backspace" }
  | { type: "negate" }
  | { type: "mode"; mode: AngleMode }
  | { type: "load"; expression: string }
  | { type: "engine-ready" };

const initialState: State = {
  expr: "",
  display: "0",
  lastExpr: null,
  ans: null,
  mode: "deg",
  error: false,
  history: [],
  pendingEvaluate: false,
};

/** Updates the expression and refreshes the live preview (keeps the previous preview if incomplete). */
function withExpression(state: State, expr: string): State {
  const base = { ...state, expr, lastExpr: null, error: false, pendingEvaluate: false };
  if (!expr) return { ...base, display: "0" };
  const preview = evaluator?.(expr, state.mode, state.ans);
  return { ...base, display: preview?.ok ? preview.display : state.error ? "0" : state.display };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "input":
      return withExpression(state, appendToken(state.expr, action.token, action.kind, state.ans !== null));
    case "backspace":
      return withExpression(state, backspace(state.expr));
    case "negate": {
      if (!state.expr && state.lastExpr && state.ans !== null) {
        const negated = -state.ans;
        return { ...state, ans: negated, display: formatResult(negated), lastExpr: `-(${state.lastExpr})` };
      }
      return withExpression(state, toggleSign(state.expr));
    }
    case "clear":
      return { ...state, expr: "", display: "0", lastExpr: null, error: false, pendingEvaluate: false };
    case "mode": {
      const next = { ...state, mode: action.mode };
      return next.expr ? withExpression(next, next.expr) : next;
    }
    case "load":
      return withExpression(state, action.expression);
    case "engine-ready": {
      if (!state.expr) return state;
      const refreshed = withExpression(state, state.expr);
      return state.pendingEvaluate ? reducer(refreshed, { type: "evaluate" }) : refreshed;
    }
    case "evaluate": {
      if (!state.expr) return state;
      if (!evaluator) return { ...state, pendingEvaluate: true };
      const result = evaluator(state.expr, state.mode, state.ans);
      if (!result.ok) return { ...state, display: "Error", error: true };
      const item: HistoryItem = { expression: state.expr, result: result.display };
      return {
        ...state,
        expr: "",
        lastExpr: state.expr,
        display: result.display,
        ans: result.value,
        error: false,
        history: [item, ...state.history].slice(0, 5),
      };
    }
    default:
      return state;
  }
}

type Variant = "number" | "operator" | "function" | "equals" | "clear";

type Key = {
  label: string;
  aria: string;
  action: Action;
  variant: Variant;
  className?: string;
};

const input = (token: string, kind: TokenKind): Action => ({ type: "input", token, kind });

const FUNCTION_KEYS: Key[] = [
  { label: "sin", aria: "Sine", action: input("sin(", "function"), variant: "function" },
  { label: "cos", aria: "Cosine", action: input("cos(", "function"), variant: "function" },
  { label: "tan", aria: "Tangent", action: input("tan(", "function"), variant: "function" },
  { label: "log", aria: "Logarithm base 10", action: input("log(", "function"), variant: "function" },
  { label: "ln", aria: "Natural logarithm", action: input("ln(", "function"), variant: "function" },
  { label: "√", aria: "Square root", action: input("sqrt(", "function"), variant: "function" },
  { label: "x²", aria: "Square", action: input("^2", "postfix"), variant: "function" },
  { label: "x³", aria: "Cube", action: input("^3", "postfix"), variant: "function" },
  { label: "xʸ", aria: "Power", action: input("^", "operator"), variant: "function" },
  { label: "n!", aria: "Factorial", action: input("!", "postfix"), variant: "function" },
  { label: "1/x", aria: "Reciprocal", action: input("^(-1)", "postfix"), variant: "function" },
  { label: "π", aria: "Pi", action: input("pi", "constant"), variant: "function" },
  { label: "e", aria: "Euler's number", action: input("e", "constant"), variant: "function" },
  { label: "Ans", aria: "Previous answer", action: input("Ans", "constant"), variant: "function", className: "col-span-2" },
];

const MAIN_KEYS: Key[] = [
  { label: "AC", aria: "All clear", action: { type: "clear" }, variant: "clear" },
  { label: "⌫", aria: "Backspace", action: { type: "backspace" }, variant: "operator" },
  { label: "%", aria: "Percent", action: input("%", "postfix"), variant: "operator" },
  { label: "÷", aria: "Divide", action: input("/", "operator"), variant: "operator" },
  { label: "(", aria: "Open parenthesis", action: input("(", "open"), variant: "operator" },
  { label: ")", aria: "Close parenthesis", action: input(")", "close"), variant: "operator" },
  { label: "±", aria: "Toggle positive or negative", action: { type: "negate" }, variant: "operator" },
  { label: "×", aria: "Multiply", action: input("*", "operator"), variant: "operator" },
  { label: "7", aria: "7", action: input("7", "digit"), variant: "number" },
  { label: "8", aria: "8", action: input("8", "digit"), variant: "number" },
  { label: "9", aria: "9", action: input("9", "digit"), variant: "number" },
  { label: "−", aria: "Subtract", action: input("-", "operator"), variant: "operator" },
  { label: "4", aria: "4", action: input("4", "digit"), variant: "number" },
  { label: "5", aria: "5", action: input("5", "digit"), variant: "number" },
  { label: "6", aria: "6", action: input("6", "digit"), variant: "number" },
  { label: "+", aria: "Add", action: input("+", "operator"), variant: "operator" },
  { label: "1", aria: "1", action: input("1", "digit"), variant: "number" },
  { label: "2", aria: "2", action: input("2", "digit"), variant: "number" },
  { label: "3", aria: "3", action: input("3", "digit"), variant: "number" },
  { label: "=", aria: "Equals", action: { type: "evaluate" }, variant: "equals", className: "row-span-2" },
  { label: "0", aria: "0", action: input("0", "digit"), variant: "number", className: "col-span-2" },
  { label: ".", aria: "Decimal point", action: input(".", "digit"), variant: "number" },
];

const VARIANT_CLASSES: Record<Variant, string> = {
  number:
    "bg-white text-gray-900 hover:bg-gray-100 border border-gray-200 text-lg dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700",
  operator:
    "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-lg dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-900/60",
  function:
    "bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm dark:bg-gray-800/60 dark:text-gray-300 dark:hover:bg-gray-700",
  equals: "bg-indigo-600 text-white hover:bg-indigo-700 text-2xl shadow-sm",
  clear: "bg-rose-50 text-rose-700 hover:bg-rose-100 text-base dark:bg-rose-950/50 dark:text-rose-300 dark:hover:bg-rose-900/50",
};

function keyToAction(key: string): Action | null {
  if (/^[0-9]$/.test(key) || key === ".") return input(key, "digit");
  if (key === "+" || key === "-" || key === "*" || key === "/" || key === "^") return input(key, "operator");
  if (key === "(") return input("(", "open");
  if (key === ")") return input(")", "close");
  if (key === "%" || key === "!") return input(key, "postfix");
  if (key === "Enter" || key === "=") return { type: "evaluate" };
  if (key === "Backspace") return { type: "backspace" };
  if (key === "Escape" || key === "Delete") return { type: "clear" };
  return null;
}

export default function Calculator() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const requestEngine = () => loadEngine(() => dispatch({ type: "engine-ready" }));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey || event.metaKey || event.altKey || event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true'], [role='dialog']")) return;
      // Let Enter activate whichever button/link/summary is focused.
      if (event.key === "Enter" && target?.closest("button, a, summary")) return;
      const action = keyToAction(event.key);
      if (!action) return;
      event.preventDefault();
      loadEngine(() => dispatch({ type: "engine-ready" }));
      dispatch(action);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const expressionLine = state.expr
    ? prettify(state.expr)
    : state.lastExpr
      ? `${prettify(state.lastExpr)} =`
      : " ";

  return (
    <div
      className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-4 shadow-xl shadow-indigo-100/50 sm:p-5 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none"
      role="group"
      aria-label="Scientific calculator"
      onPointerEnter={requestEngine}
      onPointerDown={requestEngine}
      onFocus={requestEngine}
      aria-describedby="calculator-help"
    >
      <p id="calculator-help" className="sr-only">
        You can also type with your keyboard: digits, plus, minus, asterisk, slash, caret, parentheses, Enter for
        equals, Backspace to delete and Escape to clear.
      </p>

      <div className="mb-3 flex items-center justify-between">
        <div className="inline-flex rounded-lg bg-gray-100 p-1 dark:bg-gray-800" role="group" aria-label="Angle unit">
          {(["deg", "rad"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => dispatch({ type: "mode", mode })}
              aria-pressed={state.mode === mode}
              aria-label={mode === "deg" ? "Degrees mode" : "Radians mode"}
              className={`min-h-9 rounded-md px-3 text-xs font-semibold uppercase tracking-wide transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                state.mode === mode
                  ? "bg-white text-indigo-700 shadow-sm dark:bg-gray-950 dark:text-indigo-300"
                  : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">{state.ans !== null ? `Ans = ${formatResult(state.ans)}` : "Scientific"}</span>
      </div>

      <div className="mb-4 rounded-xl bg-gray-50 px-4 py-3 text-right dark:bg-gray-950">
        <div className="min-h-6 overflow-x-auto whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          <span className="sr-only">Expression: </span>
          {expressionLine}
        </div>
        <output
          aria-live="polite"
          aria-atomic="true"
          className={`block min-h-10 overflow-x-auto whitespace-nowrap text-3xl font-semibold tabular-nums sm:text-4xl ${
            state.error ? "text-rose-600 dark:text-rose-400" : "text-gray-900 dark:text-white"
          }`}
        >
          {state.display}
        </output>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {FUNCTION_KEYS.map((key) => (
          <CalcButton key={key.aria} item={key} onPress={dispatch} />
        ))}
      </div>

      <div className="mt-2 grid grid-cols-4 gap-2">
        {MAIN_KEYS.map((key) => (
          <CalcButton key={key.aria} item={key} onPress={dispatch} />
        ))}
      </div>

      <div className="mt-4 border-t border-gray-100 pt-3 dark:border-gray-800">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          <History className="h-3.5 w-3.5" aria-hidden="true" />
          History
        </p>
        {state.history.length === 0 ? (
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Your last 5 calculations appear here.</p>
        ) : (
          <ul className="mt-1 space-y-0.5">
            {state.history.map((item, index) => (
              <li key={`${item.expression}-${index}`}>
                <button
                  type="button"
                  onClick={() => dispatch({ type: "load", expression: item.expression })}
                  aria-label={`Reuse ${prettify(item.expression)} equals ${item.result}`}
                  className="flex w-full items-center justify-between gap-3 rounded-md px-2 py-1 text-left text-sm hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-indigo-600 dark:hover:bg-gray-800"
                >
                  <span className="truncate text-gray-500 dark:text-gray-400">{prettify(item.expression)}</span>
                  <span className="font-medium tabular-nums text-gray-900 dark:text-gray-100">= {item.result}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function CalcButton({ item, onPress }: { item: Key; onPress: (action: Action) => void }) {
  return (
    <button
      type="button"
      onClick={() => onPress(item.action)}
      aria-label={item.aria}
      className={`flex min-h-12 select-none items-center justify-center rounded-xl font-medium transition active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${VARIANT_CLASSES[item.variant]} ${item.className ?? ""}`}
    >
      {item.label === "⌫" ? <Delete className="h-5 w-5" aria-hidden="true" /> : item.label}
    </button>
  );
}
