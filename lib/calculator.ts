import { all, create } from "mathjs";
import { formatResult, toMathExpression, type AngleMode, type EvalResult } from "./expression";

/**
 * Calculator engine: evaluates expressions with a locked-down mathjs instance — never eval() or
 * new Function(). mathjs is large, so the Calculator component loads this module on demand;
 * the lightweight editing helpers live in lib/expression.ts and are re-exported here.
 */

export * from "./expression";

const DEG_TO_RAD = Math.PI / 180;

const math = create(all, { number: "number", predictable: true });

function toNumberArg(x: unknown): number {
  if (typeof x !== "number" || Number.isNaN(x)) throw new Error("Invalid argument");
  return x;
}

/** Floating-point noise such as sin(180°) = 1.2e-16 becomes a clean 0. */
function snapToZero(value: number): number {
  return Math.abs(value) < 1e-12 ? 0 : value;
}

function tangent(radians: number): number {
  const value = Math.tan(radians);
  if (!Number.isFinite(value) || Math.abs(value) > 1e15) throw new Error("Undefined");
  return snapToZero(value);
}

math.import(
  {
    sinDeg: (x: unknown) => snapToZero(Math.sin(toNumberArg(x) * DEG_TO_RAD)),
    cosDeg: (x: unknown) => snapToZero(Math.cos(toNumberArg(x) * DEG_TO_RAD)),
    tanDeg: (x: unknown) => {
      const degrees = toNumberArg(x);
      const remainder = ((degrees % 180) + 180) % 180;
      if (remainder === 90) throw new Error("Undefined");
      return tangent(degrees * DEG_TO_RAD);
    },
    sinRad: (x: unknown) => snapToZero(Math.sin(toNumberArg(x))),
    cosRad: (x: unknown) => snapToZero(Math.cos(toNumberArg(x))),
    tanRad: (x: unknown) => tangent(toNumberArg(x)),
  },
  {},
);

// Keep a private reference to evaluate, then disable every function that could be abused
// from inside an expression (recommended by the mathjs security guide).
const limitedEvaluate = math.evaluate;

const disabled = () => {
  throw new Error("Function disabled");
};

math.import(
  {
    import: disabled,
    createUnit: disabled,
    evaluate: disabled,
    parse: disabled,
    simplify: disabled,
    derivative: disabled,
    resolve: disabled,
    reviver: disabled,
  },
  { override: true },
);

export function evaluateExpression(expression: string, mode: AngleMode = "deg", ans: number | null = null): EvalResult {
  try {
    const mathExpression = toMathExpression(expression, mode, ans);
    const value: unknown = limitedEvaluate(mathExpression);
    if (typeof value !== "number" || !Number.isFinite(value)) {
      return { ok: false, error: "Error" };
    }
    return { ok: true, value, display: formatResult(value) };
  } catch {
    return { ok: false, error: "Error" };
  }
}
