import {
  data_url,
  width,
  height,
} from '../config'

const d3 = require('d3')

document.body.style.cssText = 'background-color:lightgray'

var svg = d3
  .select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background-color', 'white')

var sim = d3
  .forceSimulation()
  .force('link', d3.forceLink().id((_, i) => i))
  .force('charge', d3.forceManyBody())
  .force('center', d3.forceCenter(width / 2, height / 2))

const display = (graph) => {
  graph = JSON.parse(graph.responseText)
  console.log(graph)

  let link = svg
    .append('g')
      .attr("class", "links")
    .selectAll('line')
    .data(graph.links).enter()
      .append('line')
      .attr('stroke-width', 2)

  let onStart = d => {
    if (!d3.event.active) {
      sim.alphaTarget(0.3).restart()
    }
    d.fx = d.x
    d.fy = d.y
  }
  let onDrag = d => {
    d.fx = d3.event.x
    d.fy = d3.event.y
  }
  let onEnd = d => {
    if (!d3.event.active) {
      sim.alphaTarget(0).restart()
    }
    d.fx = null
    d.fy = null    
  }
  let handleDrag = d3.drag()
    .on('start', onStart)
    .on('drag', onDrag)
    .on('end', onEnd)

  let node = svg
    .append('g')
      .attr('class', 'nodes')
    .selectAll('circle')
    .data(graph.links).enter()
      .append('circle')
      .attr('r', 5)
      .attr('fill', 'black')
      .call(handleDrag)

  sim.nodes(graph.nodes)
    .on('tick')

  sim.force('link')
    .links(graph.links)

  function onTick() {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
    node
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
  }
}

d3.request(data_url)
  .get(display)
