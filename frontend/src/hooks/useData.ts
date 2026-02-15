import { useState, useEffect, useCallback } from "react";
import Papa from "papaparse";
import type { HouseholdRow, Baseline, ReformType } from "../types";
import { CSV_FILES } from "../types";

export function useData(baseline: Baseline, reformType: ReformType) {
  const [data, setData] = useState<HouseholdRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [states, setStates] = useState<string[]>([]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const key = `${baseline}_${reformType}`;
    const filename = CSV_FILES[key];
    if (!filename) {
      setError(`No data file for ${baseline} / ${reformType}`);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.BASE_URL}data/${filename}`);
      if (!response.ok) throw new Error(`Failed to load ${filename}`);
      const text = await response.text();

      Papa.parse<HouseholdRow>(text, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete(results) {
          // Convert "Is Married" from 0/1 number to boolean
          const rows = results.data.map((row) => ({
            ...row,
            "Is Married": Boolean(row["Is Married"]),
          }));

          // Compute Percentage Change in Benefits if missing
          for (const row of rows) {
            const baseBenefits = row["Baseline Benefits"] ?? 0;
            const changeBenefits = row["Total Change in Benefits"] ?? 0;
            if (
              row["Percentage Change in Benefits"] === undefined ||
              row["Percentage Change in Benefits"] === null
            ) {
              row["Percentage Change in Benefits"] =
                baseBenefits !== 0
                  ? (changeBenefits / Math.abs(baseBenefits)) * 100
                  : 0;
            }
          }

          const uniqueStates = [
            ...new Set(rows.map((r) => r.State)),
          ].sort() as string[];
          setStates(uniqueStates);
          setData(rows);
          setLoading(false);
        },
        error(err: Error) {
          setError(err.message);
          setLoading(false);
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setLoading(false);
    }
  }, [baseline, reformType]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, loading, error, states };
}
