import { describe, it, expect } from "vitest";
import {
  getReformImpacts,
  getBaselineValue,
  getChangeInfo,
  applyFilters,
  formatCurrency,
} from "../utils/analysis";
import type { HouseholdRow } from "../types";

function makeHousehold(overrides: Partial<HouseholdRow> = {}): HouseholdRow {
  return {
    "Household ID": 1,
    State: "CA",
    "Household Size": 3,
    "Number of Tax Units": 1,
    "Age of Head": 40,
    "Age of Spouse": 38,
    "Number of Dependents": 1,
    "Is Married": true,
    "Num with SSN Card (Citizen/EAD)": 3,
    "Num with SSN Card (Other/None)": 0,
    "Employment Income": 80000,
    "Self-Employment Income": 0,
    "Capital Gains": 0,
    "Dividend Income": 0,
    "Farm Income": 0,
    "Taxable Interest Income": 0,
    "Rental Income": 0,
    "Taxable Unemployment Compensation": 0,
    "Miscellaneous Income": 0,
    "Taxable Retirement Distributions": 0,
    "Taxable Pension Income": 0,
    "Taxable Social Security": 0,
    "Property Taxes": 5000,
    "State Income Tax": 3000,
    "Tip Income": 0,
    "Overtime Income": 0,
    "Auto Loan Interest": 0,
    "Social Security Benefits": 0,
    "Gross Income": 80000,
    "Adjusted Gross Income": 75000,
    "Market Income": 80000,
    "Baseline Federal Tax Liability": 10000,
    "Baseline Net Income": 60000,
    "Baseline Benefits": 2000,
    "Baseline Medicaid": 1000,
    "Baseline ACA PTC": 500,
    "Baseline CHIP": 500,
    "Baseline Total Benefits": 2000,
    "Household Weight": 5000,
    "Total Change in Federal Tax Liability": -1500,
    "Total Change in State Tax Liability": -200,
    "Total Change in Benefits": -300,
    "Total Change in Net Income": 1200,
    "Percentage Change in Federal Tax Liability": -15,
    "Percentage Change in Net Income": 2,
    "Percentage Change in State Tax Liability": -6.7,
    "Percentage Change in Benefits": -15,
    "Change in Federal tax liability after Tax Rate Reform": -1000,
    "Change in Federal tax liability after CTC Reform": -500,
    "Change in Net income after Tax Rate Reform": 1000,
    "Change in Net income after CTC Reform": 200,
    "Change in Benefits after Tax Rate Reform": 0,
    "Change in Benefits after CTC Reform": 0,
    "Change in State tax liability after Tax Rate Reform": -100,
    "Change in State tax liability after CTC Reform": -100,
    ...overrides,
  } as HouseholdRow;
}

describe("getReformImpacts", () => {
  it("returns impacts for Federal Taxes", () => {
    const h = makeHousehold();
    const impacts = getReformImpacts(h, "Federal Taxes");
    expect(impacts.length).toBe(2);
    expect(impacts[0].name).toBe("Tax Rate Reform");
    expect(impacts[0].totalChange).toBe(-1000);
    expect(impacts[1].name).toBe("Child Tax Credit Reform");
    expect(impacts[1].totalChange).toBe(-500);
  });

  it("filters out zero/negligible impacts", () => {
    const h = makeHousehold({
      "Change in Federal tax liability after Tax Rate Reform": 0.005,
    });
    const impacts = getReformImpacts(h, "Federal Taxes");
    expect(impacts.some((i) => i.name === "Tax Rate Reform")).toBe(false);
  });

  it("returns impacts for Net Income", () => {
    const h = makeHousehold();
    const impacts = getReformImpacts(h, "Net Income");
    expect(impacts.length).toBe(2);
    expect(impacts[0].totalChange).toBe(1000);
  });
});

describe("getBaselineValue", () => {
  it("returns federal tax baseline", () => {
    const h = makeHousehold();
    const result = getBaselineValue(h, "Federal Taxes");
    expect(result.value).toBe(10000);
    expect(result.label).toBe("Federal Taxes");
  });

  it("returns net income baseline", () => {
    const h = makeHousehold();
    const result = getBaselineValue(h, "Net Income");
    expect(result.value).toBe(60000);
  });

  it("returns benefits baseline", () => {
    const h = makeHousehold();
    const result = getBaselineValue(h, "Benefits");
    expect(result.value).toBe(2000);
  });
});

