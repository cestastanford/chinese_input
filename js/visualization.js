queue()
  .defer(d3.json, "data/tang_seg1.json")
  .await(function(error, graph) {
    arcDiagram(graph);
});

var width   = 960,
    height  = 200,
    margin  = 20,
    pad     = margin / 2,
    padding = 10,
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
    .attr("transform", "translate(" + padding + ", " + padding + ")");

  // count the paths
  graph.links.forEach(function(d,i) {
    var pathCount = 0;
    for (var j = 0; j < i; j++) {
      var otherPath = graph.links[j];
      if (otherPath.source === d.source && otherPath.target === d.target) {
        pathCount++;
      }
    }
    d.pathCount = pathCount;
  });

  // // Create the unique identifiers for the links
  // graph.links.forEach(function(d,i) {

  // });

  // fix graph links to map to objects
  graph.links.forEach(function(d,i) {
    d.source = isNaN(d.source) ? d.source : graph.nodes[d.source];
    d.target = isNaN(d.target) ? d.target : graph.nodes[d.target];
    d.sessions = ("Session" + d.session + "Trial" + d.trial + "Seg" + d.segment)
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
    .attr("r", 14)
    .style("stroke", function(d, i) { return color(d.type); });

  // Handling mouseover functions
  nodeEnter.selectAll(".node")
    .on("mousemove", function(d, i) {
      var mouse = d3.mouse(d3.select("body").node());
      tooltip
        .classed("hidden", false)
        .attr("class", "tooltip")
        .attr("style", "left:" + (mouse[0] + 20) + "px; top:" + (mouse[1] - 50) + "px")
        .html(tooltipText(d)); 
    });
    // .on("mouseover", nodeOver);

  nodeEnter.append("text")
    .style("text-anchor", "middle")
    .attr("dx", function(d) { return d.x; })
    .attr("dy", function(d) { return d.y + 5; })
    .text(function(d) { return d.token; });

  // d3.select("#trial2")
  //   .on("mouseover", trialOver);
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
    .classed("highlighted", false)
    .attr("id", function(d) { return d.sessions})
    .style("stroke-width", function(d) { return (2 + d.pathCount); })
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
    // .call(transition);
    // .on("mouseover", edgeOver);
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

function segmentHighlight(streamHighlight) {
  if(d3.selectAll("path").filter(streamHighlight).classed("highlighted") == true){
    // d3.selectAll("path").filter(this !== streamHighlight).classed("suppressed", false)
    d3.selectAll("path").filter(streamHighlight).classed("highlighted", false)
  } else {
    // d3.selectAll("path").filter(this !== streamHighlight).classed("suppressed", true)
    d3.selectAll("path").filter(streamHighlight).classed("highlighted", true)
  }
}

// function resetHighlight() {
//   d3.selectAll("path").style("display","block");
// }

function nodeOver(d,i) {
  d3.selectAll("path").style("stroke", function (p) {return p.source == d || p.target == d ? "#17becf" : "#888888"})
}

function edgeOver(d) {
  d3.selectAll("path").style("stroke", function(p) {return p == d ? "#17becf" : "#888888"})
}

function transition(path) {
  path.transition()
    .duration(2500)
    .attrTween("stroke-dasharray", tweenDash)
    .each("end", function() { d3.select(this).call(transition); });
}

function tweenDash() {
  var l = this.getTotalLength(),
      i = d3.interpolateString("0," + l, l + "," + l);
    return function(t) { return i(t); };
}

// Checkbox functions

// d3.select("#unselect-all").on("click", unselectAll());
// d3.select("#select-all").on("click", selectAll());

// function unselectAll() {
//   console.log("unselected")
//   d3.selectAll("#select-all").attr("disabled", null);
//   d3.selectAll("#unselect-all").attr("disabled", "disabled");
//   d3.selectAll("input").property('checked', false);
// }

// function selectAll() {
//   console.log("selected")
//   d3.selectAll("#select-all").attr("disabled", "disabled");
//   d3.selectAll("#unselect-all").attr("disabled", null);
//   d3.selectAll("input").property('checked', true);
// }