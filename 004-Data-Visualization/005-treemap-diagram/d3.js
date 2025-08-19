import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';

// Data urls
const DATA_URLS = {
    videogames: 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json',
    movies: 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json',
    kickstarter: 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json'
}

const DATASETS = [
    {
        title: "Video Game Sales",
        subtitle: 'Top 100 Most Sold Video Games Grouped by Platform',
        data: 'videogames',
        default: true
    },
    {
        title: "Movie Sales",
        subtitle: 'Top 100 Highest Grossing Movies Grouped By Genre',
        data: 'movies'
    },
    {
        title: "Kickstarter Pledges",
        subtitle: 'Top 100 Most Pledged Kickstarter Campaigns Grouped By Category',
        data: 'kickstarter'
    }
]

const SVG_TITLE = 'Title placeholder'; // Changes based on selected data
const SVG_SUB_TITLE = "Subtitle placeholder" // Changes based on selected data
const MARGIN = { top: 40, right: 40, bottom: 40, left: 40 }
const SVG_WIDTH = window.innerWidth;
const SVG_HEIGHT = window.innerHeight;

// Create elements
const MAIN_CONTAINER = d3.select('#main-container');

const SVG = MAIN_CONTAINER.append('svg')
    .attr('width', SVG_WIDTH)
    .attr('height', SVG_HEIGHT)
    .attr('id', 'svg')

const TREEMAP_SVG = SVG.append('g')
    .attr('viewBox', [0, 0, SVG_WIDTH, SVG_HEIGHT])
    .attr('width', SVG_WIDTH)
    .attr('height', SVG_HEIGHT)
    .attr("style", "font: 8px sans-serif;");

const TOOLTIP = MAIN_CONTAINER.append('div')
    .attr('id', 'tooltip')
    .style('opacity', 0)
    .style('position', 'absolute')
    .style('background-color', 'rgba(0, 0, 0, 0.8)')
    .style('color', '#fff')
    .style('padding', '10px')
    .style('pointer-events', 'none');

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

// Links
const LINKS_CONTAINER = SVG.append('g')
    .attr('id', 'links-container')
    .attr('transform', `translate(${SVG_WIDTH / 2}, ${MARGIN.top * 2})`)

const SPACING = 150;
const TOTAL_WIDTH = SPACING * (DATASETS.length - 1)

const LINKS = LINKS_CONTAINER.selectAll('text')
    .data(DATASETS)
    .enter()
    .append('text')
    .attr('x', (d, i) => i * SPACING - TOTAL_WIDTH / 2)
    .attr('y', 0)
    .attr('text-anchor', 'middle')
    .style('font-size', '15px')
    .style('cursor', 'pointer')
    .style('fill', 'blue')
    .text(d => d.title)
    .on('click', async function (event, d) {
        loadDataset(d)
    })

function loadDataset(dataset) {
    const { title, subtitle, data } = dataset
    const url = DATA_URLS[data];
    d3.selectAll('#treemap').remove()
    d3.selectAll('#legend').remove()

    Promise.all([
        d3.json(url)
    ]).then(([data]) => {
        TITLE_CONTAINER.select('#title').text(title)
        TITLE_CONTAINER.select('#description').text(subtitle)
        drawTreeMap(data)
    })
}

// Load video game sales by default
const DEFAULT_DATASET = DATASETS.find(d => d.default)
loadDataset(DEFAULT_DATASET)

