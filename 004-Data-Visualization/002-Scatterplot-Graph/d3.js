import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const WIDTH = window.innerWidth * 0.8;
const HEIGHT = window.innerHeight * 0.8;
const PADDING = 50;
const CIRCLE_RADIUS = 5;
const TITLE = 'Doping in Professional Bicycle Racing'
const SUB_TITLE = "35 Fastest times up Alpe d'Huez"
const COLOR_INFO_DATA = [
  { title: 'No doping allecations', color: 'steelblue' },
  { title: 'Riders with doping allecations', color: 'orange' }
]
const X_AXIS_OFFSET = 1;
const Y_AXIS_OFFSET = null;
const INFO_NODE_SIZE = 15;

// Fetch Dataset
const DATA_URL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'

const fetchData = async (URL) => {
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    console.log(`Dataset fetch succeeded`);
    console.log(data); // Debug
    return data;
  } catch (e) {
    console.error(`Dataset fetch failed: ${e}`);
    return null;
  }
};

const DATASET = await fetchData(DATA_URL)

const formatHelper = (num) => {
    console.log(`Value of num in formatter:`, num);
    const min = Math.floor(num / 60);
    const s = String(num % 60).padStart(2, '0');
    return `${min}:${s}`
}

// Start of D3
const MAIN_CONTAINER = d3.select('#main-container');
const MIN_X_AXIS = d3.min(DATASET, d => Number(d.Year))
const MAX_X_AXIS = d3.max(DATASET, d => Number(d.Year))
const MIN_Y_AXIS = d3.min(DATASET, d => d.Time)
const MAX_Y_AXIS = d3.max(DATASET, d => d.Time)
// console.log(`Y-axis debug info: ${DATASET[0].Seconds / 60}`)

const X_SCALE = d3
    .scaleTime()
    .domain([MIN_X_AXIS, MAX_X_AXIS])
    .range([PADDING, WIDTH - PADDING]);

const Y_SCALE = d3
    .scaleTime()
    .domain([MIN_Y_AXIS, MAX_Y_AXIS])
    .range([HEIGHT - PADDING, PADDING * 2.5]);

const SVG = MAIN_CONTAINER
    .append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT)
    .attr('id', 'svg');

const X_AXIS = d3.axisBottom(X_SCALE)
  .tickFormat(Number)
SVG.append('g')
    .attr('transform', `translate(0, ${HEIGHT - PADDING})`)
    .attr('id', 'x-axis')
    .call(X_AXIS);

const Y_AXIS = d3.axisLeft(Y_SCALE)
    .tickFormat(d3.timeFormat("%M:%S"));
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

// SVG Sub title
SVG.append('text')
    .attr('x', WIDTH / 2)
    .attr('y', PADDING * 1.5)
    .attr('text-anchor', 'middle')
    .attr('id', 'sub-title')
    .style('font-size', '20px')
    .style('font-weight', 'bold')
    .text(SUB_TITLE);

// SVG spheres
SVG.selectAll('circle')
    .data(DATASET)
    .enter()
    .append('circle')
    .attr('cx', d => X_SCALE(Number(d.Year)))
    .attr('cy', d => Y_SCALE(d.Time))
    .attr('r', CIRCLE_RADIUS)
    .attr('data-xvalue', d => Number(d.Year))
    .attr('data-yvalue', d => d.Time )
    .attr('class', 'dot')
    .attr('fill', (d, i) => d.Doping === "" ? COLOR_INFO_DATA[0].color : COLOR_INFO_DATA[1].color)
    .on('mouseover', (_, d) => {
        TOOLTIP
            .style('opacity', 0.9) 
            .html(`
                    ${d.Name}<br>
                    Nationality: ${d.Nationality}<br>
                    Year: ${d.Year}<br>
                    Time: ${d.Time}<br>
                    Doping allecation: ${d.Doping}<br>
                    URL: ${d.URL} 
                `)
            .attr('data-year', d.Year)  // needed for ffC tests
    })
    .on('mousemove', (event) => {
        TOOLTIP
            .style('left', `${event.pageX + 10}px`)     // Offset from mouse
            .style('top', `${event.pageY + 10}px`);     // Offset from mouse
    })
    .on('mouseout', () => {
        TOOLTIP.style('opacity', 0);
    })

// Dot color info
const COLOR_INFO = SVG.append('g')
    .attr("transform", `translate(${WIDTH - PADDING}, ${HEIGHT / 2})`)
    .attr('id', 'legend')

COLOR_INFO.selectAll('rect')
    .data(COLOR_INFO_DATA)
    .enter()
    .append('rect')
    .attr('x', 0)
    .attr('y', (_, i) =>  i * (INFO_NODE_SIZE + 2))
    .attr('width', INFO_NODE_SIZE)
    .attr('height', INFO_NODE_SIZE)
    .attr('fill', d => d.color)

COLOR_INFO.selectAll('text')
    .data(COLOR_INFO_DATA)
    .enter()
    .append('text')
    .attr('x', -5)
    .attr('y', (_, i) => i * (INFO_NODE_SIZE + 5) + INFO_NODE_SIZE / 1.5)
    .text(d => d.title)
    .style('text-anchor', 'end')