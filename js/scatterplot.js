function drawScatterplot(data) {
  const { width, height, margin, innerWidth, innerHeight } = chartSize;
  const xScaleS = d3.scaleLinear().domain([0, d3.max(data, d => d.star)]).nice().range([0, innerWidth]);
  const yScaleS = d3.scaleLinear().domain([0, d3.max(data, d => d.energyConsumption)]).nice().range([innerHeight, 0]);
  const svg = d3.select("#scatterplot").append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr("aria-label", "Each TV model is a dot: star rating on x axis, annual energy use on y axis, screen technology by colour");
  const innerChartS = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  innerChartS.selectAll("circle.tv-point").data(data).join("circle")
    .attr("class", "tv-point")
    .attr("cx", d => xScaleS(d.star))
    .attr("cy", d => yScaleS(d.energyConsumption))
    .attr("r", 3.2)
    .attr("fill", d => screenColours(d.screenTech))
    .attr("opacity", 0.48)
    .append("title")
    .text(d => `${d.brand} ${d.model}: ${d.screenSize} in, ${d.star} stars, ${d.energyConsumption} kWh/year`);
  innerChartS.append("g").attr("class", "axis")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScaleS).ticks(8));
  innerChartS.append("g").attr("class", "axis")
    .call(d3.axisLeft(yScaleS).ticks(6));
  svg.append("text").attr("class", "axis-label")
    .attr("x", margin.left + innerWidth / 2).attr("y", height - 8)
    .attr("text-anchor", "middle").text("Star rating");
  svg.append("text").attr("class", "axis-label")
    .attr("transform", `translate(20,${margin.top + innerHeight / 2}) rotate(-90)`)
    .attr("text-anchor", "middle").text("Labelled consumption (kWh/year)");
}
