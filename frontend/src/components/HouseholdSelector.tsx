import { Select, Button, Stack, Text, SegmentedControl } from "@mantine/core";
import { useMemo, useState } from "react";
import type { HouseholdRow } from "../types";

type SelectionMethod = "random" | "byId" | "interesting";

const INTERESTING_CASES: Record<
  string,
  { method: "nlargest" | "nsmallest"; column: string }
> = {
  "Largest % Federal Tax Increase": {
    method: "nlargest",
    column: "Percentage Change in Federal Tax Liability",
  },
  "Largest % Federal Tax Decrease": {
    method: "nsmallest",
    column: "Percentage Change in Federal Tax Liability",
  },
  "Largest Federal Tax Increase": {
    method: "nlargest",
    column: "Total Change in Federal Tax Liability",
  },
  "Largest Federal Tax Decrease": {
    method: "nsmallest",
    column: "Total Change in Federal Tax Liability",
  },
  "Largest % Income Increase": {
    method: "nlargest",
    column: "Percentage Change in Net Income",
  },
  "Largest % Income Decrease": {
    method: "nsmallest",
    column: "Percentage Change in Net Income",
  },
  "Largest Income Increase": {
    method: "nlargest",
    column: "Total Change in Net Income",
  },
  "Largest Income Decrease": {
    method: "nsmallest",
    column: "Total Change in Net Income",
  },
};

interface HouseholdSelectorProps {
  data: HouseholdRow[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

function weightedRandomSample(data: HouseholdRow[]): number {
  const totalWeight = data.reduce(
    (sum, row) => sum + (row["Household Weight"] ?? 1),
    0,
  );
  let r = Math.random() * totalWeight;
  for (const row of data) {
    r -= row["Household Weight"] ?? 1;
    if (r <= 0) return row["Household ID"];
  }
  return data[data.length - 1]["Household ID"];
}

export function HouseholdSelector({
  data,
  selectedId,
  onSelect,
}: HouseholdSelectorProps) {
  const [method, setMethod] = useState<SelectionMethod>("random");
  const [caseType, setCaseType] = useState<string>(
    "Largest % Federal Tax Increase",
  );

  const householdIds = useMemo(
    () =>
      [...new Set(data.map((r) => r["Household ID"]))].sort((a, b) => a - b),
    [data],
  );

  const interestingOptions = useMemo(() => {
    if (method !== "interesting") return [];
    const config = INTERESTING_CASES[caseType];
    if (!config) return [];

    const sorted = [...data].sort((a, b) => {
      const aVal = (a[config.column] as number) ?? 0;
      const bVal = (b[config.column] as number) ?? 0;
      return config.method === "nlargest" ? bVal - aVal : aVal - bVal;
    });

    return sorted.slice(0, 20).map((row, i) => {
      const val = (row[config.column] as number) ?? 0;
      const isPercent = caseType.includes("%");
      const formatted = isPercent
        ? `${val >= 0 ? "+" : ""}${val.toFixed(1)}%`
        : `${val >= 0 ? "+" : ""}$${Math.round(val).toLocaleString()}`;
      return {
        value: String(row["Household ID"]),
        label: `#${i + 1}: ${formatted} (ID: ${row["Household ID"]})`,
      };
    });
  }, [data, method, caseType]);

  return (
    <Stack gap="sm">
      <Text fw={700} size="lg">
        Select household
      </Text>

      <SegmentedControl
        data={[
          { label: "Random", value: "random" },
          { label: "By ID", value: "byId" },
          { label: "Interesting", value: "interesting" },
        ]}
        value={method}
        onChange={(v) => setMethod(v as SelectionMethod)}
        size="xs"
      />

      {method === "random" && (
        <>
          <Button
            onClick={() => onSelect(weightedRandomSample(data))}
            variant="outline"
            color="teal"
          >
            Get random household
          </Button>
          {selectedId !== null && (
            <Text size="sm" c="dimmed">
              Selected household ID: {selectedId}
            </Text>
          )}
        </>
      )}

      {method === "byId" && (
        <Select
          label="Choose household ID"
          data={householdIds.map((id) => String(id))}
          value={selectedId !== null ? String(selectedId) : null}
          onChange={(val) => val && onSelect(parseInt(val))}
          searchable
          limit={50}
        />
      )}

      {method === "interesting" && (
        <>
          <Select
            label="Case type"
            data={Object.keys(INTERESTING_CASES)}
            value={caseType}
            onChange={(val) => val && setCaseType(val)}
          />
          <Select
            label="Top 20 households"
            data={interestingOptions}
            value={selectedId !== null ? String(selectedId) : null}
            onChange={(val) => val && onSelect(parseInt(val))}
          />
        </>
      )}
    </Stack>
  );
}
