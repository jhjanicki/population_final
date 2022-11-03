const scaleFactor = 1.4;

let width = 1920 / scaleFactor;
let height = 1080 / scaleFactor;

const margin = {
    "top": (0 + 84) / scaleFactor,
    "left": (70 + 84) / scaleFactor,
    "bottom": (85 + 84) / scaleFactor,
    "right": (0 + 84) / scaleFactor
}

//svg
const svg = d3.select("#chart1").append("svg").attr("width", width).attr("height", height);
const bg = svg.append('rect')
    .attr("width", width)
    .attr("height", height)
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill", "none")
    .attr("opacity", 0.3)


//PREP DATA
countries.forEach(function(d) {
    d.population = +d.population || 0;
    d.year = +d.year || 0;
    return d;
})

//World
const worldData = countries.filter(d => d.area == "WORLD" && d.year <= 2022);

//get high and low projections here
const high = world.filter(d => d.variant == "High")
const low = world.filter(d => d.variant == "Low")

//regions
const regionsProjected = d3.group(
    regions,
    d => d.area
)

const regionsE = regions.filter(d => d.year <= 2022);
const regionsP = regions.filter(d => d.year > 2021);

const regionsProjectedE = d3.group(
    regionsE,
    d => d.area
)

const regionsProjectedP = d3.group(
    regionsP,
    d => d.area
)

//countries
const countriesEstimates = countries.filter(d => d.area !== "WORLD" && d.year <= 2022);
const countriesProjections = countries.filter(d => d.year > 2021); //medium projection

const countriesGroupedE = d3.group(
    countriesEstimates,
    d => d.area
)

const countriesGroupedP = d3.group(
    countriesProjections,
    d => d.area
)

// Africa

const africaE = countries.filter(d => d.region === "Africa" && d.year <= 2022);
const africaP = countries.filter(d => d.region === "Africa" && d.year > 2021);

const africaGroupedE = d3.group(
    africaE,
    d => d.area
)

const africaGroupedP = d3.group(
    africaP,
    d => d.area
)


// Europe

const europeE = countries.filter(d => d.region === "Europe" && d.year <= 2022);
const europeP = countries.filter(d => d.region === "Europe" && d.year > 2021);

const europeGroupedE = d3.group(
    europeE,
    d => d.area
)

const europeGroupedP = d3.group(
    europeP,
    d => d.area
)

// N.America

const nAmericaE = countries.filter(d => d.region === "Northern America" && d.year <= 2022);
const nAmericaP = countries.filter(d => d.region === "Northern America" && d.year > 2021);

const nAmericaGroupedE = d3.group(
    nAmericaE,
    d => d.area
)

const nAmericaGroupedP = d3.group(
    nAmericaP,
    d => d.area
)

// Latin American and the Caribbean

const lAmericaE = countries.filter(d => d.region === "Latin American and the Caribbean" && d.year <= 2022);
const lAmericaP = countries.filter(d => d.region === "Latin American and the Caribbean" && d.year > 2021);

const lAmericaGroupedE = d3.group(
    lAmericaE,
    d => d.area
)

const lAmericaGroupedP = d3.group(
    lAmericaP,
    d => d.area
)

// Asia

const asiaE = countries.filter(d => d.region === "Asia" && d.year <= 2022);
const asiaP = countries.filter(d => d.region === "Asia" && d.year > 2021);

const asiaGroupedE = d3.group(
    asiaE,
    d => d.area
)

const asiaGroupedP = d3.group(
    asiaP,
    d => d.area
)


let countriesList = countries.map(obj => obj.area);
countriesList = countriesList.filter((v, i) => countriesList.indexOf(v) == i);


const xScale = d3.scaleTime()
    .domain([1950, 2021])
    .rangeRound([0, width - margin.left - margin.right])

const yScale = d3.scaleLinear()
    .domain([0, 8000000])
    .range([height - margin.bottom, 0]);


let xAxis = d3.axisBottom(xScale).tickFormat(d => +d);
let yAxis = d3.axisLeft(yScale).ticks(5);

const regionEColorScale = d3.scaleOrdinal().domain("ASIA", "AFRICA", "LATIN AMERICA AND THE CARIBBEAN", "EUROPE", "NORTH AMERICA", "OCEANIA").range(["#66c2a4", "#8c96c6", "#fc8d59", "#7bccc4", "#c994c7", "#fe9929"]);
const regionPColorScale = d3.scaleOrdinal().domain("ASIA", "AFRICA", "LATIN AMERICA AND THE CARIBBEAN", "EUROPE", "NORTH AMERICA", "OCEANIA").range(["#006d2c", "#810f7c", "#b30000", "#0868ac", "#dd1c77", "#d95f0e"]);


const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

g.append("g")
    .attr("class", "y-axis")
    .call(yAxis);

