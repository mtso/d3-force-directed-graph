import { handleDrag } from './drag-handler'

export const handleData = (svg, flagbox, sim) => {
  return (graph) => {
    graph = JSON.parse(graph.responseText)

    let link = svg
      .append('g')
        .attr("class", "links")
      .selectAll('line')
      .data(graph.links).enter()
        .append('line')
        .attr('stroke-width', 1)
        .attr('stroke', 'black')
   
    let node = flagbox
      .selectAll('img')
        .data(graph.nodes).enter()
      .append('img')
        .attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=')
        .attr('class', d => 'flag flag-' + d.code)
        .style('position', 'absolute')
        .style('left', d => d.x + 'px')
        .style('top', d => d.y + 'px')
        .call(handleDrag(sim))

    sim.nodes(graph.nodes)
      .on('tick', onTick)

    sim.force('link')
      .links(graph.links)

    function onTick() {
      link
        .attr('x1', d => d.source.x + 8)
        .attr('y1', d => d.source.y + 5)
        .attr('x2', d => d.target.x + 8)
        .attr('y2', d => d.target.y + 5)
      node
        .style('left', d => d.x + 'px')
        .style('top', d => d.y + 'px')
    }
  }
}