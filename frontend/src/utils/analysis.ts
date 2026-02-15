import type { AnalysisType, HouseholdRow, ReformImpact } from "../types";
import { COLUMN_PREFIX, REFORM_COLS } from "../types";

const INCOME_CHANGE_THRESHOLD = 0.01;

export function getReformImpacts(
  household: HouseholdRow,
  analysisType: AnalysisType,
): ReformImpact[] {
  const prefix = COLUMN_PREFIX[analysisType];
  const impacts: ReformImpact[] = [];

  for (const [displayName, colName] of REFORM_COLS) {
    const key = `${prefix} ${colName}`;
    const value = household[key];
    if (typeof value === "number" && Math.abs(value) > INCOME_CHANGE_THRESHOLD) {
      impacts.push({ name: displayName, totalChange: value });
    }
  }
  return impacts;
}

export function getBaselineValue(
  household: HouseholdRow,
  analysisType: AnalysisType,
): { value: number; label: string } {
  switch (analysisType) {
    case "Federal Taxes":
      return {
        value: household["Baseline Federal Tax Liability"],
        label: "Federal Taxes",
      };
    case "State Taxes":
      return { value: household["State Income Tax"], label: "State Taxes" };
    case "Net Income":
      return { value: household["Baseline Net Income"], label: "Net Income" };
    case "Benefits":
      return {
        value: household["Baseline Total Benefits"],
        label: "Benefits",
      };
  }
}

export function getChangeInfo(
  household: HouseholdRow,
  analysisType: AnalysisType,
): {
  changeValue: number;
  pctChange: number;
  changeLabel: string;
  finalLabel: string;
  finalValue: number;
} {
  let changeValue: number;
  let pctChange: number;
  let changeLabel: string;
  let baseline: number;
  let finalLabel: string;

  switch (analysisType) {
    case "Federal Taxes":
      changeValue = household["Total Change in Federal Tax Liability"];
      pctChange = household["Percentage Change in Federal Tax Liability"];
      changeLabel = "Federal Tax Change";
      baseline = household["Baseline Federal Tax Liability"];
      finalLabel = "Reformed Federal Tax";
      break;
    case "State Taxes":
      changeValue = household["Total Change in State Tax Liability"];
      pctChange = household["Percentage Change in State Tax Liability"];
      changeLabel = "State Tax Change";
      baseline = household["State Income Tax"] ?? 0;
      finalLabel = "Reformed State Tax";
      break;
    case "Net Income":
      changeValue = household["Total Change in Net Income"];
      pctChange = household["Percentage Change in Net Income"];
      changeLabel = "Net Income Change";
      baseline = household["Baseline Net Income"];
      finalLabel = "Reformed Net Income";
      break;
    case "Benefits":
      changeValue = household["Total Change in Benefits"];
      const baseBenefits = household["Baseline Total Benefits"];
      pctChange = baseBenefits > 0 ? (changeValue / baseBenefits) * 100 : 0;
      changeLabel = "Benefits Change";
      baseline = baseBenefits;
      finalLabel = "Reformed Benefits";
      break;
  }

  return {
    changeValue,
    pctChange,
    changeLabel,
    finalLabel,
    finalValue: baseline + changeValue,
  };
}

export function formatCurrency(value: number): string {
  const sign = value < 0 ? "-" : value > 0 ? "+" : "";
  const abs = Math.abs(value);
  if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `${sign}$${Math.round(abs).toLocaleString()}`;
  return `${sign}$${Math.round(abs).toLocaleString()}`;
}

export function formatCurrencyPlain(value: number): string {
  return `$${Math.round(value).toLocaleString()}`;
}

export function applyFilters(
  data: HouseholdRow[],
  filters: {
    minWeight: number;
    incomeRange: [number, number];
    state: string;
    maritalStatus: "All" | "Married" | "Single";
    dependents: string;
    ageRange: [number, number];
    singleTaxUnit: boolean;
  },
): HouseholdRow[] {
  return data.filter((row) => {
    if (filters.minWeight > 0 && row["Household Weight"] < filters.minWeight)
      return false;

    const income = row["Baseline Net Income"];
    if (income < filters.incomeRange[0] || income > filters.incomeRange[1])
      return false;

    if (filters.state !== "All States" && row.State !== filters.state)
      return false;

    if (filters.maritalStatus !== "All") {
      const isMarried = filters.maritalStatus === "Married";
      if (row["Is Married"] !== isMarried) return false;
    }

    if (filters.dependents !== "All") {
      if (filters.dependents === "3+") {
        if (row["Number of Dependents"] < 3) return false;
      } else {
        if (row["Number of Dependents"] !== parseInt(filters.dependents))
          return false;
      }
    }

    const age = row["Age of Head"];
    if (age < filters.ageRange[0] || age >= filters.ageRange[1]) return false;

    if (filters.singleTaxUnit && row["Number of Tax Units"] !== 1)
      return false;

    return true;
  });
}
