d3.csv("data/Ex6_TVdata_withStar.csv", d => ({
  brand: d.brand,
  model: d.model,
  screenSize: +d.screenSize,
  screenTech: d.screenTech,
  star: +d.star,
  energyConsumption: +d.energyConsumption
})).then(data => {
  console.log("TV data sample", data.slice(0, 5));
  console.log("Rows:", data.length, "Energy range:", d3.extent(data, d => d.energyConsumption));
  drawHistogram(data);
  populateFilters(data);
  drawScatterplot(data);
  createTooltip();
  handleMouseEvents();
}).catch(error => {
  d3.select("#histogram").text(`Could not load TV CSV: ${error.message}`).attr("class", "chart-error");
});
