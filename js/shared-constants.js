const chartSize = {
  width: 900,
  height: 450,
  margin: { top: 30, right: 32, bottom: 64, left: 80 }
};
chartSize.innerWidth = chartSize.width - chartSize.margin.left - chartSize.margin.right;
chartSize.innerHeight = chartSize.height - chartSize.margin.top - chartSize.margin.bottom;

const screenColours = d3.scaleOrdinal()
  .domain(["LCD", "LED", "OLED"])
  .range(["#377eac", "#e29b43", "#8b6eb1"]);

const binGenerator = d3.bin()
  .value(d => d.energyConsumption)
  .domain([0, 2800])
  .thresholds(d3.range(200, 2800, 200));

const screenFilters = [
  { id: "all", label: "All TVs" },
  { id: "LCD", label: "LCD" },
  { id: "LED", label: "LED" },
  { id: "OLED", label: "OLED" }
];
