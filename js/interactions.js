function populateFilters(data) {
  let selected = "all";
  const buttons = d3.select("#filters_screen").selectAll("button")
    .data(screenFilters).join("button")
    .attr("type", "button")
    .text(d => d.label)
    .on("click", (event, d) => {
      selected = d.id;
      buttons.classed("active", item => item.id === selected)
        .attr("aria-pressed", item => item.id === selected);
      const filtered = selected === "all" ? data : data.filter(row => row.screenTech === selected);
      updateHistogram(filtered);
      d3.select("#filter-summary").text(`${filtered.length.toLocaleString()} TV records shown`);
    });
  buttons.classed("active", d => d.id === selected)
    .attr("aria-pressed", d => d.id === selected);
  d3.select("#filter-summary").text(`${data.length.toLocaleString()} TV records shown`);
}

function createTooltip() {
  d3.select("#scatterplot").append("div")
    .attr("class", "tooltip")
    .attr("role", "status")
    .attr("aria-live", "polite");
}

function handleMouseEvents() {
  const frame = d3.select("#scatterplot");
  const tooltip = frame.select(".tooltip");
  frame.selectAll("circle.tv-point")
    .on("mouseenter mousemove", (event, d) => {
      const box = frame.node().getBoundingClientRect();
      const left = Math.min(event.clientX - box.left + 12, box.width - 180);
      const top = Math.max(0, event.clientY - box.top - 66);
      tooltip.text(`${d.brand} ${d.model} | ${d.screenSize} in | ${d.screenTech} | ${d.star} stars | ${d.energyConsumption} kWh/year`)
        .style("left", `${Math.max(0, left)}px`)
        .style("top", `${top}px`)
        .style("opacity", 1);
    })
    .on("mouseleave", () => tooltip.style("opacity", 0));
}
