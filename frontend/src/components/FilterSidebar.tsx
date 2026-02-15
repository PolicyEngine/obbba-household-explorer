import { Select, Checkbox, Stack, Text } from "@mantine/core";
import type { FilterState } from "../types";
import { WEIGHT_OPTIONS, INCOME_RANGES, AGE_RANGES } from "../types";

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  states: string[];
  totalCount: number;
  filteredCount: number;
}

export function FilterSidebar({
  filters,
  onChange,
  states,
  totalCount,
  filteredCount,
}: FilterSidebarProps) {
  const stateOptions = ["All States", ...states];

  return (
    <Stack gap="sm">
      <Text fw={700} size="lg">
        Filters
      </Text>

      <Select
        label="Minimum household weight"
        data={Object.keys(WEIGHT_OPTIONS)}
        value={
          Object.entries(WEIGHT_OPTIONS).find(
            ([, v]) => v === filters.minWeight,
          )?.[0] ?? "All Households"
        }
        onChange={(val) =>
          onChange({
            ...filters,
            minWeight: val ? WEIGHT_OPTIONS[val] ?? 0 : 0,
          })
        }
      />

      <Select
        label="Net income"
        data={Object.keys(INCOME_RANGES)}
        value={
          Object.entries(INCOME_RANGES).find(
            ([, v]) =>
              v[0] === filters.incomeRange[0] &&
              v[1] === filters.incomeRange[1],
          )?.[0] ?? "All Income Levels"
        }
        onChange={(val) =>
          onChange({
            ...filters,
            incomeRange: val ? INCOME_RANGES[val] ?? [0, Infinity] : [0, Infinity],
          })
        }
      />

      <Select
        label="State"
        data={stateOptions}
        value={filters.state}
        onChange={(val) =>
          onChange({ ...filters, state: val ?? "All States" })
        }
        searchable
      />

      <Select
        label="Marital status"
        data={["All", "Married", "Single"]}
        value={filters.maritalStatus}
        onChange={(val) =>
          onChange({
            ...filters,
            maritalStatus: (val as FilterState["maritalStatus"]) ?? "All",
          })
        }
      />

      <Select
        label="Number of dependents"
        data={["All", "0", "1", "2", "3+"]}
        value={filters.dependents}
        onChange={(val) =>
          onChange({ ...filters, dependents: val ?? "All" })
        }
      />

      <Select
        label="Head of household age"
        data={Object.keys(AGE_RANGES)}
        value={
          Object.entries(AGE_RANGES).find(
            ([, v]) =>
              v[0] === filters.ageRange[0] && v[1] === filters.ageRange[1],
          )?.[0] ?? "All Ages"
        }
        onChange={(val) =>
          onChange({
            ...filters,
            ageRange: val ? AGE_RANGES[val] ?? [0, 200] : [0, 200],
          })
        }
      />

      <Checkbox
        label="Households with only 1 tax unit"
        checked={filters.singleTaxUnit}
        onChange={(event) =>
          onChange({
            ...filters,
            singleTaxUnit: event.currentTarget.checked,
          })
        }
      />

      <Text size="sm" c="dimmed">
        Showing {filteredCount.toLocaleString()} of{" "}
        {totalCount.toLocaleString()} households
      </Text>
    </Stack>
  );
}