describe("getChangeInfo", () => {
  it("calculates change info for federal taxes", () => {
    const h = makeHousehold();
    const info = getChangeInfo(h, "Federal Taxes");
    expect(info.changeValue).toBe(-1500);
    expect(info.pctChange).toBe(-15);
    expect(info.finalValue).toBe(8500);
  });

  it("calculates change info for net income", () => {
    const h = makeHousehold();
    const info = getChangeInfo(h, "Net Income");
    expect(info.changeValue).toBe(1200);
    expect(info.finalValue).toBe(61200);
  });
});

describe("applyFilters", () => {
  const data = [
    makeHousehold({ "Household ID": 1, "Household Weight": 5000, State: "CA", "Is Married": true, "Number of Dependents": 1, "Age of Head": 40, "Baseline Net Income": 60000, "Number of Tax Units": 1 }),
    makeHousehold({ "Household ID": 2, "Household Weight": 100, State: "NY", "Is Married": false, "Number of Dependents": 0, "Age of Head": 25, "Baseline Net Income": 20000, "Number of Tax Units": 2 }),
    makeHousehold({ "Household ID": 3, "Household Weight": 10000, State: "TX", "Is Married": true, "Number of Dependents": 4, "Age of Head": 65, "Baseline Net Income": 150000, "Number of Tax Units": 1 }),
  ];

  it("returns all with default filters", () => {
    const result = applyFilters(data, {
      minWeight: 0,
      incomeRange: [0, Infinity],
      state: "All States",
      maritalStatus: "All",
      dependents: "All",
      ageRange: [0, 200],
      singleTaxUnit: false,
    });
    expect(result.length).toBe(3);
  });

  it("filters by weight", () => {
    const result = applyFilters(data, {
      minWeight: 1000,
      incomeRange: [0, Infinity],
      state: "All States",
      maritalStatus: "All",
      dependents: "All",
      ageRange: [0, 200],
      singleTaxUnit: false,
    });
    expect(result.length).toBe(2);
    expect(result.some((r) => r["Household ID"] === 2)).toBe(false);
  });

  it("filters by state", () => {
    const result = applyFilters(data, {
      minWeight: 0,
      incomeRange: [0, Infinity],
      state: "CA",
      maritalStatus: "All",
      dependents: "All",
      ageRange: [0, 200],
      singleTaxUnit: false,
    });
    expect(result.length).toBe(1);
    expect(result[0]["Household ID"]).toBe(1);
  });

  it("filters by marital status", () => {
    const result = applyFilters(data, {
      minWeight: 0,
      incomeRange: [0, Infinity],
      state: "All States",
      maritalStatus: "Single",
      dependents: "All",
      ageRange: [0, 200],
      singleTaxUnit: false,
    });
    expect(result.length).toBe(1);
    expect(result[0]["Household ID"]).toBe(2);
  });

  it("filters by dependents 3+", () => {
    const result = applyFilters(data, {
      minWeight: 0,
      incomeRange: [0, Infinity],
      state: "All States",
      maritalStatus: "All",
      dependents: "3+",
      ageRange: [0, 200],
      singleTaxUnit: false,
    });
    expect(result.length).toBe(1);
    expect(result[0]["Household ID"]).toBe(3);
  });

  it("filters by income range", () => {
    const result = applyFilters(data, {
      minWeight: 0,
      incomeRange: [50000, 100000],
      state: "All States",
      maritalStatus: "All",
      dependents: "All",
      ageRange: [0, 200],
      singleTaxUnit: false,
    });
    expect(result.length).toBe(1);
    expect(result[0]["Household ID"]).toBe(1);
  });

  it("filters by age range", () => {
    const result = applyFilters(data, {
      minWeight: 0,
      incomeRange: [0, Infinity],
      state: "All States",
      maritalStatus: "All",
      dependents: "All",
      ageRange: [60, 70],
      singleTaxUnit: false,
    });
    expect(result.length).toBe(1);
    expect(result[0]["Household ID"]).toBe(3);
  });

  it("filters by single tax unit", () => {
    const result = applyFilters(data, {
      minWeight: 0,
      incomeRange: [0, Infinity],
      state: "All States",
      maritalStatus: "All",
      dependents: "All",
      ageRange: [0, 200],
      singleTaxUnit: true,
    });
    expect(result.length).toBe(2);
    expect(result.some((r) => r["Household ID"] === 2)).toBe(false);
  });
});

describe("formatCurrency", () => {
  it("formats positive values", () => {
    expect(formatCurrency(1500)).toBe("+$1,500");
  });

  it("formats negative values", () => {
    expect(formatCurrency(-1500)).toBe("-$1,500");
  });

  it("formats millions", () => {
    expect(formatCurrency(1500000)).toBe("+$1.5M");
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("$0");
  });
});
