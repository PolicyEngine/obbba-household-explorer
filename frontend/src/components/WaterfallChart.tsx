import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Text, Card } from "@mantine/core";
import type { AnalysisType, HouseholdRow, ReformImpact } from "../types";
import { getBaselineValue, getChangeInfo } from "../utils/analysis";
import { colors } from "../designTokens";

interface WaterfallChartProps {
  household: HouseholdRow;
  impacts: ReformImpact[];
  analysisType: AnalysisType;
  reformType: string;
  baseline: string;
}

interface WaterfallBarData {
  name: string;
  base: number;
  value: number;
  displayValue: number;
  fill: string;
}

export function WaterfallChart({
  household,
  impacts,
  analysisType,
  reformType,
  baseline,
}: WaterfallChartProps) {
  const { value: baselineValue } = getBaselineValue(household, analysisType);
  const { changeValue } = getChangeInfo(household, analysisType);
  const finalValue = baselineValue + changeValue;

  const isPositiveGood =
    analysisType === "Net Income" || analysisType === "Benefits";

  const chartData: WaterfallBarData[] = [];

  // Baseline bar
  chartData.push({
    name: `Baseline`,
    base: 0,
    value: baselineValue,
    displayValue: baselineValue,
    fill: colors.BLUE_PRESSED,
  });

  // Impact bars
  let running = baselineValue;
  for (const impact of impacts) {
    const start = running;
    running += impact.totalChange;
    const isIncrease = impact.totalChange > 0;
    let barColor: string;
    if (isPositiveGood) {
      barColor = isIncrease ? colors.TEAL_PRESSED : colors.GRAY;
    } else {
      barColor = isIncrease ? colors.GRAY : colors.TEAL_PRESSED;
    }
    chartData.push({
      name: impact.name,
      base: Math.min(start, running),
      value: Math.abs(impact.totalChange),
      displayValue: impact.totalChange,
      fill: barColor,
    });
  }

  // Final bar
  chartData.push({
    name: `Final`,
    base: 0,
    value: finalValue,
    displayValue: finalValue,
    fill: colors.BLUE_PRESSED,
  });

  const allValues = chartData.map((d) => d.base + d.value);
  allValues.push(...chartData.map((d) => d.base));
  const dataMin = Math.min(0, ...allValues) * 1.15;
  const dataMax = Math.max(0, ...allValues) * 1.15;

  const title = `Impact of ${reformType} OBBBA against ${baseline} by provision on ${analysisType}`;

  return (
    <Card shadow="xs" p="md" radius="md" withBorder>
      <Text fw={600} size="lg" mb="md">
        {title}
      </Text>
      <ResponsiveContainer width="100%" height={420}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 60, bottom: 100 }}
        >
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={100}
            tick={{ fontSize: 11 }}
          />
          <YAxis
            domain={[dataMin, dataMax]}
            tickFormatter={(v: number) =>
              `$${Math.round(v).toLocaleString()}`
            }
          />
          <Tooltip
            formatter={(_value, _name, props) => {
              const item = props.payload as WaterfallBarData;
              return [
                `$${Math.round(item.displayValue).toLocaleString()}`,
                item.name,
              ];
            }}
          />
          <ReferenceLine y={0} stroke={colors.DARKEST_BLUE} />
          {/* Invisible base bar */}
          <Bar dataKey="base" stackId="waterfall" fill="transparent" />
          {/* Visible value bar */}
          <Bar dataKey="value" stackId="waterfall" radius={[2, 2, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
