# Appliance Energy Consumption Website

A three-page COS30045 student website about appliance energy use in the Australian market. The Home page has clearly marked placeholder content and a JavaScript FAQ accordion. The Televisions page brings the course's D3 charts together. About Us explains the project and retains the earlier SVG drawing exercise.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home, Australian appliance placeholders, and interactive FAQ |
| `televisions.html` | TV model, energy-use, size, rating, and electricity spot-price charts |
| `about.html` | Project information and SVG drawing practice |

The same top navigation and footer appear on all three pages. The power logo links to Home. The active page is highlighted, and navigation links have hover and keyboard-focus states. The footer year is filled from the visitor's current date.

## Run locally

Open `index.html` through VS Code Live Server or another local web server. Loading the site directly with `file://` can prevent the charts from reading the CSV files. D3 v7 is loaded from `d3js.org`, so the Televisions page needs an internet connection unless D3 is provided locally.

## Organisation

- `assets/img/PowerIcon.png` is the supplied power logo.
- `css/base.css` contains shared page and FAQ styling; `css/visualisation.css` contains chart styling. There are no inline HTML styles.
- `js/site.js` fills in the year and controls the FAQ. The other files in `js/` build the D3 charts and interactions.
- `data/` contains the supplied CSV inputs, `prepare_data.py`, and two generated chart summaries.

The existing `css/`, `js/`, and `data/` directories were kept because the chart scripts and data files already used these paths. The logo is grouped under `assets/img/`.

## Data and interpretation

- `data/tvBrandCount.csv` came from the course's `2026 TV Data.knwf` workflow and totals 4,240 brand records.
- `data/Ex6_TVdata_withStar.csv` is the supplied cleaned TV dataset with 4,233 model rows. Its columns are `brand`, `model`, `screenSize` in inches, `screenTech`, `star`, and `energyConsumption` labelled kWh/year.
- `data/prepare_data.py` creates `tv55-average-by-tech.csv` and `tv-size-groups.csv` from the cleaned TV dataset. The size groups are small (up to 43 inches), medium (44–65), and large (66 and above).
- `data/ARE_Spot_Prices.csv` contains yearly electricity spot-price figures from 1998 to 2024. The chart uses its average column, which excludes Tasmania and Snowy.

The two supplied TV exports have different totals and should be described as separate samples. Brand counts are model records, not sales or market share. Spot prices in dollars per megawatt hour are not household electricity bills. Home's Australian market text is deliberately labelled as placeholder copy pending sourced content.

## Generative AI Reflection

- **Tools used:** OpenAI Codex assisted in this project. [PLACEHOLDER: Confirm the exact model/version and add any other tools you personally used.]
- **What I used GenAI for:** Codex helped draft the page structure, CSS, JavaScript FAQ, D3 chart code, data-preparation script, README, and later cleanup. The project was then reorganised into three pages with the supplied logo and shared navigation.
- **What I changed or adapted:** I requested removal of overlapping/repeated content and unnecessary code/comments. [PLACEHOLDER: Describe edits you personally made, checked, accepted, or rejected after generation.]
- **What I learned:** [PLACEHOLDER: Write in your own words what you learned about HTML, CSS, JavaScript, SVG, D3, or data interpretation.]
