"use client";

import { useEffect, useReducer, type ReactNode } from "react";
import { Calculator as CalculatorIcon, Delete, History } from "lucide-react";
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
  | { type: "engine-ready" }
  | { type: "clear-history" };

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
    case "clear-history":
      return { ...state, history: [] };
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

/** Key styles: raised keys with a soft bottom edge, grouped into clear visual tiers. */
const VARIANT_CLASSES: Record<Variant, string> = {
  function:
    "min-h-11 rounded-lg text-[13px] font-medium bg-white/80 text-gray-700 ring-1 ring-gray-300/70 shadow-[0_1px_0_0_rgb(0_0_0/0.06)] hover:bg-white dark:bg-gray-700/40 dark:text-gray-200 dark:ring-white/5 dark:hover:bg-gray-700/70",
  number:
    "min-h-14 rounded-xl text-xl font-medium bg-white text-gray-900 ring-1 ring-gray-300/70 shadow-[0_2px_0_0_rgb(0_0_0/0.08)] hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:ring-white/5 dark:shadow-[0_2px_0_0_rgb(0_0_0/0.4)] dark:hover:bg-gray-600",
  operator:
    "min-h-14 rounded-xl text-xl font-semibold bg-indigo-100 text-indigo-700 ring-1 ring-indigo-200 shadow-[0_2px_0_0_rgb(79_70_229/0.15)] hover:bg-indigo-200/80 dark:bg-indigo-500/15 dark:text-indigo-300 dark:ring-indigo-400/20 dark:shadow-[0_2px_0_0_rgb(0_0_0/0.4)] dark:hover:bg-indigo-500/25",
  clear:
    "min-h-14 rounded-xl text-base font-semibold bg-rose-100 text-rose-700 ring-1 ring-rose-200 shadow-[0_2px_0_0_rgb(225_29_72/0.15)] hover:bg-rose-200/80 dark:bg-rose-500/15 dark:text-rose-300 dark:ring-rose-400/20 dark:shadow-[0_2px_0_0_rgb(0_0_0/0.4)] dark:hover:bg-rose-500/25",
  equals:
    "min-h-14 rounded-xl text-3xl font-light bg-gradient-to-b from-indigo-500 to-indigo-700 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-700 hover:from-indigo-500 hover:to-indigo-600",
};

