const d3 = require('d3')

function handleDrag(simulation) {
  let onStart = d => {
    if (!d3.event.active) {
      simulation.alphaTarget(0.3).restart()
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
      simulation.alphaTarget(0).restart()
    }
    d.fx = null
    d.fy = null    
  }
  return d3
    .drag()
    .on('start', onStart)
    .on('drag', onDrag)
    .on('end', onEnd)
}

module.exports = { handleDrag }