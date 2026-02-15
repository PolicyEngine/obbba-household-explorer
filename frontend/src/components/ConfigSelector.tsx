import { SegmentedControl, Stack, Text } from "@mantine/core";
import type { Baseline, ReformType } from "../types";

interface ConfigSelectorProps {
  baseline: Baseline;
  reformType: ReformType;
  onBaselineChange: (b: Baseline) => void;
  onReformTypeChange: (r: ReformType) => void;
}

export function ConfigSelector({
  baseline,
  reformType,
  onBaselineChange,
  onReformTypeChange,
}: ConfigSelectorProps) {
  return (
    <Stack gap="sm">
      <Text fw={700} size="lg">
        Analysis configuration
      </Text>
      <Text size="sm" fw={500}>
        Baseline
      </Text>
      <SegmentedControl
        data={["Current Law", "Current Policy"]}
        value={baseline}
        onChange={(v) => onBaselineChange(v as Baseline)}
        size="xs"
      />
      <Text size="sm" fw={500}>
        Reform type
      </Text>
      <SegmentedControl
        data={["House", "Senate"]}
        value={reformType}
        onChange={(v) => onReformTypeChange(v as ReformType)}
        size="xs"
      />
    </Stack>
  );
}