function drawTreeMap(data) {

    // Layout
    const COLOR_SCALE = d3.scaleOrdinal(data.children.map(d => d.name), d3.schemeTableau10);

    const TREEMAP_SCALE = 0.7
    const TREEMAP_WIDTH = SVG_WIDTH * TREEMAP_SCALE
    const TREEMAP_HEIGHT = SVG_HEIGHT * TREEMAP_SCALE

    const OFFSET_X = (SVG_WIDTH - TREEMAP_WIDTH) / 2
    const OFFSET_Y = (SVG_HEIGHT - TREEMAP_HEIGHT) / 2

    const TREEMAP_GROUP = TREEMAP_SVG.append('g')
        .attr('id', 'treemap')
        .attr('transform', `translate(${OFFSET_X}, ${OFFSET_Y})`);

    // Treemap root
    const ROOT = d3.treemap()
        .tile(d3.treemapSquarify)
        .size([TREEMAP_WIDTH, TREEMAP_HEIGHT])
        .padding(2)
        .round(true)
        (d3.hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value));

    // Cell for each leaf
    const LEAF = TREEMAP_GROUP.selectAll('g')
        .data(ROOT.leaves())
        .join('g')
        .attr('transform', d => `translate(${d.x0}, ${d.y0})`)
        .attr('id', 'leaf')
        .each(d => {
            d.leafUid = getUid('leaf');
            d.clipUid = getUid('clip')
        })

    // Helper for unique id
    function getUid(name) {
        let id = name + "-" + Math.random().toString(16).slice(2);
        return {
            id: id,
            href: new URL(`#${id}`, window.location).href
        };
    }

    // Append leaf with colored rects
    LEAF.append('rect')
        .attr("id", (_, i) => `leaf-${i}`)
        .attr('class', 'tile')
        .attr("fill", d => {
            while (d.depth > 1)
                d = d.parent;
            return COLOR_SCALE(d.data.name);
        })
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr('data-name', d => d.data.name)
        .attr('data-category', d => d.data.category)
        .attr('data-value', d => d.data.value)
        .on('mouseover', function (_, d) {
            TOOLTIP
                .style('opacity', 0.9)
                .html(`Name: ${d.data.name}<br>
                    Category: ${d.data.category}<br>
                    Value: ${d.data.value}`)
                .attr('data-value', d.data.value) // needed for ffc test

        })
        .on('mousemove', function (event) {
            TOOLTIP
                .style('left', `${event.pageX + 10}px`)     // Offset from mouse
                .style('top', `${event.pageY + 10}px`);     // Offset from mouse
        })
        .on('mouseout', () => TOOLTIP.style('opacity', 0));

    LEAF.append("clipPath")
        .attr("id", (d, i) => `clip-${i}`)
        .append("use")
        .attr("xlink:href", d => d.leafUid.href);

    // Leaf text content
    LEAF.append("text")
        .attr("clip-path", d => d.clipUid)
        .selectAll("tspan")
        .data(d => d.data.name.split(/(?=[A-Z][a-z])|\s+/g))
        .join("tspan")
        .attr("x", 3)
        .attr("y", (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
        .attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
        .text(d => d);

    // Legend
    const LEGEND = SVG.append('g')
        .attr('id', 'legend')
        .attr('transform', `translate(${SVG_WIDTH / 2 - MARGIN.left}, ${SVG_HEIGHT - (MARGIN.bottom * 2.5)})`)

    const LEGEND_NODE_SIZE = 10;
    const LEGEND_GAP = 5;
    const COLUMNS = 3
    const NODES = [...new Set(ROOT.leaves().map(d => d.data.category))]

    const LEGEND_ITEMS = LEGEND.selectAll('g')
        .data(NODES)
        .enter()
        .append('g')
        .attr('transform', (d, i) => {
            const col = i % COLUMNS
            const row = Math.floor(i / COLUMNS)
            // console.log('col ', col)
            // console.log('row ', row)
            return `translate(${col * 100 - 50}, ${row * (LEGEND_NODE_SIZE + LEGEND_GAP)})`
        })

    LEGEND_ITEMS.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', LEGEND_NODE_SIZE)
        .attr('height', LEGEND_NODE_SIZE)
        .attr('fill', d => COLOR_SCALE(d))
        .attr('class', 'legend-item')

    LEGEND_ITEMS.append('text')
        .attr('x', LEGEND_NODE_SIZE + LEGEND_GAP)
        .attr('y', LEGEND_NODE_SIZE)
        .text(d => d)

}