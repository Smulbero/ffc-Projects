import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Fetch Dataset
const DATA_URL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'

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
(async () => {
    const DATASET = await fetchData(DATA_URL)
    console.log(`Data: `, DATASET) // Debug
    const BASE_TEMPERATURE = DATASET.baseTemperature;
    const MONTHLY_VARIANCE = DATASET.monthlyVariance;   // [{ year:, month:, variance: }] 
    const MARGIN = { top: 50, right: 40, bottom: 50, left: 40 }
    const SVG_WIDTH = window.innerWidth * 0.9;
    const SVG_HEIGHT = window.innerHeight * 0.8;
    const SVG_TITLE = 'Monthly Global Land-Surface Temperature';
    const SVG_SUB_TITLE = '1753 - 2015: base temperature 8.66℃';
    const LEGEND_GROUP = [2.8, 3.9, 5.0, 7.2, 8.3, 9.5, 10.6, 11.7, 12.8]
    const COLORS = [
        '#5e519f',
        '#3788ba',
        '#6ac1a5',
        '#acdca6',
        '#e6f49d',
        '#fffec2',
        '#fddf90',
        '#f26d4a',
        '#d34052',
        '#9a0942',
        '#ff0000'
    ]


    // Create SVG, Tooltip and Legend
    const MAIN_CONTAINER = d3.select('#main-container');
    const SVG = MAIN_CONTAINER.append('svg')
        .attr('width', SVG_WIDTH)
        .attr('height', SVG_HEIGHT)
        .attr('id', 'svg');
    const TOOLTIP = MAIN_CONTAINER.append('div')
        .attr('id', 'tooltip')
        .style('opacity', 0)
        .style('position', 'absolute')
        .style('background-color', 'rgba(0, 0, 0, 0.8)')
        .style('color', '#fff')
        .style('padding', '10px')
        .style('pointer-events', 'none');
    const LEGEND = SVG.append('g')
        .attr("transform", `translate(${0}, ${SVG_HEIGHT - MARGIN.bottom / 2})`)
        .attr('id', 'legend')
    const TITLE_CONTAINER = SVG.append('g')
        .attr("transform", `translate(${SVG_WIDTH / 2}, ${MARGIN.top})`)
        .attr('id', 'title-container')

    // Color scale
    const COLOR_MIN = d3.min(MONTHLY_VARIANCE, d => d.variance)
    const COLOR_MAX = d3.max(MONTHLY_VARIANCE, d => d.variance)
    const colorScale = d3.scaleQuantile()
        .domain([COLOR_MIN + BASE_TEMPERATURE, COLOR_MAX + BASE_TEMPERATURE])
        .range(COLORS);

    // X and Y axis domains
    const X_GROUP = [...new Set(MONTHLY_VARIANCE.map(d => d.year))]
    const Y_GROUP = [...new Set(MONTHLY_VARIANCE.map(d => d.month - 1))]

    // Scales
    const X_SCALE = d3.scaleBand()
        .domain(X_GROUP)
        .range([MARGIN.left + MARGIN.right,
        SVG_WIDTH - MARGIN.left - MARGIN.right]);
    const Y_SCALE = d3.scaleBand()
        .domain(Y_GROUP)
        .range([SVG_HEIGHT - MARGIN.top - MARGIN.bottom,
        MARGIN.top + MARGIN.bottom]);

    // Axes
    const X_AXIS = d3.axisBottom(X_SCALE)
        .tickValues(X_SCALE.domain().filter((d, i) => !(i % 15)))
        .tickFormat(Number)
    SVG.append('g')
        .attr('transform', `translate(${0}, ${SVG_HEIGHT - (MARGIN.top + MARGIN.bottom)})`)
        .attr('id', 'x-axis')
        .call(X_AXIS);
    const Y_AXIS = d3.axisLeft(Y_SCALE)
        .tickFormat(d => d3.timeFormat("%B")(new Date(0, d)));  // Format as full month name
    SVG.append('g')
        .attr('transform', `translate(${MARGIN.left + MARGIN.right}, ${0})`)
        .attr('id', 'y-axis')
        .call(Y_AXIS);

    // SVG Title
    TITLE_CONTAINER.append('text')
        .attr('x', 0)
        .attr('y', 0)
        .attr('text-anchor', 'middle')
        .attr('id', 'title')
        .style('font-size', '30px')
        .style('font-weight', 'bold')
        .text(SVG_TITLE);

    // SVG Sub title
    TITLE_CONTAINER.append('text')
        .attr('x', 0)
        .attr('y', MARGIN.top / 2)
        .attr('text-anchor', 'middle')
        .attr('id', 'description')
        .style('font-size', '15px')
        .style('font-weight', 'bold')
        .text(SVG_SUB_TITLE);

    // SVG rects
    SVG.selectAll('rect')
        .data(MONTHLY_VARIANCE).enter()
        .append('rect')
        .attr('x', d => X_SCALE(d.year))
        .attr('y', d => Y_SCALE(d.month - 1))
        .attr('width', X_SCALE.bandwidth())
        .attr('height', Y_SCALE.bandwidth())
        .attr('data-month', d => d.month - 1)
        .attr('data-year', d => d.year)
        .attr('data-temp', d => BASE_TEMPERATURE - d.variance)
        .attr('fill', (d, i) => colorScale(d.variance + BASE_TEMPERATURE))
        .attr('class', 'cell')
        .on('mouseover', function(_, d) {
            d3.select(this).style('stroke', 'black').style('stroke-width', 1);
            TOOLTIP
                .style('opacity', 0.9)
                .html(`
                    ${d.year} - ${d3.timeFormat("%B")(new Date(0, d.month - 1))}<br>
                    ${(BASE_TEMPERATURE - d.variance).toFixed(1)}&deg;C<br>
                    ${d.variance.toFixed(1)}&deg;C
                `)
                .attr('data-year', d.year)
        })
        .on('mousemove', function(event) {
            TOOLTIP
                .style('left', `${event.pageX + 10}px`)     // Offset from mouse
                .style('top', `${event.pageY + 10}px `);     // Offset from mouse
        })
        .on('mouseout', function() {
            d3.select(this).style('stroke', 'none');
            TOOLTIP.style('opacity', 0);
        })

    // // Legend
    const LEGEND_X_SCALE = d3.scaleBand()
        .domain(LEGEND_GROUP)
        .range([SVG_WIDTH / 2,
        SVG_WIDTH - MARGIN.left - MARGIN.right]);

    const LEGEND_X_AXIS = d3.axisBottom(LEGEND_X_SCALE);
    LEGEND.append('g')
        .attr('transform', `translate(${0}, ${0})`)
        .call(LEGEND_X_AXIS);

    LEGEND.selectAll('rect')
        .data(LEGEND_GROUP)
        .enter()
        .append('rect')
        .attr('x', d => LEGEND_X_SCALE(d))
        .attr('y', 0 - LEGEND_X_SCALE.bandwidth())
        .attr('width', LEGEND_X_SCALE.bandwidth())
        .attr('height', LEGEND_X_SCALE.bandwidth())
        .attr('fill', (d, i) => COLORS[i])

})()