import {
  data_url,
  width,
  height,
} from '../config'
import { drawSvgGraph } from './graph'

const d3 = require('d3')

document.body.style.cssText = 'background-color:lightgray'

var svg = drawSvgGraph(width, height)

var sim = d3
  .forceSimulation()
  .force('link', d3.forceLink().id((_, i) => i))
  .force('charge', d3.forceManyBody().strength(-15).distanceMax([width / 4]))
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

  // let node = svg
  //   .append('g')
  //     .attr('class', 'nodes')
  //   .selectAll('circle')
  //   .data(graph.nodes).enter()
  //     .append('circle')
  //     .attr('r', 5)
  //     .attr('fill', 'black')
  //     .call(handleDrag)

  let node = svg
    .append('g')
      .attr('class', 'nodes')
    .selectAll('image')
    .data(graph.nodes).enter()
      .append('svg:image')
      .attr('xlink:href', 'flags.png')
      .attr('class', d => 'flag flag-' + d.code)
      .attr('width', 16)
      .attr('height', '11')
      // .attr('r', 5)
      // .attr('fill', 'black')
      .call(handleDrag)

  sim.nodes(graph.nodes)
    .on('tick', onTick)

  sim.force('link')
    .links(graph.links)

  function onTick() {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
    node
      .attr('x', d => d.x)
      .attr('y', d => d.y)
  }
}

d3.request(data_url)
  .get(display)
