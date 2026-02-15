import { Card, Grid, Text, Spoiler } from "@mantine/core";
import type { HouseholdRow } from "../types";

interface HouseholdAttributesProps {
  household: HouseholdRow;
}

export function HouseholdAttributes({
  household,
}: HouseholdAttributesProps) {
  const dependentAges: string[] = [];
  for (let i = 1; i <= 11; i++) {
    const key = `Age of Dependent ${i}`;
    const age = household[key];
    if (typeof age === "number" && age > 0) {
      dependentAges.push(`${Math.round(age)}`);
    }
  }

  const isMarried = household["Is Married"];
  const maritalInfo = isMarried
    ? `Married${household["Age of Spouse"] ? ` (Spouse age: ${Math.round(household["Age of Spouse"] as number)})` : ""}`
    : "Single";

  const weight = household["Household Weight"];

  return (
    <Card shadow="xs" p="md" radius="md" withBorder>
      <Text fw={600} size="lg" mb="sm">
        Household attributes
      </Text>
      <Grid>
        <Grid.Col span={6}>
          <Text size="sm">
            <strong>State:</strong> {household.State}
          </Text>
          <Text size="sm">
            <strong>Household size:</strong>{" "}
            {Math.round(household["Household Size"] as number)}
          </Text>
          <Text size="sm">
            <strong>Number of tax units:</strong>{" "}
            {Math.round(household["Number of Tax Units"] as number)}
          </Text>
          <Text size="sm">
            <strong>Head of household age:</strong>{" "}
            {Math.round(household["Age of Head"])} years
          </Text>
          <Text size="sm">
            <strong>Marital status:</strong> {maritalInfo}
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text size="sm">
            <strong>Number of dependents:</strong>{" "}
            {household["Number of Dependents"]}
          </Text>
          {dependentAges.length > 0 && (
            <Text size="sm">
              <strong>Children&apos;s ages:</strong>{" "}
              {dependentAges.join(", ")} years
            </Text>
          )}
          <Text size="sm">
            <strong>People with SSN card (Citizen/EAD):</strong>{" "}
            {Math.round(
              household["Num with SSN Card (Citizen/EAD)"] as number,
            )}
          </Text>
          <Text size="sm">
            <strong>People with SSN card (Other/None):</strong>{" "}
            {Math.round(
              household["Num with SSN Card (Other/None)"] as number,
            )}
          </Text>
          <Text size="sm">
            <strong>Market income:</strong> $
            {Math.round(household["Market Income"]).toLocaleString()}
          </Text>
        </Grid.Col>
      </Grid>
      <Text size="xs" c="dimmed" mt="sm">
        This household represents {Math.ceil(weight).toLocaleString()}{" "}
        households in the US.
      </Text>
      <Spoiler maxHeight={0} showLabel="Show full data row" hideLabel="Hide">
        <Text size="xs" mt="sm" style={{ whiteSpace: "pre-wrap" }}>
          {Object.entries(household)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n")}
        </Text>
      </Spoiler>
    </Card>
  );
}
