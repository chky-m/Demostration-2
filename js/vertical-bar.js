d3.csv("data/tv55-average-by-tech.csv", d => ({
  screenTech: d.screenTech, meanKWh: +d.meanKWh, models: +d.models
})).then(data => {
  console.log("55-inch TV means", data);
  drawVerticalBar(data);
}).catch(error => d3.select("#bar-chart").text(`Could not load CSV: ${error.message}`).attr("class", "chart-error"));

function drawVerticalBar(data) {
  const width = 900, height = 470;
  const margin = { top: 45, right: 35, bottom: 70, left: 82 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const svg = d3.select("#bar-chart").append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr("aria-label", "Average annual labelled energy consumption in kWh for 55-inch TVs by screen technology");
  const innerChart = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
  const xScale = d3.scaleBand().domain(data.map(d => d.screenTech)).range([0, innerWidth]).padding(0.35);
  const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.meanKWh) * 1.18]).nice().range([innerHeight, 0]);

  innerChart.selectAll("rect.bar").data(data).join("rect")
    .attr("class", "bar").attr("x", d => xScale(d.screenTech))
    .attr("y", d => yScale(d.meanKWh))
    .attr("width", xScale.bandwidth())
    .attr("height", d => innerHeight - yScale(d.meanKWh))
    .attr("fill", "#9a5717");
  innerChart.selectAll("text.value-label").data(data).join("text")
    .attr("class", "value-label")
    .attr("x", d => xScale(d.screenTech) + xScale.bandwidth() / 2)
    .attr("y", d => yScale(d.meanKWh) - 9)
    .attr("text-anchor", "middle")
    .text(d => `${d.meanKWh.toFixed(1)} (${d.models} models)`);

  innerChart.append("g").attr("class", "axis")
    .attr("transform", `translate(0,${innerHeight})`).call(d3.axisBottom(xScale).tickSize(0))
    .select(".domain").remove();
  innerChart.append("g").attr("class", "axis").call(d3.axisLeft(yScale).ticks(6));
  svg.append("text").attr("class", "axis-label").attr("text-anchor", "middle")
    .attr("transform", `translate(20,${margin.top + innerHeight / 2}) rotate(-90)`)
    .text("Mean labelled consumption (kWh/year)");
}