g.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(xAxis);


const mask = g.append("defs")
    .append("clipPath")
    .attr("id", "mask")
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width - margin.right - margin.left)
    .attr("height", height - margin.bottom)


const masked = g.append("g")
    .attr("clip-path", "url(#mask)")


masked.append("path")
    .datum(worldData)
    .attr("class", "worldE")
    .attr("fill", "none")
    .attr("stroke", "#636363")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
        .curve(d3.curveCardinal)
        .x(d => xScale(d.year))
        .y(d => yScale(d.population) || 0)
    )



drawLines(countriesGroupedE, "lineE", "_E", false, "#bdbdbd", null, nothing)



let step = 0;

$("#button").on("click", function() {
    handleStepEnter(step);
    step++;
})

function handleStepEnter(response) {

    if (response == 0) {

        $("#button").html("Next")

        d3.select(".worldE").attr("opacity", 0)

        updateYScale([0, 1500000]);
        lineTransitions("lineE")

    }

    if (response == 1) {

        updateYScale([0, 15000000]);

        xScale.domain([1950, 2100]);
        svg.select(".x-axis")
            .transition().duration(1000)
            .call(d3.axisBottom(xScale).tickFormat(d => +d));

        lineTransitions("lineE")
        lineTransitionsWorld()

        drawLines(countriesGroupedE, "lineE", "_E", false, "#bdbdbd", null, nothing)
        drawLines(countriesGroupedP, "lineP", "_P", false, "#fdbb84", null, transition)


    }

    if (response == 2) {

        //this part is just here because there's a weird error with the projected lines when using transition,
        // they don't appear to reach the end of the y axis, so I added these lines behind

        masked.selectAll("path.lineP2")
            .data(countriesGroupedP)
            .join("path")
            .attr("class", "lineP2 line")
            .attr("opacity", 1)
            .attr("fill", "none")
            .attr("stroke", d => d[0] == "WORLD" ? "#de2d26" : "#fdbb84")
            .attr("stroke-width", 2)
            .attr("d", d => {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.population) || 0)
                    .defined((d => d.population))
                    (d[1])
            })

        masked.append("path")
            .datum(low)
            .attr("class", "lineLow line")
            .attr("fill", "none")
            .attr("stroke", "#fc9272")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
                .curve(d3.curveCardinal)
                .x(d => xScale(d.year))
                .y(d => yScale(d.population) || 0)
            ).call(transition);

        masked.append("path")
            .datum(high)
            .attr("class", "lineHigh line")
            .attr("fill", "none")
            .attr("stroke", "#a50f15")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
                .curve(d3.curveCardinal)
                .x(d => xScale(d.year))
                .y(d => yScale(d.population) || 0)
            ).call(transition);

    }


    if (response == 3) {

        updateYScale([0, 2000000]);
        lineTransitionsWorld()
        lineTransitions("line")

    }

    if (response == 4) {

        updateYScale([0, 5500000]);

        svg.selectAll(".lineP2").attr("opacity", 0).remove();
        masked.selectAll(".line").attr("opacity", 0)

        drawLinesRegions(regionsProjectedE, "lineRegionsE", "E", regionEColorScale)

        setTimeout(function() {

            drawLinesRegions(regionsProjectedP, "lineRegionsP", "P", regionPColorScale)

        }, 2500);


        setTimeout(function() {
            svg.selectAll(".lineRegions")
                .attr("stroke-width", 0.5);
            svg.select("#AFRICAE").attr("stroke-width", 3);
            svg.select("#AFRICAP").attr("stroke-width", 3);
        }, 6000);

        svg.selectAll(".lineP, .lineE").remove();

    }

    if (response == 5) {

        svg.selectAll(".lineRegions").attr("opacity", 0).remove();

        drawLinesCountries(africaGroupedE, "lineAfricaE", "_E", regionEColorScale, "AFRICA")
        drawLinesCountries(africaGroupedP, "lineAfricaP", "_P", regionPColorScale, "AFRICA")

        masked.selectAll(".lineRegions")
            .transition().duration(1000).attr("opacity", 0).remove()

        updateYScale([0, 600000]);

        lineTransitions("line")

        setTimeout(function() {

            svg.selectAll(".line")
                .attr("stroke-width", 0.5);

            svg.selectAll("#Nigeria_E,#Nigeria_P")
                .attr("stroke-width", 3);

        }, 500);


    }

    if (response == 6) {

        svg.selectAll(".lineAfricaE, .lineAfricaP")
            .attr("opacity", 0)
            .remove();

        updateYScale([0, 5500000]);

        drawLinesRegionsAfter(regionsProjectedE, "lineRegionsE", "E", regionEColorScale)
        drawLinesRegionsAfter(regionsProjectedP, "lineRegionsP", "P", regionPColorScale)

        setTimeout(function() {
            svg.selectAll(".lineRegions")
                .attr("stroke-width", 0.5);
            svg.select("#EUROPEE").attr("stroke-width", 3);
            svg.select("#EUROPEP").attr("stroke-width", 3);
        }, 1200);


    }

    if (response == 7) {

        svg.selectAll(".lineRegions").attr("opacity", 0).remove();

        drawLinesCountries(europeGroupedE, "lineEuropeE", "_E", regionEColorScale, "EUROPE")
        drawLinesCountries(europeGroupedP, "lineEuropeP", "_P", regionPColorScale, "EUROPE")

        updateYScale([0, 150000]);

        lineTransitions("line")

        setTimeout(function() {

            svg.selectAll(".line")
                .attr("stroke-width", 0.5);

            svg.selectAll("#Bulgaria_E,#Bulgaria_P")
                .attr("stroke-width", 5);

        }, 500);

    }

    if (response == 8) {

        svg.selectAll(".lineEuropeE, .lineEuropeP")
            .attr("opacity", 0)
            .remove();

        updateYScale([0, 5500000]);

        drawLinesRegionsAfter(regionsProjectedE, "lineRegionsE", "E", regionEColorScale)
        drawLinesRegionsAfter(regionsProjectedP, "lineRegionsP", "P", regionPColorScale)


        setTimeout(function() {
            svg.selectAll(".lineRegions")
                .attr("stroke-width", 0.5);
            svg.select("#NORTHERN-AMERICAE").attr("stroke-width", 3);
            svg.select("#NORTHERN-AMERICAP").attr("stroke-width", 3);
        }, 1200);

    }

    if (response == 9) {

        svg.selectAll(".lineRegions").attr("opacity", 0).remove();

        drawLinesCountries(nAmericaGroupedP, "lineNAmericaP", "_P", regionPColorScale, "NORTHERN AMERICA")
        drawLinesCountries(nAmericaGroupedE, "lineNAmericaE", "_E", regionEColorScale, "NORTHERN AMERICA")

        updateYScale([0, 400000]);

        lineTransitions("line")

        setTimeout(function() {

            svg.selectAll(".line")
                .attr("stroke-width", 0.5);

            svg.selectAll("#United-States-of-America_P,#United-States-of-America_E")
                .attr("stroke-width", 3);

        }, 500);

    }


    if (response == 10) {

        svg.selectAll(".lineNAmericaE, .lineNAmericaP")
            .attr("opacity", 0)
            .remove();

        updateYScale([0, 5500000]);

        drawLinesRegionsAfter(regionsProjectedE, "lineRegionsE", "E", regionEColorScale)
        drawLinesRegionsAfter(regionsProjectedP, "lineRegionsP", "P", regionPColorScale)

        setTimeout(function() {
            svg.selectAll(".lineRegions")
                .attr("stroke-width", 0.5);
            svg.select("#LATIN-AMERICA-AND-THE-CARIBBEANE").attr("stroke-width", 3);
            svg.select("#LATIN-AMERICA-AND-THE-CARIBBEANP").attr("stroke-width", 3);
        }, 1200);


    }

    if (response == 11) {

        svg.selectAll(".lineRegions").attr("opacity", 0).remove();

        drawLinesCountries(lAmericaGroupedP, "lineLAmericaP", "_P", regionPColorScale, "LATIN AMERICA AND THE CARIBBEAN")
        drawLinesCountries(lAmericaGroupedE, "lineLAmericaE", "_E", regionEColorScale, "LATIN AMERICA AND THE CARIBBEAN")

        updateYScale([0, 250000]);
        lineTransitions("line")

        setTimeout(function() {

            svg.selectAll(".line")
                .attr("stroke-width", 0.5);

            svg.selectAll("#Brazil_P,#Brazil_E")
                .attr("stroke-width", 3);

        }, 500);

    }

    if (response == 12) {

        svg.selectAll(".lineLAmericaE, .lineLAmericaP")
            .attr("opacity", 0)
            .remove();

        updateYScale([0, 5500000]);

        drawLinesRegionsAfter(regionsProjectedE, "lineRegionsE", "E", regionEColorScale)
        drawLinesRegionsAfter(regionsProjectedP, "lineRegionsP", "P", regionPColorScale)


        setTimeout(function() {
            svg.selectAll(".lineRegions")
                .attr("stroke-width", 0.5);
            svg.select("#ASIAE").attr("stroke-width", 3);
            svg.select("#ASIAP").attr("stroke-width", 3);
        }, 1200);


    }

    if (response == 13) {

        svg.selectAll(".lineRegions").attr("opacity", 0).remove();

        drawLinesCountries(asiaGroupedP, "lineAsiaP", "_P", regionPColorScale, "ASIA")
        drawLinesCountries(asiaGroupedE, "lineAsiaE", "_E", regionEColorScale, "ASIA")

        updateYScale([0, 1800000]);

        lineTransitions("line")

        setTimeout(function() {

            svg.selectAll(".line")
                .attr("stroke-width", 0.5);

            svg.selectAll("#Pakistan_P,#Pakistan_E")
                .attr("stroke-width", 3);

        }, 500);

    }

    if (response == 14) {

        svg.selectAll(".line")
            .transition().duration(500)
            .attr("stroke-width", 0.5).on("end", function() {
                svg.selectAll("#Indonesia_P,#Indonesia_E")
                    .transition().duration(500)
                    .attr("stroke-width", 3);

            })
    }

}


