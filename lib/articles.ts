export type ArticleCategory = "Basic Algebra" | "Percent & Decimal" | "Fractions";

export type ArticleSection = {
  heading: string;
  paragraphs?: string[];
  steps?: string[];
  list?: string[];
  table?: { headers: string[]; rows: string[][] };
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
  /** One-line answer shown in a highlighted box at the top of the article. */
  answer: string;
  intro: string[];
  sections: ArticleSection[];
  /** What to type into the calculator to check the answer. */
  tryIt: string;
  datePublished: string;
  dateModified: string;
};

export const CATEGORIES: { name: ArticleCategory; id: string; description: string }[] = [
  {
    name: "Basic Algebra",
    id: "basic-algebra",
    description: "Solve equations, follow the order of operations and isolate x with clear, worked steps.",
  },
  {
    name: "Percent & Decimal",
    id: "percent-decimal",
    description: "Turn fractions into decimals and percentages, with rounding explained.",
  },
  {
    name: "Fractions",
    id: "fractions",
    description: "Find equivalent fractions and simplify fractions to lowest terms.",
  },
];

export const ARTICLES: Article[] = [
  // ───────────────────────── Percent & Decimal ─────────────────────────
  {
    slug: "11-17-as-a-percentage",
    title: "What Is 11/17 as a Percentage? (Step-by-Step)",
    description:
      "11/17 as a percentage is about 64.71%. See the division, the long-division digits and how to round 11/17 correctly.",
    category: "Percent & Decimal",
    answer: "11/17 = 0.6470588… ≈ 64.71% (rounded to two decimal places).",
    intro: [
      "Seventeen is an awkward denominator. It does not divide evenly into 100, so there is no quick way to rewrite 11/17 as a fraction out of 100. Instead, you divide and then move the decimal point. This guide walks through each step and explains why the answer repeats.",
      "This fraction shows up often in test scores. If you answered 11 questions correctly out of 17, your score is the same as 11/17 written as a percentage.",
    ],
    sections: [
      {
        heading: "Step-by-step: convert 11/17 to a percentage",
        steps: [
          "Write the fraction as a division problem: 11 ÷ 17.",
          "Divide. 11 ÷ 17 = 0.6470588235… (the digits keep going).",
          "Multiply the decimal by 100 to turn it into a percent: 0.6470588235 × 100 = 64.70588235.",
          "Round to the precision you need: 64.71% (two decimals), 64.7% (one decimal) or 65% (whole number).",
        ],
      },
      {
        heading: "Checking the digits with long division",
        paragraphs: [
          "Seventeen goes into 110 six times (102), leaving 8. Bring down a zero: 80 ÷ 17 = 4 remainder 12. Then 120 ÷ 17 = 7 remainder 1, 10 ÷ 17 = 0 remainder 10, and 100 ÷ 17 = 5 remainder 15. Reading the quotient digits gives 0.64705…, which matches the calculator.",
          "Because 17 is a prime number that does not share a factor with 10, the decimal never ends. It repeats in a block of 16 digits: 0.6470588235294117 6470588235294117… That is why you always round when you write 11/17 as a percentage.",
        ],
      },
      {
        heading: "Rounding 11/17 for different uses",
        table: {
          headers: ["Precision", "Result"],
          rows: [
            ["Decimal (4 places)", "0.6471"],
            ["Percent (2 decimals)", "64.71%"],
            ["Percent (1 decimal)", "64.7%"],
            ["Percent (whole number)", "65%"],
          ],
        },
      },
      {
        heading: "Related seventeenths",
        paragraphs: [
          "Once you know that 1/17 ≈ 5.88%, you can estimate any seventeenth. For example, 9/17 ≈ 52.94%, 13/17 ≈ 76.47% and 15/17 ≈ 88.24%. Multiplying 11 × 5.882352941% gives 64.70588%, the same answer as before.",
          "Tip: when a teacher asks for a percentage without saying how to round, two decimal places (64.71%) is a safe and common choice.",
        ],
      },
      {
        heading: "Using 11/17 with real quantities",
        paragraphs: [
          "To find 11/17 of an amount, multiply the amount by 11 and then divide by 17. For 340 people, 340 × 11 = 3,740 and 3,740 ÷ 17 = 220, so 220 people is exactly 11/17 of the group—about 64.71% of it. Doing the multiplication first keeps the arithmetic exact for as long as possible.",
        ],
      },
    ],
    tryIt: "11 ÷ 17 × 100",
    datePublished: "2026-09-01",
    dateModified: "2026-10-12",
  },
  {
    slug: "3-5-as-a-percentage",
    title: "What Is 3/5 as a Percentage? Simple Explanation",
    description: "3/5 as a percentage is exactly 60%. Learn two quick methods—scaling to 100 and dividing—to convert 3/5.",
    category: "Percent & Decimal",
    answer: "3/5 = 0.6 = 60% exactly.",
    intro: [
      "Three fifths is one of the friendliest fractions to convert, because 5 divides evenly into 100. That means the answer is exact—no rounding needed. Below are two methods you can use for 3/5 and for any fraction with a denominator that is a factor of 100.",
    ],
    sections: [
      {
        heading: "Method 1: scale the fraction to a denominator of 100",
        steps: [
          "Ask what number turns 5 into 100: 100 ÷ 5 = 20.",
          "Multiply the top and bottom by 20: (3 × 20) / (5 × 20) = 60/100.",
          "“Per cent” means “per hundred,” so 60/100 = 60%.",
        ],
      },
      {
        heading: "Method 2: divide, then multiply by 100",
        steps: [
          "Divide the numerator by the denominator: 3 ÷ 5 = 0.6.",
          "Multiply by 100: 0.6 × 100 = 60.",
          "Add the percent sign: 60%.",
        ],
        paragraphs: [
          "Method 2 works for every fraction, including awkward ones like 11/17. Method 1 is faster when the denominator divides into 100 (2, 4, 5, 10, 20, 25 and 50).",
        ],
      },
      {
        heading: "Fifths as percentages",
        table: {
          headers: ["Fraction", "Decimal", "Percentage"],
          rows: [
            ["1/5", "0.2", "20%"],
            ["2/5", "0.4", "40%"],
            ["3/5", "0.6", "60%"],
            ["4/5", "0.8", "80%"],
            ["5/5", "1", "100%"],
          ],
        },
        paragraphs: [
          "Every fifth adds another 20%, so it is easy to memorize this table.",
        ],
      },
      {
        heading: "Where you might see 3/5",
        list: [
          "A quiz score of 3 out of 5 is 60%.",
          "If 3 out of every 5 students walk to school, 60% of the class walks.",
          "A recipe that uses 3/5 of a cup uses 60% of the cup.",
        ],
        paragraphs: [
          "A common mistake is to write 3/5 as 35% by reading the digits side by side. Always divide or scale—the answer is 60%.",
        ],
      },
      {
        heading: "Going backwards: 60% to a fraction",
        steps: [
          "Write the percent over 100: 60% = 60/100.",
          "Find the greatest common factor of 60 and 100, which is 20.",
          "Divide both numbers by 20: 60/100 = 3/5.",
        ],
        paragraphs: [
          "Being able to move in both directions is useful on tests, where an answer may be given as a percentage but asked for as a fraction in lowest terms. It also lets you double-check your work: if 3/5 really is 60%, then simplifying 60/100 must bring you back to 3/5.",
        ],
      },
    ],
    tryIt: "3 ÷ 5 × 100",
    datePublished: "2026-09-01",
    dateModified: "2026-10-12",
  },
  {
    slug: "2-9-as-a-decimal",
    title: "2/9 as a Decimal and Percentage (0.2̅ and 22.22%)",
    description:
      "2/9 as a decimal is 0.2222… (a repeating 2) and as a percentage is about 22.22%. See why ninths repeat and how to round.",
    category: "Percent & Decimal",
    answer: "2/9 = 0.2222… (written 0.2̅) ≈ 22.22%.",
    intro: [
      "Students often search for “2 9 as a decimal” when a worksheet asks them to convert two ninths. The result is a repeating decimal: the digit 2 continues forever. Here is how to find it, how to write it correctly and how to turn it into a percentage.",
    ],
    sections: [
      {
        heading: "Converting 2/9 to a decimal",
        steps: [
          "Set up the division 2 ÷ 9. Because 9 does not fit into 2, write 0 and a decimal point.",
          "Bring down a zero: 20 ÷ 9 = 2 remainder 2.",
          "Bring down another zero: 20 ÷ 9 = 2 remainder 2 again.",
          "The remainder is always 2, so the digit 2 repeats forever: 0.2222…",
        ],
        paragraphs: [
          "In math class this is written with a bar over the repeating digit: 0.2̅. On a calculator display you will see 0.2222222222 because the screen can only show a limited number of digits.",
        ],
      },
      {
        heading: "Converting 2/9 to a percentage",
        steps: [
          "Start with the decimal: 0.2222…",
          "Multiply by 100: 22.222…",
          "Round to two decimal places: 22.22%. Exactly, 2/9 = 22 2⁄9 %.",
        ],
      },
      {
        heading: "The pattern for all ninths",
        paragraphs: [
          "Any fraction with 9 in the denominator (and a numerator from 1 to 8) produces the numerator as a repeating digit. That makes ninths easy to remember once you see the pattern.",
        ],
        table: {
          headers: ["Fraction", "Decimal", "Percentage (rounded)"],
          rows: [
            ["1/9", "0.1111…", "11.11%"],
            ["2/9", "0.2222…", "22.22%"],
            ["4/9", "0.4444…", "44.44%"],
            ["5/9", "0.5555…", "55.56%"],
            ["7/9", "0.7777…", "77.78%"],
          ],
        },
      },
      {
        heading: "Common mistakes",
        list: [
          "Writing 2/9 as 0.29 by placing the digits after a decimal point.",
          "Rounding 0.2222… to 0.23 instead of 0.22 (the next digit is 2, so you round down).",
          "Forgetting the bar notation when an exact answer is required.",
        ],
      },
      {
        heading: "Turning 0.2̅ back into 2/9",
        paragraphs: [
          "A neat algebra trick proves the answer. Let x = 0.2222… Multiply both sides by 10 to get 10x = 2.2222… Now subtract the first equation from the second: 10x − x = 2.2222… − 0.2222…, which leaves 9x = 2. Dividing by 9 gives x = 2/9. The endless tail of 2s cancels out, which is exactly why the repeating decimal and the fraction are equal.",
        ],
      },
    ],
    tryIt: "2 ÷ 9",
    datePublished: "2026-09-02",
    dateModified: "2026-10-12",
  },
  {
    slug: "1-8-as-a-percentage",
    title: "What Is 1/8 as a Percentage? Answer: 12.5%",
    description: "1/8 as a percentage is 12.5%. Learn the division method, a halving shortcut and the full table of eighths.",
    category: "Percent & Decimal",
    answer: "1/8 = 0.125 = 12.5% exactly.",
    intro: [
      "One eighth appears in measurements, recipes and pizza slices. Because 8 is a power of 2, the decimal ends after three digits, so 1/8 has an exact percentage with no rounding.",
    ],
    sections: [
      {
        heading: "Divide and multiply by 100",
        steps: [
          "Divide 1 by 8: 1 ÷ 8 = 0.125.",
          "Multiply by 100 to convert to a percent: 0.125 × 100 = 12.5.",
          "Answer: 1/8 = 12.5%.",
        ],
      },
      {
        heading: "The halving shortcut",
        paragraphs: [
          "If you remember that one half is 50%, you can halve your way to one eighth: half of 50% is 25% (one quarter), and half of 25% is 12.5% (one eighth). This mental trick is handy when you do not have a calculator nearby.",
        ],
      },
      {
        heading: "Scaling to 100",
        paragraphs: [
          "To make the denominator 100, multiply 8 by 12.5. Do the same to the numerator: 1 × 12.5 = 12.5. That gives 12.5/100, which is 12.5%. Decimals in the numerator are fine when you scale this way.",
        ],
      },
      {
        heading: "All eighths as percentages",
        table: {
          headers: ["Fraction", "Decimal", "Percentage"],
          rows: [
            ["1/8", "0.125", "12.5%"],
            ["2/8 (= 1/4)", "0.25", "25%"],
            ["3/8", "0.375", "37.5%"],
            ["4/8 (= 1/2)", "0.5", "50%"],
            ["5/8", "0.625", "62.5%"],
            ["6/8 (= 3/4)", "0.75", "75%"],
            ["7/8", "0.875", "87.5%"],
          ],
        },
        paragraphs: [
          "Each eighth adds 12.5%, so you can build any row of this table by multiplying the numerator by 12.5.",
        ],
      },
      {
        heading: "Quick check",
        paragraphs: [
          "Eight slices of 12.5% each add up to 100%, which confirms the answer. On the solve calculator, type 1 ÷ 8 × 100 and press equals to see 12.5.",
        ],
      },
      {
        heading: "One eighth in everyday life",
        list: [
          "Measuring: 1/8 inch = 0.125 inch, a common mark on tape measures and rulers.",
          "Cooking: 1/8 cup equals 2 tablespoons, because a cup holds 16 tablespoons.",
          "Shopping: a 12.5% discount is the same as taking 1/8 off the price, so $40 becomes $35.",
          "Time: 1/8 of an hour is 7.5 minutes.",
        ],
        paragraphs: [
          "Recognizing 12.5% as one eighth turns many mental-math problems into a single division by 8.",
        ],
      },
    ],
    tryIt: "1 ÷ 8 × 100",
    datePublished: "2026-09-03",
    dateModified: "2026-10-12",
  },
  {
    slug: "7-20-as-a-percentage",
    title: "What Is 7/20 as a Percentage? Answer: 35%",
    description: "7/20 as a percentage is 35%. Convert it by scaling the denominator to 100 or by dividing 7 by 20.",
    category: "Percent & Decimal",
    answer: "7/20 = 0.35 = 35% exactly.",
    intro: [
      "Twentieths are easy to convert because 20 × 5 = 100. A score of 7 out of 20 on a quiz, for example, is exactly 35%. Here are two reliable ways to get there.",
    ],
    sections: [
      {
        heading: "Method 1: multiply to get 100 on the bottom",
        steps: [
          "Find the multiplier: 100 ÷ 20 = 5.",
          "Multiply numerator and denominator by 5: (7 × 5) / (20 × 5) = 35/100.",
          "Read it as a percent: 35/100 = 35%.",
        ],
      },
      {
        heading: "Method 2: divide on the calculator",
        steps: [
          "Divide: 7 ÷ 20 = 0.35.",
          "Multiply by 100: 0.35 × 100 = 35.",
          "Write the answer: 35%.",
        ],
      },
      {
        heading: "Twentieths reference table",
        table: {
          headers: ["Fraction", "Decimal", "Percentage"],
          rows: [
            ["1/20", "0.05", "5%"],
            ["3/20", "0.15", "15%"],
            ["7/20", "0.35", "35%"],
            ["9/20", "0.45", "45%"],
            ["11/20", "0.55", "55%"],
          ],
        },
        paragraphs: [
          "Every twentieth is worth 5%, so multiply the numerator by 5 for an instant answer.",
        ],
      },
      {
        heading: "Real-life example",
        paragraphs: [
          "Imagine a class of 20 students where 7 choose a science club. The share of the class in the science club is 7/20, or 35%. The other 13/20 (65%) chose something else, and 35% + 65% = 100%, which confirms the math.",
          "Remember that a fraction greater than 20/20 gives a percentage above 100%. For example, 25/20 = 125%.",
        ],
      },
      {
        heading: "Finding 35% of a number",
        paragraphs: [
          "Because 7/20 and 35% are the same value, you can use either form to take a portion of a quantity. To find 35% of 80, multiply 80 by 0.35 to get 28. Using the fraction gives the same result: 80 ÷ 20 = 4, and 4 × 7 = 28. Picking the form that makes the arithmetic easier is a valuable mental-math habit.",
        ],
      },
      {
        heading: "Converting 35% back to 7/20",
        steps: [
          "Write 35% as 35/100.",
          "The greatest common factor of 35 and 100 is 5.",
          "Divide both by 5: 35/100 = 7/20.",
        ],
        paragraphs: [
          "Practice: 13/20 = 65% and 17/20 = 85%. Multiply each numerator by 5 and check your answers with the calculator.",
        ],
      },
    ],
    tryIt: "7 ÷ 20 × 100",
    datePublished: "2026-09-04",
    dateModified: "2026-10-12",
  },
  {
    slug: "how-to-convert-fraction-to-percentage",
    title: "How to Convert a Fraction to a Percentage (3 Methods)",
    description:
      "Learn three ways to convert any fraction to a percentage: scaling to 100, dividing, and using a proportion—with worked examples.",
    category: "Percent & Decimal",
    answer: "Divide the numerator by the denominator, then multiply by 100 and add “%”.",
    intro: [
      "A percentage is simply a fraction with a denominator of 100. Converting a fraction to a percentage means finding out how many parts out of 100 it represents. There are three methods worth knowing, and each one has a situation where it shines.",
    ],
    sections: [
      {
        heading: "Method 1: divide and multiply by 100 (works every time)",
        steps: [
          "Divide the top number by the bottom number.",
          "Multiply the result by 100.",
          "Round if necessary and add the % sign.",
        ],
        paragraphs: [
          "Example: 5/8 → 5 ÷ 8 = 0.625 → 0.625 × 100 = 62.5%. Example with rounding: 7/12 → 7 ÷ 12 = 0.58333… → 58.33%.",
        ],
      },
      {
        heading: "Method 2: scale the denominator to 100",
        paragraphs: [
          "If the denominator divides evenly into 100, multiply the top and bottom by the same number. For 9/25, multiply by 4 to get 36/100, which is 36%. For 13/20, multiply by 5 to get 65/100, or 65%. This method is quick and needs no calculator.",
        ],
      },
      {
        heading: "Method 3: set up a proportion",
        paragraphs: [
          "Write the fraction equal to x/100 and solve for x. For 3/8: 3/8 = x/100, so 8x = 300 and x = 37.5. The answer is 37.5%. This is helpful when you are learning algebra because it connects percentages to solving equations.",
        ],
      },
      {
        heading: "Worked examples",
        table: {
          headers: ["Fraction", "Division", "Percentage"],
          rows: [
            ["3/5", "3 ÷ 5 = 0.6", "60%"],
            ["1/8", "1 ÷ 8 = 0.125", "12.5%"],
            ["7/20", "7 ÷ 20 = 0.35", "35%"],
            ["2/9", "2 ÷ 9 = 0.2222…", "22.22%"],
            ["11/17", "11 ÷ 17 = 0.6470…", "64.71%"],
          ],
        },
      },
      {
        heading: "Tips for accuracy",
        list: [
          "Do the division first, then multiply—do not multiply the denominator by 100.",
          "Keep a few extra digits until the final step, then round once.",
          "Check your answer: a fraction less than 1 must give a percentage below 100%.",
          "Mixed numbers like 1 1/4 become improper fractions first: 5/4 = 125%.",
        ],
      },
      {
        heading: "Going the other way: percentage to fraction",
        paragraphs: [
          "To reverse the process, write the percentage over 100 and simplify. For example, 45% = 45/100 = 9/20, and 12.5% = 12.5/100 = 125/1000 = 1/8.",
        ],
      },
    ],
    tryIt: "5 ÷ 8 × 100",
    datePublished: "2026-09-05",
    dateModified: "2026-10-12",
  },

  // ───────────────────────── Fractions ─────────────────────────
  {
    slug: "equivalent-fractions-of-2-3",
    title: "Equivalent Fractions of 2/3 (List and Method)",
    description:
      "Find equivalent fractions of 2/3 such as 4/6, 6/9 and 8/12. Learn the multiply-top-and-bottom rule and how to check any pair.",
    category: "Fractions",
    answer: "2/3 = 4/6 = 6/9 = 8/12 = 10/15 = 12/18 = 14/21 = 16/24 …",
    intro: [
      "Equivalent fractions name the same amount using different numbers. Two thirds of a pizza is the same as four sixths or six ninths—the slices are just cut differently. This page lists the equivalent fractions of 2/3 and shows how to find as many as you need.",
    ],
    sections: [
      {
        heading: "The rule: multiply the top and bottom by the same number",
        steps: [
          "Pick any whole number greater than 1, for example 4.",
          "Multiply the numerator: 2 × 4 = 8.",
          "Multiply the denominator: 3 × 4 = 12.",
          "The new fraction 8/12 is equivalent to 2/3.",
        ],
        paragraphs: [
          "This works because multiplying by 4/4 is the same as multiplying by 1, and multiplying by 1 never changes a value.",
        ],
      },
      {
        heading: "List of fractions equivalent to 2/3",
        table: {
          headers: ["Multiply by", "Equivalent fraction"],
          rows: [
            ["2", "4/6"],
            ["3", "6/9"],
            ["4", "8/12"],
            ["5", "10/15"],
            ["6", "12/18"],
            ["7", "14/21"],
            ["8", "16/24"],
            ["9", "18/27"],
            ["10", "20/30"],
          ],
        },
      },
      {
        heading: "How to check if a fraction equals 2/3",
        paragraphs: [
          "Use cross-multiplication. To test 14/21, multiply 2 × 21 = 42 and 3 × 14 = 42. The products match, so the fractions are equivalent. To test 10/16, multiply 2 × 16 = 32 and 3 × 10 = 30. The products differ, so 10/16 is not equal to 2/3.",
          "You can also divide: every fraction equal to 2/3 gives 0.6666… on a calculator, or about 66.67%.",
        ],
      },
      {
        heading: "Finding a missing number",
        paragraphs: [
          "Problems often ask you to fill a blank, such as 2/3 = ?/27. Since 3 × 9 = 27, multiply the top by 9 as well: 2 × 9 = 18. The answer is 18/27. For 2/3 = 20/?, notice 2 × 10 = 20, so the denominator is 3 × 10 = 30.",
        ],
      },
      {
        heading: "2/3 as a decimal and percentage",
        paragraphs: [
          "Dividing 2 by 3 gives 0.6666…, a repeating decimal written 0.6̅. Multiplying by 100 gives about 66.67%. Every fraction in the list above produces exactly the same decimal, which is another quick way to confirm that they are equivalent.",
        ],
      },
    ],
    tryIt: "14 ÷ 21",
    datePublished: "2026-09-06",
    dateModified: "2026-10-12",
  },
  {
    slug: "equivalent-fractions-of-3-4",
    title: "Equivalent Fractions of 3/4 (Chart and Examples)",
    description:
      "Equivalent fractions of 3/4 include 6/8, 9/12, 12/16 and 75/100. See a full chart, a visual explanation and quick checks.",
    category: "Fractions",
    answer: "3/4 = 6/8 = 9/12 = 12/16 = 15/20 = 18/24 = 75/100 …",
    intro: [
      "Three quarters is everywhere: 75 cents is three quarters of a dollar, and 45 minutes is three quarters of an hour. Knowing its equivalent fractions makes it easier to compare, add and subtract fractions that use different denominators.",
    ],
    sections: [
      {
        heading: "Building equivalent fractions of 3/4",
        steps: [
          "Choose a multiplier, such as 3.",
          "Multiply the numerator: 3 × 3 = 9.",
          "Multiply the denominator: 4 × 3 = 12.",
          "So 9/12 is equivalent to 3/4.",
        ],
      },
      {
        heading: "Chart of fractions equal to 3/4",
        table: {
          headers: ["Multiplier", "Equivalent fraction"],
          rows: [
            ["2", "6/8"],
            ["3", "9/12"],
            ["4", "12/16"],
            ["5", "15/20"],
            ["6", "18/24"],
            ["7", "21/28"],
            ["8", "24/32"],
            ["9", "27/36"],
            ["10", "30/40"],
            ["25", "75/100"],
          ],
        },
        paragraphs: [
          "The last row is especially useful: 75/100 shows that 3/4 = 0.75 = 75%.",
        ],
      },
      {
        heading: "Seeing it visually",
        paragraphs: [
          "Draw a rectangle and split it into 4 equal columns, then shade 3. Now draw a horizontal line through the middle. You have 8 equal pieces and 6 are shaded—6/8. The shaded area did not change, only the number of pieces. That is the idea behind every equivalent fraction.",
        ],
      },
      {
        heading: "Using 3/4 in addition",
        paragraphs: [
          "To add 3/4 + 1/8, rewrite 3/4 as 6/8 so both fractions share a denominator. Then 6/8 + 1/8 = 7/8. Without equivalent fractions, adding fractions with different denominators would be much harder.",
          "To check a pair quickly, cross-multiply. For 18/24: 3 × 24 = 72 and 4 × 18 = 72, so they are equal.",
        ],
      },
      {
        heading: "Comparing other fractions with 3/4",
        paragraphs: [
          "Equivalent fractions also help you decide which of two fractions is larger. Is 5/8 more or less than 3/4? Rewrite 3/4 as 6/8; since 6/8 is greater than 5/8, three quarters is larger.",
          "For 7/9 versus 3/4, use a common denominator of 36: 7/9 = 28/36 and 3/4 = 27/36. So 7/9 is slightly larger. Cross-multiplying gives the same verdict faster: 7 × 4 = 28 is greater than 3 × 9 = 27.",
        ],
      },
    ],
    tryIt: "18 ÷ 24",
    datePublished: "2026-09-07",
    dateModified: "2026-10-12",
  },
  {
    slug: "simplify-fractions-guide",
    title: "How to Simplify Fractions: A Step-by-Step Guide",
    description:
      "Simplify any fraction to lowest terms using the greatest common factor or repeated division. Includes worked examples and the Euclidean method.",
    category: "Fractions",
    answer: "Divide the numerator and denominator by their greatest common factor (GCF).",
    intro: [
      "A fraction is in simplest form when the top and bottom share no common factor other than 1. Simplifying makes answers cleaner and easier to compare. Teachers usually expect final answers in lowest terms, so this skill is worth mastering.",
    ],
    sections: [
      {
        heading: "Method 1: divide by the greatest common factor",
        steps: [
          "List the factors of both numbers, or use prime factorization.",
          "Find the largest factor they share—the GCF.",
          "Divide the numerator and the denominator by the GCF.",
        ],
        paragraphs: [
          "Example: simplify 18/24. Factors of 18 are 1, 2, 3, 6, 9, 18. Factors of 24 are 1, 2, 3, 4, 6, 8, 12, 24. The GCF is 6, so 18/24 = (18 ÷ 6)/(24 ÷ 6) = 3/4.",
        ],
      },
      {
        heading: "Method 2: divide in smaller steps",
        paragraphs: [
          "If you cannot spot the GCF right away, divide by any common factor and repeat. For 36/48: both are even, so divide by 2 to get 18/24. Divide by 2 again: 9/12. Both are divisible by 3: 3/4. No common factor remains, so 3/4 is the simplest form.",
        ],
      },
      {
        heading: "Method 3: the Euclidean algorithm for big numbers",
        paragraphs: [
          "For large numbers, find the GCF by repeated division. To simplify 84/126: 126 = 1 × 84 + 42, then 84 = 2 × 42 + 0. The last non-zero remainder, 42, is the GCF. So 84/126 = 2/3.",
        ],
      },
      {
        heading: "Practice problems with answers",
        table: {
          headers: ["Fraction", "GCF", "Simplest form"],
          rows: [
            ["18/24", "6", "3/4"],
            ["36/48", "12", "3/4"],
            ["45/75", "15", "3/5"],
            ["84/126", "42", "2/3"],
            ["14/21", "7", "2/3"],
          ],
        },
      },
      {
        heading: "Helpful divisibility rules",
        list: [
          "Divisible by 2: the last digit is even.",
          "Divisible by 3: the digits add up to a multiple of 3.",
          "Divisible by 5: the last digit is 0 or 5.",
          "Divisible by 10: the last digit is 0.",
        ],
        paragraphs: [
          "To confirm your work, divide both fractions on a calculator. 45 ÷ 75 and 3 ÷ 5 both equal 0.6, so the simplification is correct.",
        ],
      },
      {
        heading: "Why simplest form matters",
        paragraphs: [
          "Simplified fractions are easier to read, compare and use in later steps. It is much clearer that 3/4 is larger than 2/3 than it is to compare 36/48 with 84/126, even though those pairs are equal.",
        ],
      },
    ],
    tryIt: "45 ÷ 75",
    datePublished: "2026-09-08",
    dateModified: "2026-10-12",
  },

  // ───────────────────────── Basic Algebra ─────────────────────────
  {
    slug: "solve-linear-equations",
    title: "How to Solve Linear Equations (With Examples)",
    description:
      "Solve one-variable linear equations step by step: combine like terms, move variables to one side and check your answer.",
    category: "Basic Algebra",
    answer: "Undo operations in reverse order, keep the equation balanced, then check by substituting.",
    intro: [
      "A linear equation has a variable raised only to the first power, such as 3x + 7 = 22. Solving it means finding the value of x that makes both sides equal. The key idea is balance: whatever you do to one side, you must do to the other.",
    ],
    sections: [
      {
        heading: "Example 1: a two-step equation",
        steps: [
          "Start with 3x + 7 = 22.",
          "Subtract 7 from both sides: 3x = 15.",
          "Divide both sides by 3: x = 5.",
          "Check: 3 × 5 + 7 = 15 + 7 = 22. ✓",
        ],
      },
      {
        heading: "Example 2: variables on both sides",
        steps: [
          "Start with 5x − 4 = 2x + 11.",
          "Subtract 2x from both sides: 3x − 4 = 11.",
          "Add 4 to both sides: 3x = 15.",
          "Divide by 3: x = 5.",
          "Check: left side 5 × 5 − 4 = 21; right side 2 × 5 + 11 = 21. ✓",
        ],
      },
      {
        heading: "Example 3: parentheses",
        steps: [
          "Start with 4(x − 2) = 3x + 5.",
          "Distribute the 4: 4x − 8 = 3x + 5.",
          "Subtract 3x from both sides: x − 8 = 5.",
          "Add 8 to both sides: x = 13.",
          "Check: 4(13 − 2) = 4 × 11 = 44 and 3 × 13 + 5 = 44. ✓",
        ],
      },
      {
        heading: "A general strategy",
        list: [
          "Clear parentheses using the distributive property.",
          "Combine like terms on each side.",
          "Move all variable terms to one side and constants to the other.",
          "Divide by the coefficient of the variable.",
          "Substitute your answer into the original equation to check it.",
        ],
        paragraphs: [
          "Checking is the step most students skip, yet it catches nearly every sign error. Use the calculator to evaluate both sides with your value of x—if they match, you are done.",
        ],
      },
      {
        heading: "Practice problems",
        table: {
          headers: ["Equation", "Answer"],
          rows: [
            ["6x − 9 = 27", "x = 6"],
            ["2(x + 4) = 3x − 1", "x = 9"],
            ["x/5 + 2 = 7", "x = 25"],
          ],
        },
      },
    ],
    tryIt: "4 × (13 − 2)",
    datePublished: "2026-09-09",
    dateModified: "2026-10-12",
  },
  {
    slug: "order-of-operations-pemdas",
    title: "Order of Operations (PEMDAS) Explained With Examples",
    description:
      "Learn PEMDAS—parentheses, exponents, multiplication and division, addition and subtraction—with worked examples and common traps.",
    category: "Basic Algebra",
    answer: "Parentheses → Exponents → Multiplication & Division (left to right) → Addition & Subtraction (left to right).",
    intro: [
      "Without an agreed order, the expression 2 + 3 × 4 could mean 20 or 14. Mathematicians use a standard order so everyone gets the same answer: 14. In the United States this order is usually remembered with the acronym PEMDAS.",
    ],
    sections: [
      {
        heading: "What PEMDAS stands for",
        list: [
          "P — Parentheses (and other grouping symbols)",
          "E — Exponents (powers and roots)",
          "MD — Multiplication and Division, from left to right",
          "AS — Addition and Subtraction, from left to right",
        ],
        paragraphs: [
          "Multiplication does not always come before division, and addition does not always come before subtraction. They share the same level, so you work from left to right.",
        ],
      },
      {
        heading: "Worked example",
        steps: [
          "Start with 8 + 2 × (6 − 1)² ÷ 5.",
          "Parentheses: 6 − 1 = 5, giving 8 + 2 × 5² ÷ 5.",
          "Exponents: 5² = 25, giving 8 + 2 × 25 ÷ 5.",
          "Multiplication and division, left to right: 2 × 25 = 50, then 50 ÷ 5 = 10.",
          "Addition: 8 + 10 = 18.",
        ],
      },
      {
        heading: "Common traps",
        table: {
          headers: ["Expression", "Correct answer", "Why"],
          rows: [
            ["6 ÷ 2 × 3", "9", "Left to right: 6 ÷ 2 = 3, then 3 × 3"],
            ["20 − 4 + 3", "19", "Left to right: 20 − 4 = 16, then 16 + 3"],
            ["2 + 3 × 4", "14", "Multiply before adding"],
            ["3 + 4² ÷ 8 × (5 − 3)", "7", "16 ÷ 8 = 2, 2 × 2 = 4, 3 + 4"],
          ],
        },
      },
      {
        heading: "How calculators handle the order",
        paragraphs: [
          "A scientific solve calculator follows these rules automatically, so typing 2 + 3 × 4 returns 14. A basic four-function calculator may process keys in the order you press them and return 20. When in doubt, add parentheses—they make your intention clear to both people and machines.",
        ],
      },
      {
        heading: "Nested grouping symbols",
        paragraphs: [
          "When parentheses sit inside brackets, work from the innermost group outward. For 2 × [3 + (8 − 2) ÷ 3], first find 8 − 2 = 6, then 6 ÷ 3 = 2, then 3 + 2 = 5 inside the brackets, and finally 2 × 5 = 10.",
        ],
      },
    ],
    tryIt: "8 + 2 × (6 − 1)² ÷ 5",
    datePublished: "2026-09-10",
    dateModified: "2026-10-12",
  },
  {
    slug: "solve-for-x-basics",
    title: "Solve for x: Beginner’s Guide With Practice Problems",
    description:
      "New to algebra? Learn how to solve for x using inverse operations, with one-step and two-step examples and answers.",
    category: "Basic Algebra",
    answer: "Use the inverse operation to get x by itself: add ↔ subtract, multiply ↔ divide.",
    intro: [
      "“Solve for x” means find the number that x stands for. Think of an equation as a balanced scale. To find x, you remove everything around it, one step at a time, while keeping both sides balanced.",
    ],
    sections: [
      {
        heading: "Inverse operations",
        list: [
          "Addition is undone by subtraction.",
          "Subtraction is undone by addition.",
          "Multiplication is undone by division.",
          "Division is undone by multiplication.",
        ],
      },
      {
        heading: "One-step equations",
        table: {
          headers: ["Equation", "Inverse step", "Answer"],
          rows: [
            ["x + 9 = 15", "Subtract 9 from both sides", "x = 6"],
            ["x − 4 = 10", "Add 4 to both sides", "x = 14"],
            ["7x = 56", "Divide both sides by 7", "x = 8"],
            ["x ÷ 3 = 12", "Multiply both sides by 3", "x = 36"],
          ],
        },
      },
      {
        heading: "Two-step equations",
        steps: [
          "Start with 2x + 5 = 17.",
          "Undo the addition first: subtract 5 from both sides to get 2x = 12.",
          "Undo the multiplication: divide both sides by 2 to get x = 6.",
          "Check: 2 × 6 + 5 = 17. ✓",
        ],
        paragraphs: [
          "Another example: x/4 + 3 = 9. Subtract 3 to get x/4 = 6, then multiply by 4 to get x = 24. Check: 24 ÷ 4 + 3 = 9. ✓",
          "Notice the pattern: you undo operations in the reverse order of PEMDAS—addition and subtraction first, then multiplication and division.",
        ],
      },
      {
        heading: "Tips for getting it right",
        list: [
          "Write each step on a new line so you can spot mistakes.",
          "Pay attention to negative signs; −x = 5 means x = −5.",
          "Always plug your answer back into the original equation.",
        ],
        paragraphs: [
          "Once these basics feel comfortable, move on to equations with variables on both sides in our guide to solving linear equations.",
        ],
      },
      {
        heading: "Practice set",
        table: {
          headers: ["Equation", "Answer"],
          rows: [
            ["x + 12 = 30", "x = 18"],
            ["9x = 63", "x = 7"],
            ["3x − 4 = 20", "x = 8"],
            ["x/2 − 1 = 6", "x = 14"],
          ],
        },
      },
    ],
    tryIt: "2 × 6 + 5",
    datePublished: "2026-09-11",
    dateModified: "2026-10-12",
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return ARTICLES.filter((article) => article.category === category);
}

export function getCategoryId(category: ArticleCategory): string {
  return CATEGORIES.find((c) => c.name === category)?.id ?? "";
}

/** Same-category articles first, then others, excluding the current one. */
export function getRelatedArticles(slug: string, count = 3): Article[] {
  const current = getArticle(slug);
  if (!current) return ARTICLES.slice(0, count);
  const sameCategory = ARTICLES.filter((a) => a.slug !== slug && a.category === current.category);
  const others = ARTICLES.filter((a) => a.slug !== slug && a.category !== current.category);
  return [...sameCategory, ...others].slice(0, count);
}

export type ArticleSummary = { slug: string; title: string; description: string; category: ArticleCategory };

export function getArticleSummaries(): ArticleSummary[] {
  return ARTICLES.map(({ slug, title, description, category }) => ({ slug, title, description, category }));
}
