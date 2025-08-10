import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';
import * as topojson from 'https://cdn.jsdelivr.net/npm/topojson-client@3/+esm';

const fetchData = async (URL) => {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        console.log(`Dataset fetch succeeded`);
        return data;
    } catch (e) {
        console.error(`Dataset fetch failed: ${e}`);
        return null;
    }
};

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
const customColors = [
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

const ticks = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]

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
const legend_x_scale = d3.scaleBand()
    .domain(ticks)
    .range([MARGIN.left * 13, SVG_WIDTH - (MARGIN.right * 3)])

const legend_x_axis = d3.axisBottom(legend_x_scale);

LEGEND.append('g')
    .attr('transform', `translate(${0}, ${0})`)
    .call(legend_x_axis)

LEGEND.selectAll('rect')
    .data(ticks)
    .enter()
    .append('rect')
    .attr('x', d => legend_x_scale(d))
    .attr('y', 0 - legend_x_scale.bandwidth() / 2)
    .attr('width', legend_x_scale.bandwidth())
    .attr('height', legend_x_scale.bandwidth() / 2)
    .attr('fill', (d, i) => customColors[i])


// Fetch data
Promise.all([
    d3.json(US_COUNTY_DATA_URL),
    d3.json(US_EDUCATION_DATA_URL)
]).then(([countyJson, educationJson]) => {
    drawMap(countyJson, educationJson)
})

const path = d3.geoPath();

// Color map_scale
const colorScale = d3.scaleThreshold()
    .domain(ticks)
    .range(customColors);

function drawMap(countyData, educationData) {
    const counties = topojson.feature(countyData, countyData.objects.counties);
    const color_map = new Map(educationData.map(d => [d.fips, d.bachelorsOrHigher]));
    const tooltip_map = new Map(educationData.map(d => [d.fips, [d.state, d.area_name, d.bachelorsOrHigher]]));

    const bounds = path.bounds(counties)
    const min_x = bounds[0][0]
    const min_y = bounds[0][1]
    const max_x = bounds[1][0]
    const max_y = bounds[1][1]

    const map_scale = 0.8
    console.log(map_scale)
    const translate = [
        (SVG_WIDTH - map_scale * (max_x + min_x)) / 2,
        (SVG_HEIGHT - map_scale * (max_y + min_y)) / 2 + MARGIN.top
    ];

    SVG.append('g')
        .attr("transform", `translate(${translate}) scale(${map_scale})`)
        .selectAll('path')
        .data(counties.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', 'county')
        .attr('data-fips', d => d.id) // needed for ffc test
        .attr('data-education', d => color_map.get(d.id)) // needed for ffc test
        .attr('stroke', '#474747ff')
        .style('stroke-width', 0.5 / map_scale)
        .attr('fill', d => {
            const rate = color_map.get(d.id);
            return rate ? colorScale(rate) : 'yellow'
        })
        .on('mouseover', function (_, d) {
            TOOLTIP
                .style('opacity', 0.9)
                .html(`${tooltip_map.get(d.id)}`)
                .attr('data-education', color_map.get(d.id)) // needed for ffc test

        })
        .on('mousemove', function (event) {
            TOOLTIP
                .style('left', `${event.pageX + 10}px`)     // Offset from mouse
                .style('top', `${event.pageY + 10}px`);     // Offset from mouse
        })
        .on('mouseout', () => TOOLTIP.style('opacity', 0))
}