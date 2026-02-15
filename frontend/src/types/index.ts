export interface HouseholdRow {
  "Household ID": number;
  State: string;
  "Household Size": number;
  "Number of Tax Units": number;
  "Age of Head": number;
  "Age of Spouse": number | null;
  "Number of Dependents": number;
  "Is Married": boolean;
  "Num with SSN Card (Citizen/EAD)": number;
  "Num with SSN Card (Other/None)": number;
  "Employment Income": number;
  "Self-Employment Income": number;
  "Capital Gains": number;
  "Dividend Income": number;
  "Farm Income": number;
  "Taxable Interest Income": number;
  "Rental Income": number;
  "Taxable Unemployment Compensation": number;
  "Miscellaneous Income": number;
  "Taxable Retirement Distributions": number;
  "Taxable Pension Income": number;
  "Taxable Social Security": number;
  "Property Taxes": number;
  "State Income Tax": number;
  "Tip Income": number;
  "Overtime Income": number;
  "Auto Loan Interest": number;
  "Social Security Benefits": number;
  "Gross Income": number;
  "Adjusted Gross Income": number;
  "Market Income": number;
  "Baseline Federal Tax Liability": number;
  "Baseline Net Income": number;
  "Baseline Benefits": number;
  "Baseline Medicaid": number;
  "Baseline ACA PTC": number;
  "Baseline CHIP": number;
  "Baseline Total Benefits": number;
  "Household Weight": number;
  "Total Change in Federal Tax Liability": number;
  "Total Change in State Tax Liability": number;
  "Total Change in Benefits": number;
  "Total Change in Net Income": number;
  "Percentage Change in Federal Tax Liability": number;
  "Percentage Change in Net Income": number;
  "Percentage Change in State Tax Liability": number;
  "Percentage Change in Benefits": number;
  [key: string]: string | number | boolean | null;
}

export type AnalysisType =
  | "Net Income"
  | "Federal Taxes"
  | "State Taxes"
  | "Benefits";

export type Baseline = "Current Law" | "Current Policy";
export type ReformType = "House" | "Senate";

export interface FilterState {
  minWeight: number;
  incomeRange: [number, number];
  state: string;
  maritalStatus: "All" | "Married" | "Single";
  dependents: string;
  ageRange: [number, number];
  singleTaxUnit: boolean;
}

export interface ReformImpact {
  name: string;
  totalChange: number;
}

export const CSV_FILES: Record<string, string> = {
  "Current Law_House":
    "household_tax_income_changes_current_law_baseline.csv",
  "Current Law_Senate":
    "household_tax_income_changes_senate_current_law_baseline.csv",
  "Current Policy_House":
    "household_tax_income_changes_tcja_baseline.csv",
  "Current Policy_Senate":
    "household_tax_income_changes_senate_tcja_baseline.csv",
};

export const REFORM_COLS: [string, string][] = [
  ["Tax Rate Reform", "Tax Rate Reform"],
  ["Standard Deduction Reform", "Standard Deduction Reform"],
  ["Exemption Reform", "Exemption Reform"],
  ["Child Tax Credit Reform", "CTC Reform"],
  ["QBID Reform", "QBID Reform"],
  ["AMT Reform", "AMT Reform"],
  ["SALT Reform", "SALT Reform"],
  ["Estate Tax Reform", "Estate Tax Reform"],
  ["Tip Income Exemption", "Tip Income Exempt"],
  ["Senior Deduction Reform", "Senior Deduction Reform"],
  ["Overtime Income Exemption", "Overtime Income Exempt"],
  ["Auto Loan Interest Deduction", "Auto Loan Interest ALD"],
  ["Miscellaneous Reform", "Miscellaneous Reform"],
  ["Other Itemized Deductions Reform", "Other Itemized Deductions Reform"],
  [
    "Limitation on Itemized Deductions Reform",
    "Limitation on Itemized Deductions Reform",
  ],
  ["ACA Enhanced Subsidies Reform", "ACA Enhanced Subsidies Reform"],
  ["SNAP Reform", "SNAP Takeup Reform"],
  ["ACA Reform", "ACA Takeup Reform"],
  ["Medicaid Reform", "Medicaid Takeup Reform"],
];

export const WEIGHT_OPTIONS: Record<string, number> = {
  "All Households": 0,
  "Weight 1,000+": 1000,
  "Weight 5,000+": 5000,
  "Weight 10,000+": 10000,
  "Weight 25,000+": 25000,
  "Weight 50,000+": 50000,
};

export const INCOME_RANGES: Record<string, [number, number]> = {
  "All Income Levels": [0, Infinity],
  "Under $25k": [0, 25000],
  "$25k - $50k": [25000, 50000],
  "$50k - $100k": [50000, 100000],
  "$100k - $200k": [100000, 200000],
  "$200k+": [200000, Infinity],
};

export const AGE_RANGES: Record<string, [number, number]> = {
  "All Ages": [0, 200],
  "Under 30": [0, 30],
  "30-40": [30, 40],
  "40-50": [40, 50],
  "50-60": [50, 60],
  "60-70": [60, 70],
  "70-80": [70, 80],
  "80+": [80, 200],
};

export const COLUMN_PREFIX: Record<AnalysisType, string> = {
  "Federal Taxes": "Change in Federal tax liability after",
  "State Taxes": "Change in State tax liability after",
  "Net Income": "Change in Net income after",
  Benefits: "Change in Benefits after",
};
