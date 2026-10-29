d3.csv("data/tvBrandCount.csv", d => ({ brand: d.brand, count: +d.count }))
  .then(data => {
    console.log("TV brand counts", data);
    console.log("Rows:", data.length, "Max count:", d3.max(data, d => d.count));
    drawBarChart(data.sort((a, b) => d3.descending(a.count, b.count)));
  })
  .catch(error => d3.select("#brand-chart").text(`Could not load CSV: ${error.message}`).attr("class", "chart-error"));

function drawBarChart(data) {
  const width = 900;
  const rowHeight = 29;
  const margin = { top: 52, right: 80, bottom: 55, left: 170 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = data.length * rowHeight;
  const height = margin.top + innerHeight + margin.bottom;

  const svg = d3.select("#brand-chart").append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr("aria-label", "TV brand record counts, sorted from most to fewest");
  const chart = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
  const xScale = d3.scaleLinear().domain([0, d3.max(data, d => d.count)]).nice().range([0, innerWidth]);
  const yScale = d3.scaleBand().domain(data.map(d => d.brand)).range([0, innerHeight]).padding(0.2);

  const barAndLabel = chart.selectAll("g.brand-row").data(data).join("g")
    .attr("class", "brand-row")
    .attr("transform", d => `translate(0,${yScale(d.brand)})`);
  barAndLabel.append("rect")
    .attr("x", 0).attr("y", 0)
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "#377eac");
  barAndLabel.append("text")
    .attr("x", -10).attr("y", yScale.bandwidth() / 2)
    .attr("dy", "0.35em").attr("text-anchor", "end")
    .attr("class", "axis-label").text(d => d.brand);
  barAndLabel.append("text")
    .attr("x", d => xScale(d.count) + 6)
    .attr("y", yScale.bandwidth() / 2).attr("dy", "0.35em")
    .attr("class", "value-label").text(d => d.count);

  chart.append("g").attr("class", "axis")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScale).ticks(6).tickFormat(d3.format("d")));
  svg.append("text").attr("x", width / 2).attr("y", 27)
    .attr("text-anchor", "middle").attr("class", "chart-title")
    .text("Number of TV model records by brand");
  svg.append("text").attr("x", margin.left + innerWidth / 2).attr("y", height - 7)
    .attr("text-anchor", "middle").attr("class", "axis-label")
    .text("Model records");
}
