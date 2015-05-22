queue()
  .defer(d3.json, "data/tang_seg1.json")
  .await(function(error, graph) {
    arcDiagram(graph);
});

var width   = 960,
    height  = 400,
    margin  = 20,
    pad     = margin / 2,
    radius  = 6,
    yfixed  = pad + radius;

// Legend variables
var legend_x = 0,
    legend_y = 5,
    legend_width = 175,
    legend_height = 620,
    legend_margin = 20
    key_y = 40,
    key_x = 16,
    mapped_y = legend_y + legend_height - 90;

var color = d3.scale.category20();

// Tooltip
var tooltip = d3.select("body").append("div")
  .classed("tooltip", true)
  .classed("hidden", true);

// Main
//-----------------------------------------------------
function arcDiagram(graph) {
  var radius = d3.scale.sqrt()
    .domain([0, 20])
    .range([0, 15]);

  var svg = d3.select("#chart").append("svg")
      .attr("id", "arc")
      .attr("width", width)
      .attr("height", height);

  // create plot within svg
  var plot = svg.append("g")
    .attr("id", "plot")
    .attr("transform", "translate(" + pad + ", " + pad + ")");

  // fix graph links to map to objects
  graph.links.forEach(function(d,i) {
    d.source = isNaN(d.source) ? d.source : graph.nodes[d.source];
    d.target = isNaN(d.target) ? d.target : graph.nodes[d.target];
  });

  linearLayout(graph.nodes);
  drawLinks(graph.links);
  drawNodes(graph.nodes);
}

// layout nodes linearly
function linearLayout(nodes) {
  nodes.sort(function(a,b) {
    return a.uniq - b.uniq;
  });

  var xscale = d3.scale.linear()
    .domain([0, nodes.length - 1])
    .range([radius, width - margin - radius]);

  nodes.forEach(function(d, i) {
    d.x = xscale(i);
    d.y = yfixed;
  });
}

function drawNodes(nodes) {

  var gnodes = d3.select("#plot").selectAll("g.node")
    .data(nodes);

  var nodeEnter = gnodes.enter()
    .append('g')
    .attr("class","gnode");

  nodeEnter.append("circle")
    .attr("class", "node")
    .attr("id", function(d, i) { return d.name; })
    .attr("cx", function(d, i) { return d.x; })
    .attr("cy", function(d, i) { return d.y; })
    .attr("r", 10)
    .style("stroke", function(d, i) { return color(d.type); })
    .on("mousemove", function(d, i) {
      var mouse = d3.mouse(d3.select("body").node());
      tooltip
        .classed("hidden", false)
        .attr("style", "left:" + (mouse[0] + 20) + "px; top:" + (mouse[1] - 50) + "px")
        .html(tooltipText(d)); 
    })
    // .on("mouseover", nodeOver);
    // .on("mouseover", function(d,i) { addTooltip(d3.select(this)); })
    // .on("mouseout", function(d,i) { d3.select("#tooltip").remove(); });

    nodeEnter.selectAll("circle")
    .on("mousemove", function(d, i) {
      var mouse = d3.mouse(d3.select("body").node());
      tooltip
        .classed("hidden", false)
        .attr("style", "left:" + (mouse[0] + 20) + "px; top:" + (mouse[1] - 50) + "px")
        .html(tooltipText(d)); 
    })
    .on("mouseout", function(d, i) {
      tooltip.classed("hidden", true);
    });

  // nodeEnter.append("text")
  //   // .attr("cy", ".35em")
  //   .style("text-anchor", "middle")
  //   .attr("cx", function(d, i) { return d.x; })
  //   .attr("cy", function(d, i) { return d.y; })
  //   .text(function(d) { return d.token; });
}

