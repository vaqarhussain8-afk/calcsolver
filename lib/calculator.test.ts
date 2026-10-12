import { describe, expect, it } from "vitest";
import { appendToken, backspace, evaluateExpression, formatResult, prettify, toggleSign } from "./calculator";

function valueOf(expression: string, mode: "deg" | "rad" = "deg", ans: number | null = null): number {
  const result = evaluateExpression(expression, mode, ans);
  if (!result.ok) throw new Error(`Expected "${expression}" to evaluate`);
  return result.value;
}

describe("evaluateExpression", () => {
  it("respects operator precedence: 2+3×4 = 14", () => {
    expect(valueOf("2+3×4")).toBe(14);
    expect(valueOf("2+3*4")).toBe(14);
  });

  it("computes sin(30) in DEG mode as 0.5", () => {
    expect(valueOf("sin(30)", "deg")).toBeCloseTo(0.5, 12);
    const result = evaluateExpression("sin(30)", "deg");
    expect(result.ok && result.display).toBe("0.5");
  });

  it("uses radians in RAD mode", () => {
    expect(valueOf("sin(pi/2)", "rad")).toBeCloseTo(1, 12);
    expect(valueOf("cos(π)", "rad")).toBeCloseTo(-1, 12);
  });

  it("computes factorials: 5! = 120", () => {
    expect(valueOf("5!")).toBe(120);
  });

  it("computes square roots: √16 = 4", () => {
    expect(valueOf("√16")).toBe(4);
    expect(valueOf("√(16)")).toBe(4);
    expect(valueOf("sqrt(16)")).toBe(4);
  });

  it("computes 11/17×100 ≈ 64.70588", () => {
    expect(valueOf("11/17×100")).toBeCloseTo(64.70588, 5);
    const result = evaluateExpression("11÷17×100");
    expect(result.ok && result.display).toBe("64.70588235");
  });

  it("handles division by zero without throwing", () => {
    expect(evaluateExpression("5/0")).toEqual({ ok: false, error: "Error" });
    expect(evaluateExpression("0÷0")).toEqual({ ok: false, error: "Error" });
  });

  it("returns clean zeros and errors for special trig angles", () => {
    expect(valueOf("cos(90)")).toBe(0);
    expect(valueOf("sin(180)")).toBe(0);
    expect(evaluateExpression("tan(90)").ok).toBe(false);
  });

  it("supports log, ln, powers, percent and constants", () => {
    expect(valueOf("log(1000)")).toBeCloseTo(3, 12);
    expect(valueOf("ln(e)")).toBeCloseTo(1, 12);
    expect(valueOf("2^10")).toBe(1024);
    expect(valueOf("4^(-1)")).toBe(0.25);
    expect(valueOf("25%×80")).toBe(20);
    expect(valueOf("3/5×100")).toBe(60);
  });

  it("auto-closes parentheses and substitutes Ans", () => {
    expect(valueOf("(2+3")).toBe(5);
    expect(valueOf("Ans×2", "deg", 21)).toBe(42);
  });

  it("rejects unknown identifiers and unsafe input", () => {
    expect(evaluateExpression("import(1)").ok).toBe(false);
    expect(evaluateExpression("evaluate(1)").ok).toBe(false);
    expect(evaluateExpression("2+").ok).toBe(false);
    expect(evaluateExpression("").ok).toBe(false);
    expect(evaluateExpression("sqrt(-4)").ok).toBe(false);
  });
});

describe("formatResult", () => {
  it("rounds to 10 significant digits and strips trailing zeros", () => {
    expect(formatResult(0.1 + 0.2)).toBe("0.3");
    expect(formatResult(2 / 9)).toBe("0.2222222222");
    expect(formatResult(1.5)).toBe("1.5");
    expect(formatResult(-0)).toBe("0");
  });
});

describe("expression editing helpers", () => {
  it("adds implicit multiplication before functions and constants", () => {
    expect(appendToken("2", "pi", "constant", false)).toBe("2*pi");
    expect(appendToken("3", "sin(", "function", false)).toBe("3*sin(");
  });

  it("replaces a trailing operator", () => {
    expect(appendToken("2+", "*", "operator", false)).toBe("2*");
    expect(appendToken("2*", "-", "operator", false)).toBe("2*-");
  });

  it("starts from Ans when an operator is pressed first", () => {
    expect(appendToken("", "+", "operator", true)).toBe("Ans+");
  });

  it("removes whole tokens on backspace", () => {
    expect(backspace("2+sin(")).toBe("2+");
    expect(backspace("12")).toBe("1");
  });

  it("toggles the sign of the last number", () => {
    expect(toggleSign("3+5")).toBe("3+(-5)");
    expect(toggleSign("3+(-5)")).toBe("3+5");
  });

  it("pretty-prints for display", () => {
    expect(prettify("2*sqrt(16)/pi-1")).toBe("2×√(16)÷π−1");
  });
});
