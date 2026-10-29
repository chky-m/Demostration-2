d3.csv("data/ARE_Spot_Prices.csv", d => ({
  year: +d.Year,
  averagePrice: +d["Average Price (notTas-Snowy)"]
})).then(data => {
  data.sort((a, b) => d3.ascending(a.year, b.year));
  console.log("Electricity spot prices", data);
  drawLineChart(data);
}).catch(error => d3.select("#line-chart").text(`Could not load CSV: ${error.message}`).attr("class", "chart-error"));

function drawLineChart(data) {
  const width = 900, height = 470;
  const margin = { top: 35, right: 40, bottom: 70, left: 82 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const svg = d3.select("#line-chart").append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr("aria-label", "Average annual electricity spot price from 1998 to 2024, with dots for each yearly value");
  const innerChart = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
  const xScale = d3.scaleLinear().domain(d3.extent(data, d => d.year)).range([0, innerWidth]);
  const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.averagePrice)]).nice().range([innerHeight, 0]);
  const lineGenerator = d3.line().x(d => xScale(d.year)).y(d => yScale(d.averagePrice));

  innerChart.append("path").datum(data).attr("d", lineGenerator)
    .attr("fill", "none").attr("stroke", "#24659a").attr("stroke-width", 2.5);
  innerChart.selectAll("circle.price-point").data(data).join("circle")
    .attr("class", "price-point").attr("cx", d => xScale(d.year))
    .attr("cy", d => yScale(d.averagePrice)).attr("r", 4)
    .attr("fill", "#24659a")
    .append("title").text(d => `${d.year}: $${d.averagePrice}/MWh`);
  innerChart.append("g").attr("class", "axis")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScale).ticks(9).tickFormat(d3.format("d")));
  innerChart.append("g").attr("class", "axis")
    .call(d3.axisLeft(yScale).ticks(6).tickFormat(d => `$${d}`));
  svg.append("text").attr("class", "axis-label").attr("x", margin.left + innerWidth / 2)
    .attr("y", height - 10).attr("text-anchor", "middle").text("Year");
  svg.append("text").attr("class", "axis-label")
    .attr("transform", `translate(20,${margin.top + innerHeight / 2}) rotate(-90)`)
    .attr("text-anchor", "middle").text("Average price ($/MWh)");
}
