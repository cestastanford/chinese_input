"use strict";

queue()
  .defer(d3.json, "data/tang_session1_trial2.json")
  .defer(d3.json, "data/tang_session2_trial1.json")
  .defer(d3.json, "data/tang_session2_trial2.json")
  .defer(d3.json, "data/tang_session5_trial1.json")
  .defer(d3.json, "data/tang_session6_trial1.json")
  .defer(d3.json, "data/tang_session6_trial2.json")
  .await(ready);

// Global variables
//-----------------------------------------------------
var width     = 1200,
    height    = 500,
    margin    = {top: 10, right: 10, bottom: 10, left: 10},
    radius    = 6,
    yfixed    = 5 + radius,
    data      = {},
    groupData = {},
    groups;

// Legend variables
//-----------------------------------------------------
var legend_x      = 0,
    legend_y      = 5,
    legend_width  = 175,
    legend_height = 620,
    legend_margin = 20,
    key_y         = 40,
    key_x         = 16,
    mapped_y      = legend_y + legend_height - 90;

var color = d3.scale.category20();

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("id", "plot");

var loading = svg.append("text")
    .attr("x", width / 2)
    .attr("y", height / 2)
    .attr("text-anchor", "middle")
    .text("Loading...");

var radius = d3.scale.sqrt()
  .domain([0, 20])
  .range([0, 15]);

// Tooltip
var tooltip = d3.select("body").append("div")
  .classed("tooltip", true)
  .classed("hidden", true);

// Main
//-----------------------------------------------------

function ready(error, tang_session1_trial2, tang_session2_trial1, tang_session2_trial2, tang_session5_trial1, tang_session6_trial1, tang_session6_trial2) {
// function ready(error, data) {
  if (error) {
    loading.text("Sorry, there has been an error. " +
                 "Please refresh and try again.");
    console.log(error);
  }

   groupData = [tang_session1_trial2, tang_session2_trial1, tang_session2_trial2, tang_session5_trial1, tang_session6_trial1, tang_session6_trial2];

  groupData.forEach(function(d,i) {
    // Return a nested list of tokens
    var nodeData = d.nodes;
    var nestedData = d3.nest()
      .key(function(el) { return el.token })
      .entries(nodeData);
    // console.log(nestedData)
  });

  // groupData.forEach(function(d,i) {
  //   // fix data links to map to objects
  //   d.source = isNaN(d.source) ? d.source : groupData.nodes[d.source];
  //   d.target = isNaN(d.target) ? d.target : groupData.nodes[d.target];
  // });

  // linearLayout(groupData);
  // drawLinks(groupData.links);
  // drawNodes(groupData.nodes);
  // // drawLegend();
  // loading.remove();

}

// Node linear layout
//-----------------------------------------------------
function linearLayout(nodes) {
  nodes.sort(function(a,b) {
    return a.uniq - b.uniq;
  })

  var xscale = d3.scale.linear()
    .domain([0, nodes.length - 1])
    .range([radius, width - margin - radius]);

  nodes.forEach(function(d, i) {
    d.x = xscale(i);
    d.y = yfixed;
  });
}

// Draw nodes
//-----------------------------------------------------
function drawNodes(nodes) {

  var gnodes = d3.select("#plot").selectAll("g.node")
    .data(nodes)
  .enter().append('g');

  var nodes = gnodes.append("circle")
    .attr("class", "node")
    .attr("id", function(d, i) { return d.name; })
    .attr("cx", function(d, i) { return d.x; })
    .attr("cy", function(d, i) { return d.y; })
    .attr("r", function(d, i) { return radius; })
    .style("stroke", function(d, i) { return color(d.type); })
    .on("mouseover", function(d,i) { addTooltip(d3.select(this)); })
    .on("mouseout", function(d,i) { d3.select("#tooltip").remove(); });

  gnodes.append("text")
    // .attr("dx", function(d) { return 20})
    // .attr("cy", ".35em")
    //.text(function(d) { return d.token; });

}

// Draw edges
//-----------------------------------------------------
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
    });
}

// Draw legend
//-----------------------------------------------------
function drawLegend() {
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

// Render tooltip on mouseover
//-----------------------------------------------------
function addTooltip() {
// add node tooltips on mouseover
}

// Highlight links
//-----------------------------------------------------
function highlightLinks() {
// highlight links on mouseover
}
