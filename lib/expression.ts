/**
 * Lightweight expression helpers with no dependency on mathjs, so they can ship with the page.
 *
 * Expressions are stored in a compact ASCII form (e.g. "2*sqrt(16)+sin(30)") and turned into a
 * pretty form for display (e.g. "2×√(16)+sin(30)"). Evaluation lives in lib/calculator.ts.
 */

export type AngleMode = "deg" | "rad";

export type EvalResult = { ok: true; value: number; display: string } | { ok: false; error: string };

export type TokenKind = "digit" | "operator" | "postfix" | "function" | "constant" | "open" | "close";

export const MAX_EXPRESSION_LENGTH = 250;

/** Identifiers a user expression may contain (before internal rewriting). */
const ALLOWED_IDENTIFIERS = new Set(["sin", "cos", "tan", "log", "ln", "sqrt", "pi", "e", "Ans"]);

/** Rounds to 10 significant digits and strips trailing zeros. */
export function formatResult(value: number): string {
  if (value === 0) return "0";
  return String(Number(value.toPrecision(10)));
}

function countChar(text: string, char: string): number {
  let count = 0;
  for (const c of text) if (c === char) count += 1;
  return count;
}

/** Converts a user/display expression into the internal mathjs expression. Throws on invalid input. */
export function toMathExpression(expression: string, mode: AngleMode = "deg", ans: number | null = null): string {
  let s = expression
    .replace(/\s+/g, "")
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/[−–]/g, "-")
    .replace(/π/g, "pi")
    .replace(/√(\d+\.?\d*|\.\d+)/g, "sqrt($1)")
    .replace(/√/g, "sqrt");

  if (!s) throw new Error("Empty expression");
  if (s.length > MAX_EXPRESSION_LENGTH) throw new Error("Expression too long");
  if (!/^[0-9A-Za-z+\-*/^().!%]*$/.test(s)) throw new Error("Invalid character");

  for (const id of s.match(/[A-Za-z]+/g) ?? []) {
    if (!ALLOWED_IDENTIFIERS.has(id)) throw new Error(`Unknown name: ${id}`);
  }

  const opens = countChar(s, "(");
  const closes = countChar(s, ")");
  if (closes > opens) throw new Error("Unbalanced parentheses");
  s += ")".repeat(opens - closes);

  const suffix = mode === "deg" ? "Deg" : "Rad";
  s = s
    .replace(/Ans/g, `(${ans ?? 0})`)
    .replace(/log\(/g, "log10(")
    .replace(/ln\(/g, "log(")
    .replace(/(sin|cos|tan)\(/g, `$1${suffix}(`)
    // Percent: "50%" → (50/100), "(2+3)%" → (2+3)/100
    .replace(/(\d+\.?\d*|\.\d+)%/g, "($1/100)")
    .replace(/\)%/g, ")/100");

  return s;
}

/** Pretty-prints an internal expression for the display. */
export function prettify(expression: string): string {
  return expression
    .replace(/sqrt\(/g, "√(")
    .replace(/pi/g, "π")
    .replace(/\*/g, "×")
    .replace(/\//g, "÷")
    .replace(/-/g, "−");
}

const ENDS_WITH_VALUE = /(\d|\.|\)|!|%|pi|e|Ans)$/;
const ENDS_WITH_NON_DIGIT_VALUE = /(\)|!|%|pi|e|Ans)$/;
const ENDS_WITH_OPERATOR = /[+\-*/^]$/;

/** Appends a key press to the expression, applying implicit multiplication and simple guards. */
export function appendToken(expression: string, token: string, kind: TokenKind, hasAns: boolean): string {
  const expr = expression;
  if (expr.length >= MAX_EXPRESSION_LENGTH) return expr;

  switch (kind) {
    case "digit": {
      if (token === ".") {
        const currentNumber = expr.match(/[\d.]*$/)?.[0] ?? "";
        if (currentNumber.includes(".")) return expr;
        if (!/\d$/.test(expr)) return expr + (ENDS_WITH_NON_DIGIT_VALUE.test(expr) ? "*0." : "0.");
        return `${expr}.`;
      }
      if (ENDS_WITH_NON_DIGIT_VALUE.test(expr)) return `${expr}*${token}`;
      return expr + token;
    }
    case "operator": {
      if (!expr) {
        if (token === "-") return "-";
        return hasAns ? `Ans${token}` : expr;
      }
      if (expr.endsWith("(")) return token === "-" ? `${expr}-` : expr;
      if (ENDS_WITH_OPERATOR.test(expr)) {
        // Allow a negative sign after * / ^ (e.g. 2×−3), otherwise replace the last operator.
        if (token === "-" && /[*/^]$/.test(expr)) return expr + token;
        const trimmed = expr.replace(/[+\-*/^]+$/, "");
        return trimmed ? trimmed + token : token === "-" ? "-" : "";
      }
      return expr + token;
    }
    case "postfix": {
      if (!expr) return hasAns ? `Ans${token}` : expr;
      if (!ENDS_WITH_VALUE.test(expr)) return expr;
      return expr + token;
    }
    case "function":
    case "constant":
    case "open":
      return (ENDS_WITH_VALUE.test(expr) ? `${expr}*` : expr) + token;
    case "close": {
      const unclosed = countChar(expr, "(") - countChar(expr, ")");
      if (unclosed <= 0 || !ENDS_WITH_VALUE.test(expr)) return expr;
      return `${expr})`;
    }
    default:
      return expr;
  }
}

const MULTI_CHAR_TOKENS = ["^(-1)", "sqrt(", "sin(", "cos(", "tan(", "log(", "ln(", "Ans", "pi"];

/** Removes the last token (whole function names are removed at once). */
export function backspace(expression: string): string {
  for (const token of MULTI_CHAR_TOKENS) {
    if (expression.endsWith(token)) return expression.slice(0, -token.length);
  }
  return expression.slice(0, -1);
}

/** Toggles the sign of the last number: 5 → (-5) → 5. */
export function toggleSign(expression: string): string {
  if (!expression) return "-";
  const wrapped = expression.match(/\(-(\d+\.?\d*|\.\d+)\)$/);
  if (wrapped) return expression.slice(0, -wrapped[0].length) + wrapped[1];
  const number = expression.match(/(\d+\.?\d*|\.\d+)$/);
  if (number) return `${expression.slice(0, -number[0].length)}(-${number[0]})`;
  return `${expression}${ENDS_WITH_VALUE.test(expression) ? "*" : ""}(-`;
}
