import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const WIDTH = 1000
const HEIGHT = 500;
const MARGIN = 20;
const PADDING = 50;
const TITLE = 'United States GDP'

// Fetch Dataset
const DATA_URL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'

const DATASET = await fetch(DATA_URL)
    .then(r => {
        console.log('Dataset fetch succeeded')
        return r.json()
    })
    .catch(e => console.error(`Dataset fetch failed: ${e}`))

// Start of D3
const MAIN_CONTAINER = d3.select('#main-container');
const MIN_X_AXIS = d3.min(DATASET.data, d => new Date(d[0]))
const MAX_X_AXIS = d3.max(DATASET.data, d => new Date(d[0]))
const MIN_Y_AXIS = 0
const MAX_Y_AXIS = d3.max(DATASET.data, d => d[1])

const X_SCALE = d3
    .scaleTime()
    .domain([MIN_X_AXIS, MAX_X_AXIS])
    .range([PADDING, WIDTH - PADDING]);

const Y_SCALE = d3
    .scaleLinear()
    .domain([MIN_Y_AXIS, MAX_Y_AXIS])
    .range([HEIGHT - PADDING, PADDING]);

const SVG = MAIN_CONTAINER
    .append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT)
    .attr('id', 'svg');

const X_AXIS = d3.axisBottom(X_SCALE);
SVG.append('g')
    .attr('transform', `translate(0, ${HEIGHT - PADDING})`)
    .attr('id', 'x-axis')
    .call(X_AXIS);

const Y_AXIS = d3.axisLeft(Y_SCALE);
SVG.append('g')
    .attr('transform', `translate(${PADDING}, 0)`)
    .attr('id', 'y-axis')
    .call(Y_AXIS);

// SVG Tooltip
const TOOLTIP = MAIN_CONTAINER
    .append('div')
    .attr('id', 'tooltip')
    .style('opacity', 0)
    .style('position', 'absolute')
    .style('background-color', 'rgba(0, 0, 0, 0.8)')
    .style('color', '#fff')
    .style('padding', '10px')
    .style('pointer-events', 'none');

// SVG Title
SVG.append('text')
    .attr('x', WIDTH / 2)
    .attr('y', PADDING)
    .attr('text-anchor', 'middle')
    .attr('id', 'title')
    .style('font-size', '40px')
    .style('font-weight', 'bold')
    .text(TITLE);

// SVG Bars
SVG.selectAll('rect')
    .data(DATASET.data)
    .enter()
    .append('rect')
    .attr('x', d => X_SCALE(new Date(d[0])))
    .attr('y', d => Y_SCALE(d[1]))
    .attr('width', 5)
    .attr('height', d => HEIGHT - PADDING - Y_SCALE(d[1]))
    .attr('fill', 'steelblue')
    .attr('class', 'bar')
    .attr('data-date', d => d[0])
    .attr('data-gdp', d => d[1])
    .on('mouseover', function (event, d) {
        d3.select(this).attr('fill', 'red');
        TOOLTIP
            .style('opacity', 0.9)            
            .html(`
                ${new Date(d[0]).getFullYear()} Q${Math.floor(new Date(d[0]).getMonth() / 3) + 1}
                <br>$${d[1]} Billion
            `)
            .attr('data-date', d[0])       
    })
    .on('mousemove', function (event) {
        TOOLTIP
            .style('left', `${event.pageX + 10}px`)
            .style('top', `700px`);
    })
    .on('mouseout', function ()  {
        d3.select(this).attr('fill', 'steelblue');
        TOOLTIP.style('opacity', 0);
    });