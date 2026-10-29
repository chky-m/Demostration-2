"""Rebuild the two summary CSVs from the supplied cleaned TV dataset."""

import csv
from collections import Counter, defaultdict
from pathlib import Path

data_dir = Path(__file__).resolve().parent
source = data_dir / "Ex6_TVdata_withStar.csv"

with source.open(newline="", encoding="utf-8-sig") as file:
    rows = list(csv.DictReader(file))

by_tech = defaultdict(list)
size_groups = Counter()

for row in rows:
    size = int(float(row["screenSize"]))
    energy = float(row["energyConsumption"])

    if size == 55:
        by_tech[row["screenTech"]].append(energy)

    if size <= 43:
        group = "Small (<=43 in)"
    elif size <= 65:
        group = "Medium (44-65 in)"
    else:
        group = "Large (>=66 in)"
    size_groups[group] += 1

with (data_dir / "tv55-average-by-tech.csv").open("w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(["screenTech", "meanKWh", "models"])
    for tech in sorted(by_tech):
        values = by_tech[tech]
        writer.writerow([tech, f"{sum(values) / len(values):.2f}", len(values)])

with (data_dir / "tv-size-groups.csv").open("w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(["sizeGroup", "count"])
    for group in ["Small (<=43 in)", "Medium (44-65 in)", "Large (>=66 in)"]:
        writer.writerow([group, size_groups[group]])
