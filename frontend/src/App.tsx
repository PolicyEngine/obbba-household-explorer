import { useState, useMemo, useCallback, useEffect } from "react";
import {
  MantineProvider,
  AppShell,
  Title,
  Text,
  Stack,
  Loader,
  Center,
  Alert,
  Divider,
  ScrollArea,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useData } from "./hooks/useData";
import { FilterSidebar } from "./components/FilterSidebar";
import { HouseholdSelector } from "./components/HouseholdSelector";
import { ConfigSelector } from "./components/ConfigSelector";
import { HouseholdAttributes } from "./components/HouseholdAttributes";
import { BreakdownTable } from "./components/BreakdownTable";
import { AnalysisTypeSelector } from "./components/AnalysisTypeSelector";
import { WaterfallChart } from "./components/WaterfallChart";
import { applyFilters, getReformImpacts } from "./utils/analysis";
import type { AnalysisType, Baseline, FilterState, ReformType } from "./types";
import { fonts } from "./designTokens";

const DEFAULT_FILTERS: FilterState = {
  minWeight: 0,
  incomeRange: [0, Infinity],
  state: "All States",
  maritalStatus: "All",
  dependents: "All",
  ageRange: [0, 200],
  singleTaxUnit: false,
};

export default function App() {
  const [baseline, setBaseline] = useState<Baseline>("Current Law");
  const [reformType, setReformType] = useState<ReformType>("House");
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [analysisType, setAnalysisType] = useState<AnalysisType>("Net Income");

  const { data, loading, error, states } = useData(baseline, reformType);

  const filtered = useMemo(
    () => applyFilters(data, filters),
    [data, filters],
  );

  // Reset selection when data or filters change
  useEffect(() => {
    if (filtered.length > 0 && selectedId !== null) {
      const exists = filtered.some(
        (r) => r["Household ID"] === selectedId,
      );
      if (!exists) {
        setSelectedId(null);
      }
    }
  }, [filtered, selectedId]);

  // Auto-select first household if none selected
  useEffect(() => {
    if (filtered.length > 0 && selectedId === null) {
      const totalWeight = filtered.reduce(
        (sum, r) => sum + (r["Household Weight"] ?? 1),
        0,
      );
      let r = Math.random() * totalWeight;
      for (const row of filtered) {
        r -= row["Household Weight"] ?? 1;
        if (r <= 0) {
          setSelectedId(row["Household ID"]);
          return;
        }
      }
      setSelectedId(filtered[filtered.length - 1]["Household ID"]);
    }
  }, [filtered, selectedId]);

  const household = useMemo(
    () =>
      selectedId !== null
        ? filtered.find((r) => r["Household ID"] === selectedId) ?? null
        : null,
    [filtered, selectedId],
  );

  const impacts = useMemo(
    () => (household ? getReformImpacts(household, analysisType) : []),
    [household, analysisType],
  );

  const handleSelect = useCallback((id: number) => {
    setSelectedId(id);
  }, []);

  if (loading) {
    return (
      <MantineProvider>
        <Center h="100vh">
          <Stack align="center" gap="md">
            <Loader size="xl" color="teal" />
            <Text>Loading household data...</Text>
          </Stack>
        </Center>
      </MantineProvider>
    );
  }

  if (error) {
    return (
      <MantineProvider>
        <Center h="100vh">
          <Alert color="red" title="Error loading data">
            {error}
          </Alert>
        </Center>
      </MantineProvider>
    );
  }

  return (
    <MantineProvider
      theme={{
        fontFamily: fonts.body,
        primaryColor: "teal",
      }}
    >
      <AppShell
        navbar={{ width: 300, breakpoint: "sm" }}
        padding="md"
      >
        <AppShell.Navbar p="md">
          <ScrollArea>
            <Stack gap="lg">
              <ConfigSelector
                baseline={baseline}
                reformType={reformType}
                onBaselineChange={setBaseline}
                onReformTypeChange={setReformType}
              />
              <Divider />
              <HouseholdSelector
                data={filtered}
                selectedId={selectedId}
                onSelect={handleSelect}
              />
              <Divider />
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                states={states}
                totalCount={data.length}
                filteredCount={filtered.length}
              />
            </Stack>
          </ScrollArea>
        </AppShell.Navbar>

        <AppShell.Main>
          <Stack gap="lg">
            <div>
              <Title order={1}>OBBBA Household Explorer</Title>
              <Text c="dimmed">
                Explore how the reconciliation bill affects individual
                households across America
              </Text>
            </div>

            {household ? (
              <>
                <HouseholdAttributes household={household} />
                <BreakdownTable
                  household={household}
                  reformType={reformType}
                  baseline={baseline}
                />
                <AnalysisTypeSelector
                  household={household}
                  analysisType={analysisType}
                  onChange={setAnalysisType}
                />
                {impacts.length > 0 ? (
                  <WaterfallChart
                    household={household}
                    impacts={impacts}
                    analysisType={analysisType}
                    reformType={reformType}
                    baseline={baseline}
                  />
                ) : (
                  <Alert color="blue">
                    The {reformType} OBBBA against{" "}
                    {baseline.toLowerCase()} does not affect this
                    household&apos;s {analysisType.toLowerCase()}.
                  </Alert>
                )}
              </>
            ) : (
              <Alert color="yellow">
                {filtered.length === 0
                  ? "No households match your filters. Try adjusting them."
                  : "Select a household to view its details."}
              </Alert>
            )}
          </Stack>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
