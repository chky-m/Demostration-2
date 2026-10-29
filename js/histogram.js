let histogramBars;
let histogramYScale;

function drawHistogram(data) {
  const { width, height, margin, innerWidth, innerHeight } = chartSize;
  const bins = binGenerator(data);
  const xScale = d3.scaleLinear().domain([0, 2800]).range([0, innerWidth]);
  histogramYScale = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length)]).nice()
    .range([innerHeight, 0]);
  const svg = d3.select("#histogram").append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr("aria-label", "Frequency of TV energy consumption in 200 kWh per year bins");
  const innerChart = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  histogramBars = innerChart.selectAll("rect.bin").data(bins).join("rect")
    .attr("class", "bin")
    .attr("x", d => xScale(d.x0) + 1)
    .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 2))
    .attr("fill", "#9a5717");
  histogramBars.append("title");
  updateHistogram(data);

  innerChart.append("g").attr("class", "axis")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScale).ticks(8));
  innerChart.append("g").attr("class", "axis")
    .call(d3.axisLeft(histogramYScale).ticks(6).tickFormat(d3.format("d")));
  svg.append("text").attr("class", "axis-label")
    .attr("x", margin.left + innerWidth / 2).attr("y", height - 8)
    .attr("text-anchor", "middle").text("Labelled consumption (kWh/year)");
  svg.append("text").attr("class", "axis-label")
    .attr("transform", `translate(20,${margin.top + innerHeight / 2}) rotate(-90)`)
    .attr("text-anchor", "middle").text("Number of TV records");
}

function updateHistogram(data) {
  const bins = binGenerator(data);
  const innerHeight = chartSize.innerHeight;
  histogramBars.data(bins)
    .transition().duration(350)
    .attr("y", d => histogramYScale(d.length))
    .attr("height", d => innerHeight - histogramYScale(d.length));
  histogramBars.select("title")
    .text(d => `${d.x0}-${d.x1} kWh/year: ${d.length} TVs`);
}
