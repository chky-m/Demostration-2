d3.csv("data/tv-size-groups.csv", d => ({ sizeGroup: d.sizeGroup, count: +d.count }))
  .then(data => {
    console.log("TV size groups", data);
    drawDonutChart(data);
  })
  .catch(error => d3.select("#donut-chart").text(`Could not load CSV: ${error.message}`).attr("class", "chart-error"));

function drawDonutChart(data) {
  const width = 900, height = 470;
  const radius = 170;
  const total = d3.sum(data, d => d.count);
  const colours = d3.scaleOrdinal()
    .domain(data.map(d => d.sizeGroup))
    .range(["#377eac", "#e29b43", "#67a477"]);
  const pie = d3.pie().sort(null).value(d => d.count);
  const arcGenerator = d3.arc().innerRadius(radius * 0.55).outerRadius(radius);
  const labelArc = d3.arc().innerRadius(radius * 0.79).outerRadius(radius * 0.79);
  const svg = d3.select("#donut-chart").append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr("aria-label", "TV model records divided into small, medium and large screen-size groups");
  const chart = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

  chart.selectAll("path.slice").data(pie(data)).join("path")
    .attr("class", "slice").attr("d", arcGenerator)
    .attr("fill", d => colours(d.data.sizeGroup))
    .attr("stroke", "#fff").attr("stroke-width", 3)
    .append("title").text(d => `${d.data.sizeGroup}: ${d.data.count} records`);
  chart.selectAll("text.slice-label").data(pie(data)).join("text")
    .attr("class", "slice-label")
    .attr("transform", d => `translate(${labelArc.centroid(d)})`)
    .attr("text-anchor", "middle").attr("dy", "0.35em")
    .attr("fill", "#17242f").attr("font-size", 14).attr("font-weight", 700)
    .text(d => `${Math.round(d.data.count / total * 100)}%`);
  chart.append("text").attr("text-anchor", "middle").attr("font-size", 23)
    .attr("font-weight", 700).attr("fill", "#17242f").text(d3.format(",")(total));
  chart.append("text").attr("text-anchor", "middle").attr("y", 24)
    .attr("font-size", 13).attr("fill", "#52616e").text("TV records");

  const legend = d3.select("#donut-chart").append("div").attr("class", "legend");
  legend.selectAll("span").data(data).join("span")
    .html(d => `<i style="background:${colours(d.sizeGroup)}"></i>${d.sizeGroup}: ${d3.format(",")(d.count)}`);
}