/** Shrinks the result font as the number gets longer so it always fits the screen. */
function resultSizeClass(text: string): string {
  if (text.length <= 10) return "text-4xl sm:text-5xl";
  if (text.length <= 14) return "text-3xl sm:text-4xl";
  return "text-2xl sm:text-3xl";
}

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
      className="w-full max-w-md rounded-[28px] bg-gradient-to-b from-gray-100 to-gray-200/80 p-3 shadow-2xl shadow-gray-900/15 ring-1 ring-gray-300/80 sm:p-4 dark:from-gray-800 dark:to-gray-900 dark:shadow-black/40 dark:ring-white/10"
      role="group"
      aria-label="Scientific calculator"
      aria-describedby="calculator-help"
      onPointerEnter={requestEngine}
      onPointerDown={requestEngine}
      onFocus={requestEngine}
    >
      <p id="calculator-help" className="sr-only">
        You can also type with your keyboard: digits, plus, minus, asterisk, slash, caret, parentheses, Enter for
        equals, Backspace to delete and Escape to clear.
      </p>

      {/* Top bar: label + angle unit */}
      <div className="mb-3 flex items-center justify-between px-1">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
          <CalculatorIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          Scientific
        </p>
        <div
          className="inline-flex rounded-lg bg-gray-300/60 p-0.5 ring-1 ring-gray-300 dark:bg-gray-950/60 dark:ring-white/5"
          role="group"
          aria-label="Angle unit"
        >
          {(["deg", "rad"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => dispatch({ type: "mode", mode })}
              aria-pressed={state.mode === mode}
              aria-label={mode === "deg" ? "Degrees mode" : "Radians mode"}
              className={`min-h-9 min-w-12 rounded-md px-3 text-xs font-bold uppercase tracking-wider transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                state.mode === mode
                  ? "bg-white text-indigo-700 shadow-sm dark:bg-gray-700 dark:text-indigo-300"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Display */}
      <div className="mb-3 rounded-2xl bg-gradient-to-b from-gray-900 to-gray-950 px-4 pb-4 pt-3 text-right shadow-inner ring-1 ring-black/60">
        <div className="flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-wider" aria-hidden="true">
          <span className="flex gap-2">
            <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-indigo-300">{state.mode}</span>
            {state.history.length > 0 ? (
              <span className="rounded bg-white/5 px-1.5 py-0.5 text-gray-400">{state.history.length} in history</span>
            ) : null}
          </span>
          <span className="truncate font-mono normal-case tracking-normal text-gray-400">
            {state.ans !== null ? `Ans = ${formatResult(state.ans)}` : ""}
          </span>
        </div>
        <div className="mt-3 min-h-6 overflow-x-auto whitespace-nowrap font-mono text-sm text-gray-400">
          <span className="sr-only">Expression: </span>
          {expressionLine}
        </div>
        <output
          aria-live="polite"
          aria-atomic="true"
          className={`mt-1 block min-h-12 overflow-x-auto whitespace-nowrap font-light tabular-nums tracking-tight ${resultSizeClass(state.display)} ${
            state.error ? "text-rose-400" : "text-white"
          }`}
        >
          {state.display}
        </output>
      </div>

      {/* Function keys */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {FUNCTION_KEYS.map((key) => (
          <CalcButton key={key.aria} item={key} onPress={dispatch} />
        ))}
      </div>

      {/* Main keypad */}
      <div className="mt-3 grid grid-cols-4 gap-2 border-t border-gray-300/70 pt-3 dark:border-white/5">
        {MAIN_KEYS.map((key) => (
          <CalcButton key={key.aria} item={key} onPress={dispatch} />
        ))}
      </div>

      {/* History */}
      <div className="mt-3 rounded-2xl bg-white/70 p-3 ring-1 ring-gray-300/60 dark:bg-gray-950/40 dark:ring-white/5">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            <History className="h-3.5 w-3.5" aria-hidden="true" />
            History
          </p>
          {state.history.length > 0 ? (
            <button
              type="button"
              onClick={() => dispatch({ type: "clear-history" })}
              className="min-h-8 rounded-md px-2 text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus-visible:outline-2 focus-visible:outline-indigo-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            >
              Clear history
            </button>
          ) : null}
        </div>
        {state.history.length === 0 ? (
          <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
            Your last 5 calculations appear here. Tap one to reuse it.
          </p>
        ) : (
          <ul className="mt-1.5 divide-y divide-gray-200/70 dark:divide-white/5">
            {state.history.map((item, index) => (
              <li key={`${item.expression}-${index}`}>
                <button
                  type="button"
                  onClick={() => dispatch({ type: "load", expression: item.expression })}
                  aria-label={`Reuse ${prettify(item.expression)} equals ${item.result}`}
                  className="flex min-h-10 w-full items-center justify-between gap-3 rounded-md px-2 text-left text-sm hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-indigo-600 dark:hover:bg-gray-800"
                >
                  <span className="truncate font-mono text-xs text-gray-500 dark:text-gray-400">
                    {prettify(item.expression)}
                  </span>
                  <span className="shrink-0 font-semibold tabular-nums text-gray-900 dark:text-gray-100">
                    = {item.result}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Keyboard hints (larger screens only) */}
      <p
        className="mt-3 hidden items-center justify-center gap-3 text-[11px] text-gray-500 sm:flex dark:text-gray-400"
        aria-hidden="true"
      >
        <span>Keyboard ready:</span>
        <span>
          <Kbd>Enter</Kbd> equals
        </span>
        <span>
          <Kbd>Esc</Kbd> clear
        </span>
        <span>
          <Kbd>⌫</Kbd> delete
        </span>
      </p>
    </div>
  );
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="rounded border border-gray-300 bg-white px-1.5 py-0.5 font-sans text-[10px] font-semibold text-gray-600 shadow-[0_1px_0_0_rgb(0_0_0/0.08)] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
      {children}
    </kbd>
  );
}

function CalcButton({ item, onPress }: { item: Key; onPress: (action: Action) => void }) {
  return (
    <button
      type="button"
      onClick={() => onPress(item.action)}
      aria-label={item.aria}
      className={`flex select-none items-center justify-center transition duration-100 active:translate-y-px active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${VARIANT_CLASSES[item.variant]} ${item.className ?? ""}`}
    >
      {item.label === "⌫" ? <Delete className="h-5 w-5" aria-hidden="true" /> : item.label}
    </button>
  );
}
