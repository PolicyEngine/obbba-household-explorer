import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { FilterSidebar } from "../components/FilterSidebar";
import { HouseholdAttributes } from "../components/HouseholdAttributes";
import { BreakdownTable } from "../components/BreakdownTable";
import { AnalysisTypeSelector } from "../components/AnalysisTypeSelector";
import type { HouseholdRow, FilterState } from "../types";

function makeHousehold(overrides: Partial<HouseholdRow> = {}): HouseholdRow {
  return {
    "Household ID": 42,
    State: "CA",
    "Household Size": 4,
    "Number of Tax Units": 1,
    "Age of Head": 45,
    "Age of Spouse": 43,
    "Number of Dependents": 2,
    "Is Married": true,
    "Num with SSN Card (Citizen/EAD)": 4,
    "Num with SSN Card (Other/None)": 0,
    "Employment Income": 100000,
    "Self-Employment Income": 0,
    "Capital Gains": 5000,
    "Dividend Income": 0,
    "Farm Income": 0,
    "Taxable Interest Income": 500,
    "Rental Income": 0,
    "Taxable Unemployment Compensation": 0,
    "Miscellaneous Income": 0,
    "Taxable Retirement Distributions": 0,
    "Taxable Pension Income": 0,
    "Taxable Social Security": 0,
    "Property Taxes": 8000,
    "State Income Tax": 5000,
    "Tip Income": 0,
    "Overtime Income": 0,
    "Auto Loan Interest": 0,
    "Social Security Benefits": 0,
    "Gross Income": 105500,
    "Adjusted Gross Income": 100000,
    "Market Income": 105500,
    "Baseline Federal Tax Liability": 15000,
    "Baseline Net Income": 75000,
    "Baseline Benefits": 3000,
    "Baseline Medicaid": 1500,
    "Baseline ACA PTC": 1000,
    "Baseline CHIP": 500,
    "Baseline Total Benefits": 3000,
    "Household Weight": 8500,
    "Total Change in Federal Tax Liability": -2000,
    "Total Change in State Tax Liability": -300,
    "Total Change in Benefits": -500,
    "Total Change in Net Income": 1800,
    "Percentage Change in Federal Tax Liability": -13.3,
    "Percentage Change in Net Income": 2.4,
    "Percentage Change in State Tax Liability": -6,
    "Percentage Change in Benefits": -16.7,
    "Age of Dependent 1": 12,
    "Age of Dependent 2": 8,
    ...overrides,
  } as HouseholdRow;
}

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

describe("FilterSidebar", () => {
  const defaultFilters: FilterState = {
    minWeight: 0,
    incomeRange: [0, Infinity],
    state: "All States",
    maritalStatus: "All",
    dependents: "All",
    ageRange: [0, 200],
    singleTaxUnit: false,
  };

  it("renders filter labels", () => {
    render(
      <FilterSidebar
        filters={defaultFilters}
        onChange={vi.fn()}
        states={["CA", "NY", "TX"]}
        totalCount={1000}
        filteredCount={500}
      />,
      { wrapper },
    );
    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(
      screen.getByText("Showing 500 of 1,000 households"),
    ).toBeInTheDocument();
  });

  it("renders correct count text", () => {
    render(
      <FilterSidebar
        filters={defaultFilters}
        onChange={vi.fn()}
        states={[]}
        totalCount={41310}
        filteredCount={41310}
      />,
      { wrapper },
    );
    expect(
      screen.getByText("Showing 41,310 of 41,310 households"),
    ).toBeInTheDocument();
  });
});

describe("HouseholdAttributes", () => {
  it("renders household info", () => {
    const h = makeHousehold();
    render(<HouseholdAttributes household={h} />, { wrapper });
    expect(screen.getByText("Household attributes")).toBeInTheDocument();
    expect(screen.getAllByText(/CA/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/45 years/)).toBeInTheDocument();
    expect(screen.getByText(/8,500/)).toBeInTheDocument();
  });

  it("shows dependent ages", () => {
    const h = makeHousehold();
    render(<HouseholdAttributes household={h} />, { wrapper });
    expect(screen.getByText(/12, 8 years/)).toBeInTheDocument();
  });

  it("shows single status when not married", () => {
    const h = makeHousehold({ "Is Married": false, "Age of Spouse": null });
    render(<HouseholdAttributes household={h} />, { wrapper });
    expect(screen.getByText(/Single/)).toBeInTheDocument();
  });
});

describe("BreakdownTable", () => {
  it("renders all five rows", () => {
    const h = makeHousehold();
    render(
      <BreakdownTable
        household={h}
        reformType="House"
        baseline="Current Law"
      />,
      { wrapper },
    );
    expect(screen.getByText("Market Income")).toBeInTheDocument();
    expect(screen.getByText("Federal Taxes")).toBeInTheDocument();
    expect(screen.getByText("State Taxes")).toBeInTheDocument();
    expect(screen.getByText("Benefits")).toBeInTheDocument();
    expect(screen.getByText("Net Income")).toBeInTheDocument();
  });

  it("shows correct header labels", () => {
    const h = makeHousehold();
    render(
      <BreakdownTable
        household={h}
        reformType="Senate"
        baseline="Current Policy"
      />,
      { wrapper },
    );
    expect(screen.getByText("Current Policy")).toBeInTheDocument();
    expect(screen.getByText("Senate OBBBA")).toBeInTheDocument();
  });
});

describe("AnalysisTypeSelector", () => {
  it("renders all analysis types with percentages", () => {
    const h = makeHousehold();
    render(
      <AnalysisTypeSelector
        household={h}
        analysisType="Net Income"
        onChange={vi.fn()}
      />,
      { wrapper },
    );
    expect(screen.getByText(/Net Income \(\+2\.4%\)/)).toBeInTheDocument();
    expect(
      screen.getByText(/Federal Taxes \(-13\.3%\)/),
    ).toBeInTheDocument();
  });
});
