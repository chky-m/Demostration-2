# COS30045 Demonstration 2

This is a small D3 website for the Week 4-6 data visualisation exercises. Open `index.html` through VS Code Live Server so the charts can load local CSV files. The D3 v7 script loads from `d3js.org`.

## Pages

| Page | Content |
| --- | --- |
| `svg-house.html` | SVG house, grouped windows, shapes, path, and transforms |
| `bar-chart.html` | Horizontal chart of TV model records by brand |
| `multi-chart.html` | Vertical bar, electricity-price scatter and line, and TV-size donut |
| `interactive.html` | Energy-use histogram with screen-type filters and a scatterplot with tooltips |

## Data

- `data/tvBrandCount.csv` was supplied inside the course's `2026 TV Data.knwf` workflow. It contains 4,240 brand records.
- `data/Ex6_TVdata_withStar.csv` is the supplied cleaned TV dataset with 4,233 rows. Its columns are `brand`, `model`, `screenSize` (inches), `screenTech`, `star`, and `energyConsumption` (labelled kWh/year).
- `data/ARE_Spot_Prices.csv` is the supplied annual electricity-price dataset, 1998-2024. The chart uses its average column, which excludes Tasmania and Snowy.
- `data/prepare_data.py` creates `tv55-average-by-tech.csv` and `tv-size-groups.csv` from the cleaned TV CSV. Size groups are small (up to 43 inches), medium (44-65), and large (66 and above), so every row belongs to one group.

The brand-count file and the Week 6 cleaned TV file have different row totals. They should be described as separate supplied data exports rather than compared as one sample.

## Demonstration notes

The project is intended for an on-campus explanation of SVG coordinates, CSV row conversion, data binding, scales, chart construction, filters, and tooltips. `assets/` contains a browser screenshot retained as evidence. The separate GenAI declaration is prepared as a Word document in Downloads for individual submission.
