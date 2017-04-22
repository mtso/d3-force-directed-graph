const d3 = require('d3')

function drawSvgGraph(width, height) {
  return d3
    .select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background-color', 'white')
}

module.exports = { drawSvgGraph }