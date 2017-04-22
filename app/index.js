import {
  data_url,
  width,
  height,
} from '../config'
import { drawSvgGraph } from './graph'
import { handleData } from './display'

const d3 = require('d3')

d3.select('html')
  .style('width', '100%')

d3.select('body')
  .style('width', '100%')
  .style('background-color', 'lightgray')
  .style('text-align', 'center')
  .style('margin', '0')

var graph = d3.select('body')
  .append('div')
  .style('position', 'relative')
  .style('margin', '3em auto')
  .style('display', 'inline-block')

var svg = drawSvgGraph(graph, width, height)
  .style('margin', '0 auto')

var sim = d3
  .forceSimulation()
  .force('link', d3.forceLink().id((_, i) => i))
  .force('charge', d3.forceManyBody().strength(-15).distanceMax([width / 4]))
  .force('center', d3.forceCenter(width / 2, height / 2))

var flagbox = graph
  .append('div')
  .style('position', 'absolute')
  .style('top', '0px')
  .style('left', '0px')

d3.request(data_url)
  .get(handleData(svg, flagbox, sim))

svg.append('text')
  .text('Force Directed Graph of State Contiguity')
  .attr('text-anchor', 'middle')
  .attr('x', width / 2)
  .attr('y', 40)