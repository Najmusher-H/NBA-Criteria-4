/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Mapping of faculty data from OCR
// RF is calculated as Sanctioned Intake / 20
// S_CAY = 900, RF_CAY = 45
// S_CAYm1 = 840, RF_CAYm1 = 42
// S_CAYm2 = 720, RF_CAYm2 = 36

export const YEAR_DATA = {
  "20-21": {
    year: "20-21",
    label: "CAYm5",
    S: 600,
    RF: 30,
    X: 4,
    Y: 22,
    AF: 26,
    retention: { A: 2, B: 3, C: 10, D: 5, E: 6 }
  },
  "21-22": {
    year: "21-22",
    label: "CAYm4",
    S: 660,
    RF: 33,
    X: 5,
    Y: 25,
    AF: 30,
    retention: { A: 1, B: 5, C: 12, D: 6, E: 6 }
  },
  "22-23": {
    year: "22-23",
    label: "CAYm3",
    S: 660,
    RF: 33,
    X: 5,
    Y: 28,
    AF: 33,
    retention: { A: 0, B: 5, C: 12, D: 7, E: 9 }
  },
  "23-24": {
    year: "23-24",
    label: "CAYm2",
    S: 720,
    RF: 36,
    X: 6,
    Y: 26,
    AF: 32,
    retention: { A: 0, B: 4, C: 13, D: 6, E: 9 }
  },
  "24-25": {
    year: "24-25",
    label: "CAYm1",
    S: 840,
    RF: 42,
    X: 8,
    Y: 26,
    AF: 34,
    retention: { A: 1, B: 11, C: 9, D: 4, E: 9 }
  },
  "25-26": {
    year: "25-26",
    label: "CAY",
    S: 900,
    RF: 45,
    X: 10,
    Y: 33,
    AF: 43,
    retention: { A: 16, B: 7, C: 8, D: 3, E: 9 }
  }
};

export const INDIVIDUAL_FACULTY = [
  { name: "Dr Smitha Kurian", degree: "Ph.D", exp: 20.5 },
  { name: "Dr Deepak N R", degree: "Ph.D", exp: 3.6 },
  { name: "Dr.Pushpa M", degree: "Ph.D", exp: 2.5 },
  { name: "Dr Sharada. K.A", degree: "Ph.D", exp: 5.3 },
  { name: "Dr Nandha Gopal S M", degree: "Ph.D", exp: 2.2 },
  { name: "Prof. Khallikkunaisa", degree: "MS", exp: 26.8 },
  { name: "Dr Vadivel R", degree: "Ph.D", exp: 2.0 },
  { name: "Prof. Tahir Naquash", degree: "M.Tech", exp: 4.1 },
  { name: "Prof. Najmusher H", degree: "M.Tech", exp: 4.9 },
  { name: "Prof. Husna Tabassum", degree: "M.Tech", exp: 6.6 },
  { name: "Prof. Mary Stella", degree: "M.Tech", exp: 3.1 },
  { name: "Prof. S.Sarumathi", degree: "M.Tech", exp: 4.1 },
  { name: "Prof. Swathiee V", degree: "M.Tech", exp: 2.5 },
  { name: "Prof. J. Jenita", degree: "M.Tech", exp: 7.0 },
  { name: "Prof. Ayesha Anjum", degree: "M.Tech", exp: 4.3 },
  { name: "Prof. Simran Pal", degree: "M.Tech", exp: 3.5 },
  { name: "Prof Liji Mol", degree: "M.Tech", exp: 3.5 },
];
