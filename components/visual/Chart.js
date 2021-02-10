import * as d3 from 'd3'
import { createLayout } from './pack'

class Chart {
  constructor(datasets, options = {}, callbacks = {}) {
    this.options = {
      width: 800,
      height: 400,
      padding: 3,
      border: 2,
      lineHeight: 20,
      textMaxWidthFactor: 0.8,
    }

    this.setOptions(options)

    this.callbacks = callbacks

    this.init()

    this.setData(datasets)
  }

  setOptions(options) {
    this.options = Object.assign({}, this.options, options)
  }

  init() {
    const { width, height } = this.options

    const svg = d3
      .select('#circles-container')
      .attr('viewBox', [0, 0, width, height])
      .attr('width', '100%')
      .attr('height', height)
      .on('click', this.clickEmptySpace)

    const g = svg
      .append('g')
      .attr('style', 'transition:transform 0.15s ease-out')

    let lastZoom = 1
    let zoomCheck = false
    const zoom = d3
      .zoom()
      .extent([
        [0, 0],
        [width, height],
      ])
      .scaleExtent([0.6, 3])
      .on('start', () => {
        g.attr('style', 'none')
      })
      .on('zoom', ({ transform }) => {
        // enable transition on zoom
        if (!zoomCheck && lastZoom !== transform.k) {
          g.attr('style', 'transition:transform 0.3s ease-out')
        }
        zoomCheck = true
        lastZoom = transform.k
        // center
        if (zoomCheck && transform.k < 1) {
          transform.x = width / 2 + (transform.x - width / 2) * 0.9
          transform.y = height / 2 + (transform.y - height / 2) * 0.9
        }
        g.attr('transform', transform)
      })
      .on('end', () => {
        zoomCheck = false
      })

    svg.call(zoom)

    // Center
    g.attr(
      'transform',
      d3.zoomIdentity.scale(1).translate(width / 2, height / 2)
    )
    svg.call(
      zoom.transform,
      d3.zoomIdentity.scale(1).translate(width / 2, height / 2)
    )

    // Store references
    this.svg = svg
    this.g = g
    this.zoom = zoom
  }

  setData(datasets) {
    const { width, height, padding } = this.options
    this.datasets = datasets

    // prepare node data
    const nodes = datasets.map((dataset, index) => ({
      id: dataset.slug,
      dataset,
      color: dataset.color || d3.interpolateCool(index / datasets.length),
      value:
        dataset.distribution?.length > 0
          ? dataset.distribution[0].contentSize
          : 0,
    }))

    // calculate circle pack layout
    const layout = createLayout({
      nodes,
      width,
      height,
    })

    // apply data changes to d3
    const circles = this.g.selectAll('.node').data(layout, ({ id }) => id)

    circles.exit().remove()

    const nodeEnter = circles.enter()
    this.buildNodes(nodeEnter)

    circles.merge(nodeEnter)

    // update
    circles.attr(
      'style',
      ({ x, y, r }) =>
        `transform:translate(${x}px,${y}px) scale(${r / (50 + padding)});`
    )
  }

  mouseOver = (_, node) => {
    this.g.selectAll('.node').classed('dim', true)
    this.g
      .select('#node-' + node.id)
      .classed('dim', false)
      .classed('hover', true)

    // hover callback
    this.callbacks.onHover && this.callbacks.onHover(node.id)
  }

  mouseOut = (_, node) => {
    this.g.selectAll('.node').classed('dim', false).classed('hover', false)

    // hover callback
    this.callbacks.onHover && this.callbacks.onHover('')
  }

  clickEmptySpace = () => {
    // click callback
    this.callbacks.onClick && this.callbacks.onClick('')
  }

  click = (event, node) => {
    this.g.selectAll('.active').classed('active', false)
    this.g.select('#node-' + node.id).classed('active', true)

    // click callback
    this.callbacks.onClick && this.callbacks.onClick(node.id)

    event.stopPropagation()
  }

  buildNodes(nodes) {
    const { border, padding } = this.options

    // get node holder
    const node = nodes
      .append('g')
      .attr('id', ({ id }) => 'node-' + id)
      .attr('class', 'node')
      .style('transition', 'transform 0.3s ease-out')
      .attr(
        'style',
        ({ x, y, r }) =>
          `transform:translate(${x}px,${y}px) scale(${r / (50 + padding)});`
      )
      .on('mouseover', this.mouseOver)
      .on('mouseout', this.mouseOut)
      .on('click', this.click)

    // main node holder
    const content = node.append('g').attr('class', 'node-content')

    // border
    content
      .append('circle')
      .attr('class', 'border')
      .attr('r', 50 + border)
      .attr('pointer-events', 'none')
      .attr('fill', ({ color }) => color)
      .style('opacity', 0.5)

    // circle
    content
      .append('circle')
      .attr('r', () => 50 - border)
      .attr('fill', ({ color }) => color)

    // clipped thumbnail
    const thumbnailGroup = content.append('g')

    // clip path
    thumbnailGroup
      .append('clipPath')
      .attr('id', (d) => 'clip-' + d.id)
      .attr('pointer-events', 'none')
      .append('circle')
      .attr('r', () => 50 - border)

    // add thumbnail image
    thumbnailGroup
      .append('image')
      .attr('visibility', ({ dataset }) => (dataset.image ? null : 'hidden'))
      .attr('xlink:href', ({ dataset }) =>
        dataset.image
          ? require(`~/assets/images/${dataset.image}?size=300`).src
          : ''
      )
      .attr('clip-path', ({ id }) => 'url(#clip-' + id + ')')
      .attr('width', 100 - border * 2)
      .attr('height', 100 - border * 2)
      .attr('x', -50 + border)
      .attr('y', -50 + border)
      .attr('preserveAspectRatio', 'xMinYMin slice')
      .style('opacity', '0.2')
      .attr('pointer-events', 'none')

    // add the text
    content
      .append('text')
      .attr('text-anchor', 'middle')
      .attr(
        'style',
        'pointer-events:none;fill:white;font-size:12px;font-weight:bold;text-shadow: 1px 1px 1px rgba(0,0,0,0.2)'
      )
      .call(this.wrapText.bind(this))
  }

  // Wrap long text in multiple lines
  wrapText(selection) {
    const { textMaxWidthFactor } = this.options

    // loop every element
    selection.each((d, index, elements) => {
      const fontSize = 12
      const lineHeight = fontSize * 1.2

      // get text element
      const elem = d3.select(elements[index])

      // split name by spaces
      const words = d.dataset.title.split(/\s+/)

      // initial span
      const firstSpan = elem.append('tspan').attr('x', 0)
      let span = firstSpan

      // line holder
      let line = []

      // word count
      const len = words.length
      // loop all words
      words.forEach((word, index) => {
        // add to line
        line.push(word)

        // set line to elem
        span.text(line.join(' '))

        // measure width
        if (span.node().getComputedTextLength() > 100 * textMaxWidthFactor) {
          let newLine = []

          // cut last words if there are multiple words in the line
          if (line.length > 1) {
            newLine = line.pop()
            span.text(line.join(' '))
            line = [newLine]
          } else {
            line = []
          }
          // create new span
          if (index < len) {
            span = elem.append('tspan').attr('dy', lineHeight).attr('x', 0)
            span.text(line.join(' '))
          }
        }
      })

      // get and store bounding box
      d.bbox = elem.node().getBBox()

      firstSpan.attr('y', -d.bbox.y - d.bbox.height / 2)
    })
  }
}

export default Chart
