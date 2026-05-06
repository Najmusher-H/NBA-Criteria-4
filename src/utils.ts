/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { YEAR_DATA, INDIVIDUAL_FACULTY } from './data';

export type AcademicYear = "20-21" | "21-22" | "22-23" | "23-24" | "24-25" | "25-26";

export interface FacultyStats {
  X: number; // Ph.D
  Y: number; // Masters
  AF: number; // Available Faculty
  RF: number; // Required Faculty (S/20)
  FQI: number;
  retention: {
    A: number; // < 1 yr
    B: number; // 1-2 yr
    C: number; // 2-3 yr
    D: number; // 3-4 yr
    E: number; // >= 4 yr
    FR: number;
  };
}

export function calculateStats(year: AcademicYear): FacultyStats {
  const d = YEAR_DATA[year];
  
  // FQI = 2.5 * (10X + 4Y) / RF
  const FQI = (2.5 * (10 * d.X + 4 * d.Y)) / d.RF;

  // FR = (((A*0)+(B*1)+(C*2)+ (D*3)+(E*4))/RF) * 2.50
  const { A, B, C, D, E } = d.retention;
  const rawFR = (((A * 0) + (B * 1) + (C * 2) + (D * 3) + (E * 4)) / d.RF) * 2.50;
  const FR = Math.min(10, rawFR); // Points limited to 10

  return {
    X: d.X,
    Y: d.Y,
    AF: d.AF,
    RF: d.RF,
    FQI,
    retention: { A, B, C, D, E, FR }
  };
}

export function getAllStats() {
  const allYears = Object.keys(YEAR_DATA) as AcademicYear[];
  const results: Record<AcademicYear, FacultyStats> = {} as any;
  
  allYears.forEach(year => {
    results[year] = calculateStats(year);
  });
  
  // Main report years (last three)
  const reportYears: AcademicYear[] = ["23-24", "24-25", "25-26"];
  const avgFQI = reportYears.reduce((sum, year) => sum + results[year].FQI, 0) / reportYears.length;
  const avgFR = reportYears.reduce((sum, year) => sum + results[year].retention.FR, 0) / reportYears.length;

  return { results, avgFQI, avgFR, individualFaculty: INDIVIDUAL_FACULTY, allYears };
}
