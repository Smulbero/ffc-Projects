import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';
import * as topojson from 'https://cdn.jsdelivr.net/npm/topojson-client@3/+esm';

// Data urls
const US_EDUCATION_DATA_URL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';
const US_COUNTY_DATA_URL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';

const SVG_TITLE = 'United States Educational Attainment';
const SVG_SUB_TITLE = "Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)"
const MARGIN = { top: 40, right: 40, bottom: 40, left: 40 }
const SVG_WIDTH = window.innerWidth;
const SVG_HEIGHT = window.innerHeight;

// Create elements
const MAIN_CONTAINER = d3.select('#main-container');
const TOOLTIP = MAIN_CONTAINER.append('div')
    .attr('id', 'tooltip')
    .style('opacity', 0)
    .style('position', 'absolute')
    .style('background-color', 'rgba(0, 0, 0, 0.8)')
    .style('color', '#fff')
    .style('padding', '10px')
    .style('pointer-events', 'none');
const SVG = MAIN_CONTAINER.append('svg')
    .attr('width', SVG_WIDTH)
    .attr('height', SVG_HEIGHT)
    .attr('id', 'svg');
const LEGEND = SVG.append('g')
    .attr('id', 'legend')
    .attr('transform', `translate(${0}, ${MARGIN.top * 3})`)


// Color scale data
const CUSTOM_COLORS = [
    "#f7fbff",
    "#deebf7",
    "#c6dbef",
    "#9ecae1",
    "#6baed6",
    "#4292c6",
    "#2171b5",
    "#08519c",
    "#08306b",
    "#051e42ff",
    "#01122cff",
];

const TICKS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]

// SVG Titles
const TITLE_CONTAINER = SVG.append('g')
    .attr('id', 'title-container')
    .attr('transform', `translate(${SVG_WIDTH / 2}, ${MARGIN.top})`)
// Title
TITLE_CONTAINER.append('text')
    .attr('x', 0)
    .attr('y', 0)
    .attr('id', 'title')
    .attr('text-anchor', 'middle')
    .style('font-size', '30px')
    .style('font-weight', 'bold')
    .text(SVG_TITLE);
// Sub title
TITLE_CONTAINER.append('text')
    .attr('x', 0)
    .attr('y', MARGIN.top / 2)
    .attr('id', 'description')
    .attr('text-anchor', 'middle')
    .style('font-size', '15px')
    .style('font-weight', 'bold')
    .text(SVG_SUB_TITLE);

// Legend
const LEGEND_X_SCALE = d3.scaleBand()
    .domain(TICKS)
    .range([MARGIN.left * 13, SVG_WIDTH - (MARGIN.right * 3)])

const LEGEND_X_AXIS = d3.axisBottom(LEGEND_X_SCALE);

LEGEND.append('g')
    .attr('transform', `translate(${0}, ${0})`)
    .call(LEGEND_X_AXIS)

LEGEND.selectAll('rect')
    .data(TICKS)
    .enter()
    .append('rect')
    .attr('x', d => LEGEND_X_SCALE(d))
    .attr('y', 0 - LEGEND_X_SCALE.bandwidth() / 2)
    .attr('width', LEGEND_X_SCALE.bandwidth())
    .attr('height', LEGEND_X_SCALE.bandwidth() / 2)
    .attr('fill', (d, i) => CUSTOM_COLORS[i])


// Fetch data
Promise.all([
    d3.json(US_COUNTY_DATA_URL),
    d3.json(US_EDUCATION_DATA_URL)
]).then(([countyJson, educationJson]) => {
    drawMap(countyJson, educationJson)
})

const PATH = d3.geoPath();

// Color MAP_SCALE
const COLOR_SCALE = d3.scaleThreshold()
    .domain(TICKS)
    .range(CUSTOM_COLORS);

function drawMap(countyData, educationData) {
    const COUNTIES = topojson.feature(countyData, countyData.objects.counties);
    const COLOR_MAP = new Map(educationData.map(d => [d.fips, d.bachelorsOrHigher]));
    const TOOLTIP_MAP = new Map(educationData.map(d => [d.fips, [d.state, d.area_name, d.bachelorsOrHigher]]));

    // Map scale to fit on svg
    const BOUNDS = PATH.bounds(COUNTIES)
    const MIN_X = BOUNDS[0][0]
    const MIN_Y = BOUNDS[0][1]
    const MAX_X = BOUNDS[1][0]
    const MAX_Y = BOUNDS[1][1]

    const MAP_SCALE = 0.8
    console.log(MAP_SCALE)
    const TRANSLATE = [
        (SVG_WIDTH - MAP_SCALE * (MAX_X + MIN_X)) / 2,
        (SVG_HEIGHT - MAP_SCALE * (MAX_Y + MIN_Y)) / 2 + MARGIN.top
    ];

    SVG.append('g')
        .attr("transform", `translate(${TRANSLATE}) scale(${MAP_SCALE})`)
        .selectAll('path')
        .data(COUNTIES.features)
        .enter()
        .append('path')
        .attr('d', PATH)
        .attr('class', 'county')
        .attr('data-fips', d => d.id) // needed for ffc test
        .attr('data-education', d => COLOR_MAP.get(d.id)) // needed for ffc test
        .attr('stroke', '#474747ff')
        .style('stroke-width', 0.5 / MAP_SCALE)
        .attr('fill', d => {
            const RATE = COLOR_MAP.get(d.id);
            return RATE ? COLOR_SCALE(RATE) : 'yellow'
        })
        .on('mouseover', function (_, d) {
            TOOLTIP
                .style('opacity', 0.9)
                .html(`${TOOLTIP_MAP.get(d.id)}`)
                .attr('data-education', COLOR_MAP.get(d.id)) // needed for ffc test

        })
        .on('mousemove', function (event) {
            TOOLTIP
                .style('left', `${event.pageX + 10}px`)     // Offset from mouse
                .style('top', `${event.pageY + 10}px`);     // Offset from mouse
        })
        .on('mouseout', () => TOOLTIP.style('opacity', 0))
}