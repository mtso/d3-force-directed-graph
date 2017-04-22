const d3 = require('d3')

function drawSvgGraph(parent, width, height) {
  return parent
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background-color', 'white')
}

module.exports = { drawSvgGraph }