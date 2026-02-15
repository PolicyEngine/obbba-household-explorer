import { SegmentedControl, Text, Card } from "@mantine/core";
import type { AnalysisType, HouseholdRow } from "../types";
import { getChangeInfo } from "../utils/analysis";

interface AnalysisTypeSelectorProps {
  household: HouseholdRow;
  analysisType: AnalysisType;
  onChange: (type: AnalysisType) => void;
}

const TYPES: AnalysisType[] = [
  "Net Income",
  "Federal Taxes",
  "State Taxes",
  "Benefits",
];

export function AnalysisTypeSelector({
  household,
  analysisType,
  onChange,
}: AnalysisTypeSelectorProps) {
  const options = TYPES.map((type) => {
    const { pctChange } = getChangeInfo(household, type);
    return {
      label: `${type} (${pctChange >= 0 ? "+" : ""}${pctChange.toFixed(1)}%)`,
      value: type,
    };
  });

  return (
    <Card shadow="xs" p="md" radius="md" withBorder>
      <Text fw={600} size="sm" mb="xs">
        Select impact breakdown
      </Text>
      <SegmentedControl
        data={options}
        value={analysisType}
        onChange={(v) => onChange(v as AnalysisType)}
        fullWidth
        size="sm"
      />
    </Card>
  );
}