function updateYScale(domain) {
    yScale.domain(domain);
    svg.select(".y-axis")
        .transition().duration(1000)
        .call(d3.axisLeft(yScale));
}

function drawLines(data, className, estimate, colorBool, color, colorScale, transition) { //countriesGroupedE,"lineE","_E",false,"#bdbdbd",null

    masked.selectAll(`path.${className}`)
        .data(data)
        .join("path")
        .attr("class", `${className} line`)
        .attr("id", d => d[0] + estimate)
        .attr("opacity", 1)
        .attr("fill", "none")
        .attr("stroke", d => colorBool ? colorScale(d[0]) : (d[0] == "WORLD" ? "#de2d26" : color))
        .attr("stroke-width", 2)
        .attr("d", d => {
            return d3.line()
                .curve(d3.curveCardinal)
                .x(d => xScale(d.year))
                .y(d => yScale(d.population) || 0)
                .defined((d => d.population))
                (d[1])
        })
        .call(transition);
}


function drawLinesRegions(data, className, estimate, colorScale) {

    masked.selectAll(`path.${className}`)
        .data(data)
        .join("path")
        .attr("class", `${className} lineRegions`)
        .attr("id", d => d[0].replaceAll(" ", "-") + estimate)
        .attr("opacity", 1)
        .attr("fill", "none")
        .attr("stroke", d => colorScale(d[0]))
        .attr("stroke-width", 2)
        .attr("d", d => {
            return d3.line()
                .curve(d3.curveCardinal)
                .x(d => xScale(d.year))
                .y(d => yScale(d.population) || 0)
                .defined((d => d.population))
                (d[1])
        })
        .call(transition);
}