function drawLinks(links) {
  var radians = d3.scale.linear()
    .range([Math.PI / 2, 3 * Math.PI / 2]);

  var arc = d3.svg.line.radial()
    .interpolate("basis")
    .tension(0)
    .angle(function(d) { return radians(d); });

  d3.select("#plot").selectAll(".link")
    .data(links)
  .enter().append("path")
    .attr("class", "link")
    .style("stroke-width", 2)
    .attr("transform", function(d,i) {
      var xshift = d.source.x + (d.target.x - d.source.x) / 2;
      var yshift = yfixed;
      return "translate(" + xshift + ", " + yshift + ")";
    })
    .attr("d", function(d,i) {
      var xdist = Math.abs(d.source.x - d.target.x);
      arc.radius(xdist / 2);
      var points = d3.range(0, Math.ceil(xdist / 3));
      radians.domain([0, points.length - 1]);
      return arc(points);
    })
    .on("mouseover", edgeOver);
}

// Draw legend
//-----------------------------------------------------
function drawLegend(d) {
  var legend = svg.append("g")
      .attr("class", "legend");
  var key = legend.append("g")

  // Initial
  key.append("circle")
      .attr("id", "legend_initial")
      .attr("cx", legend_x + key_x)
      .attr("cy", legend_y + key_y + 5)
      .attr("r", 5)
      .style("fill", "blue");

    key.append("text")
      .attr("class", "legendText")
      .attr("id", "legend_initial_label")
      .attr("x", legend_x + key_x + 10 )
      .attr("y", legend_y + 10 + key_y )
      .text("Initial");

    // Selection
    key.append("circle")
        .attr("id", "legend_selection")
        .attr("cx", function () { return legend_x + key_x })
        .attr("cy", function () { return legend_y + legend_margin + key_y + 5 })
        .attr("r", 5)
        .style("fill", "lightblue");

    key.append("text")
        .attr("class", "legendText")
        .attr("id", "legend_selection_label")
        .attr("x", legend_x + key_x + 10)
        .attr("y", legend_y + legend_margin + 10 + key_y)
        .text("Selection");

    // Final
    key.append("circle")
        .attr("id", "legend_final")
        .attr("cx", legend_x + key_x)
        .attr("cy", legend_y + 2 * legend_margin + key_y + 5)
        .attr("r", 5)
        .style("fill", "orange");

    key.append("text")
        .attr("class", "legendText")
        .attr("id", "legend_final_label")
        .attr("x", legend_x + key_x + 10)
        .attr("y", legend_y + 2 * legend_margin + 10 + key_y)
        .text("Final");

    // Delete
    key.append("circle")
        .attr("id", "legend_delete")
        .attr("cx", legend_x + key_x)
        .attr("cy", legend_y + 3 * legend_margin + key_y + 5)
        .attr("r", 5)
        .style("fill", "gold");

    key.append("text")
        .attr("class", "legendText")
        .attr("id", "legend_delete_label")
        .attr("x", legend_x + key_x + 10)
        .attr("y", legend_y + 3 * legend_margin + 10 + key_y)
        .text("Delete");
}

function tooltipText(d) {
 return "<h5>Information for " + d.token + "</h5>" +
   "<table>" +
   "<tr>" +
   "<td class='field'>Token: </td>" +
   "<td>" + d.token + "</td>" +
   "</tr>" +
   "<tr>" +
   "<td class='field'>Dialect: </td>" +
   "<td>" + d.dialect + "</td>" +
   "</tr>" +
   "<tr>" +
   "<td class='field'>IME: </td>" +
   "<td>" + d.input_method + "</td>" +
   "</tr>" +
   "<tr>" +
   "<td class='field'>Operating System: </td>" +
   "<td>" + d.operating_system + "</td>" +
   "</tr>" +
   "<tr>" +
   "<td class='field'>Trial: </td>" +
   "<td>" + d.trial + "</td>" +
   "</tr>" +
   "</table>";
}

function nodeOver(d,i) {
  // d3.selectAll("circle").style("fill", function (p) {return p == d ? "red" : "#888888"})
  d3.selectAll("path").style("stroke", function (p) {return p.source == d || p.target == d ? "#17becf" : "#888888"})
}

function edgeOver(d) {
  d3.selectAll("path").style("stroke", function(p) {return p == d ? "#17becf" : "#888888"})
  // d3.selectAll("circle").style("fill", function(p) {return p == d.source ? "blue" : p == d.target ? "green" : "#888888"})     
}

function tokenOver(d,i) {
  d3.selectAll(this).style("stroke", function(d) { return p.token == d ? "#17becf" : "#888888"})
}