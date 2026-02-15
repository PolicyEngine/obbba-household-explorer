import { Table, Card, Text } from "@mantine/core";
import type { HouseholdRow } from "../types";
import { colors } from "../designTokens";

interface BreakdownTableProps {
  household: HouseholdRow;
  reformType: string;
  baseline: string;
}

interface RowData {
  category: string;
  baselineValue: number;
  reformValue: number;
  absChange: number;
  pctChange: number;
  positiveIsGood: boolean;
}

export function BreakdownTable({
  household,
  reformType,
  baseline,
}: BreakdownTableProps) {
  const federalBaseline = household["Baseline Federal Tax Liability"];
  const federalChange = household["Total Change in Federal Tax Liability"];
  const federalPct = household["Percentage Change in Federal Tax Liability"];

  const stateBaseline = household["State Income Tax"] ?? 0;
  const stateChange = household["Total Change in State Tax Liability"] ?? 0;
  const statePct =
    household["Percentage Change in State Tax Liability"] ?? 0;

  const benefitsBaseline = household["Baseline Total Benefits"];
  const benefitsChange = household["Total Change in Benefits"];
  const benefitsPct =
    benefitsBaseline > 0 ? (benefitsChange / benefitsBaseline) * 100 : 0;

  const netBaseline = household["Baseline Net Income"];
  const netChange = household["Total Change in Net Income"];
  const netPct = household["Percentage Change in Net Income"];

  const marketIncome = household["Market Income"];

  const rows: RowData[] = [
    {
      category: "Market Income",
      baselineValue: marketIncome,
      reformValue: marketIncome,
      absChange: 0,
      pctChange: 0,
      positiveIsGood: true,
    },
    {
      category: "Federal Taxes",
      baselineValue: federalBaseline,
      reformValue: federalBaseline + federalChange,
      absChange: federalChange,
      pctChange: federalPct,
      positiveIsGood: false,
    },
    {
      category: "State Taxes",
      baselineValue: stateBaseline,
      reformValue: stateBaseline + stateChange,
      absChange: stateChange,
      pctChange: statePct,
      positiveIsGood: false,
    },
    {
      category: "Benefits",
      baselineValue: benefitsBaseline,
      reformValue: benefitsBaseline + benefitsChange,
      absChange: benefitsChange,
      pctChange: benefitsPct,
      positiveIsGood: true,
    },
    {
      category: "Net Income",
      baselineValue: netBaseline,
      reformValue: netBaseline + netChange,
      absChange: netChange,
      pctChange: netPct,
      positiveIsGood: true,
    },
  ];

  function changeColor(value: number, positiveIsGood: boolean): string {
    if (Math.abs(value) < 1) return colors.BLACK;
    if (positiveIsGood) {
      return value > 0 ? colors.TEAL_PRESSED : colors.GRAY;
    }
    return value > 0 ? colors.GRAY : colors.TEAL_PRESSED;
  }

  const fmt = (v: number) => `$${Math.round(v).toLocaleString()}`;
  const fmtSigned = (v: number) =>
    `${v >= 0 ? "+" : ""}$${Math.round(v).toLocaleString()}`;
  const fmtPct = (v: number) => `${v >= 0 ? "+" : ""}${v.toFixed(1)}%`;

  return (
    <Card shadow="xs" p="md" radius="md" withBorder>
      <Text fw={600} size="lg" mb="md">
        Financial impact breakdown of {reformType} OBBBA against {baseline}
      </Text>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>{baseline}</Table.Th>
            <Table.Th>{reformType} OBBBA</Table.Th>
            <Table.Th>Absolute change</Table.Th>
            <Table.Th>% Change</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.map((row) => {
            const cc = changeColor(row.absChange, row.positiveIsGood);
            return (
              <Table.Tr key={row.category}>
                <Table.Td fw={600}>{row.category}</Table.Td>
                <Table.Td>{fmt(row.baselineValue)}</Table.Td>
                <Table.Td>{fmt(row.reformValue)}</Table.Td>
                <Table.Td style={{ color: cc, fontWeight: 600 }}>
                  {fmtSigned(row.absChange)}
                </Table.Td>
                <Table.Td style={{ color: cc, fontWeight: 600 }}>
                  {fmtPct(row.pctChange)}
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </Card>
  );
}