function drawLinesRegionsAfter(data, className, estimate, colorScale) {

    masked.selectAll(`path.${className}`)
        .data(data)
        .join("path")
        .attr("class", `${className} lineRegions`)
        .attr("id", d => d[0].replaceAll(" ", "-") + estimate)
        .transition().duration(500)
        .attr("opacity", 1)
        .attr("fill", "none")
        .attr("stroke", d => colorScale(d[0]))
        .attr("stroke-width", 2)
        .attr("d", d => {
            return d3.line()
                .curve(d3.curveCardinal)
                .x(d => xScale(d.year))
                .y(d => yScale(d.population) || 0)
                .defined((d => d.population))
                (d[1])
        })
}

function drawLinesCountries(data, className, estimate, colorScale, colorText) {

    masked.selectAll(`path.${className}`)
        .data(data)
        .join("path")
        .attr("class", `${className} line`)
        .attr("id", d => d[0].replaceAll(" ", "-") + estimate)
        .attr("opacity", 0)
        .attr("fill", "none")
        .attr("stroke", colorScale(colorText))
        .attr("stroke-width", 2)
        .attr("d", d => {
            return d3.line()
                .curve(d3.curveCardinal)
                .x(d => xScale(d.year))
                .y(d => yScale(d.population) || 0)
                .defined((d => d.population))
                (d[1])
        })

}

function lineTransitions(className) {
    masked.selectAll(`.${className}`)
        .transition().duration(1000)
        .attr("d", d => {
            return d3.line()
                .curve(d3.curveCardinal)
                .x(d => xScale(d.year))
                .y(d => yScale(d.population) || 0)
                .defined((d => d.population))
                (d[1])
        })
        .attr("opacity", 1)
}

function lineTransitionsWorld() {
    masked.select(".worldE")
        .transition().duration(1000)
        .attr("d", d3.line()
            .curve(d3.curveCardinal)
            .x(d => xScale(d.year))
            .y(d => yScale(d.population) || 0)
        )
        .attr("opacity", 1)
}

function nothing() {} //To prevent bug, fix later

function transition(path, callback, duration = 3500) {
    path.transition()
        .duration(duration)
        .attrTween("stroke-dasharray", tweenDash)
        .on("end", callback);
}

function tweenDash() {
    const l = this.getTotalLength(),
        i = d3.interpolateString("0," + l, l + "," + l);
    return function(t) {
        return i(t)
    };
}