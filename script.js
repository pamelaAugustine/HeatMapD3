document.addEventListener('DOMContentLoaded', function () {

    fetch('global-temperature.json')
        .then(response => response.json())
        .then(data => {


            let dataset = data.monthlyVariance
            //             console.log(myData);

            //mapping the data into an object
            let myDataSet = dataset.map((item) => {
                if (item.month == 1) {
                    item.month = 'January'
                }
                else if (item.month == 2) {
                    item.month = 'February'
                }
                else if (item.month == 3) {
                    item.month = 'March'
                }
                else if (item.month == 4) {
                    item.month = 'April'
                }
                else if (item.month == 5) {
                    item.month = 'May'
                }
                else if (item.month == 6) {
                    item.month = 'June'
                }
                else if (item.month == 7) {
                    item.month = 'July'
                }
                else if (item.month == 8) {
                    item.month = 'August'
                }
                else if (item.month == 9) {
                    item.month = 'September'
                }
                else if (item.month == 10) {
                    item.month = 'October'
                }
                else if (item.month == 11) {
                    item.month = 'November'
                }
                else if (item.month == 12) {
                    item.month = 'December'
                }




                return {
                    year: Date.parse(item.year),

                    variance: item.variance + 8.66,
                    month: item.month



                }
            })


        

            // Height and Width for the graph
            const w = 1000;
            const h = 600;


            //time format for the years
            let formatTime = d3.timeFormat("%Y");

            //Min and Max Values for the year (X-Axis)
            let yearMin = d3.min(myDataSet, d => d.year);
            console.log(yearMin);
            let yearMax = d3.max(myDataSet, d => d.year);
            console.log(yearMax);


            //Margin object for the graph
            let margin = {
                top: 80, right: 0, bottom: 100, left: 120
            };


            //created constants for the innerWidth and innerHeight
            const innerWidth = w - margin.left - margin.right;
            const innerHeight = h - margin.top - margin.bottom;



            //min and max variance
            let varMin = d3.min(myDataSet, d => d.variance);
            let varMax = d3.max(myDataSet, d => d.variance);
            // console.log('varmin', varMin);
            // console.log('varmax', varMax);

            //selecting the body of the page for the element to display the svg element
            const svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

            //xScale for the years
            const xScale = d3.scaleTime()
                .domain([yearMin, yearMax])
                .range([0, innerWidth]);

            //creating the xAxis, on the bottom
            const xAxis = d3.axisBottom(xScale);
            const xAxisLabel = 'Years';

            //yScale for the month. need to scale band because they are strings
            const yScale = d3.scaleBand()
                .domain(myDataSet.map(d => d.month))
                .range([0, innerHeight]);

            //creating the axis left for the yAxis
            const yAxis = d3.axisLeft(yScale);
            const yAxisLabel = 'Months';

            const g = svg.append("g")
             .attr("transform", `translate(${margin.left},${margin.top})`);

            const yAxisG = g.append('g')
                .call(yAxis)
                .attr('id', 'y-axis')
                .attr('class', 'axis');

            const xAxisG = g.append('g')
                .call(xAxis)
                .attr('transform', `translate(0, ${innerHeight})`)
                .attr('id', 'x-axis')
                .attr('class', 'axis')

            g.selectAll("rect")
                .data(myDataSet)
                .enter()
                .append('rect')
                .attr('class', 'cell')
                .attr('x', d => xScale(d.year) - margin.right)
                .attr("y", d => yScale(d.month))
                .attr("width", w)
                .attr('height', d => innerHeight - yScale(d.month))
                .attr("fill", (d) => {
                    if (d.variance <= 2.8) {
                        return 'darkblue'
                    }
                    else if (d.variance > 2.8 && d.variance <= 3.9) {
                        return 'darkslateblue'
                    }
                    else if (d.variance > 3.9 && d.variance <= 5.0) {
                        return 'royalblue'
                    }
                    else if (d.variance > 5.0 && d.variance <= 6.1) {
                        return 'lightskyblue'
                    }
                    else if (d.variance > 6.1 && d.variance <= 7.2) {
                        return 'cyan'
                    }
                    else if (d.variance > 7.2 && d.variance <= 8.3) {
                        return 'yellow'
                    }
                    else if (d.variance > 8.3 && d.variance <= 9.5) {
                        return 'hotpink'
                    }
                    else if (d.variance > 9.5 && d.variance <= 10.6) {
                        return 'magenta'
                    }
                    else if (d.variance > 10.6 && d.variance <= 11.7) {
                        return 'darkorchid'
                    }
                    else if (d.variance > 11.7 && d.variance <= 12.8) {
                        return 'crimson'
                    }
                    else if(d.variance > 12.8){
                        return 'darkred'
                    }
                })
                .attr('class', 'bar')
                .append('title')
                .attr('id', 'tooltip')
                .text(d => d.variance.toFixed(2) + '°C - ')
                .append('title')
                .text(d => formatTime(new Date(d.year + 100000000)));


            yAxisG.append('text')
                .attr('id', 'yAxisLabel')
                .attr('class', 'axislabel')
                .attr('transform', 'rotate (-90, -15, 55) translate(-80)')
                .attr('fill', 'black')
                .text(yAxisLabel);

            xAxisG.append('text')
                .attr('id', 'xAxisLabel')
                .attr('class', 'axislabel')
                .attr('y', 40)
                .attr('x', innerWidth / 2)
                .attr('fill', 'black')
                .text(xAxisLabel);

            g.append('text')
                .attr('x', 300)
                .attr('y', -35)
                .text('Monthly Global Land-Surface Temperature')
                .attr('id', 'title');

            g.append('text')
                .attr('x', 350)
                .text("1753 - 2015: base temperature 8.66°C")
                .attr('y', -17)
                .attr('id', 'description');



            svg.append("rect")
                .attr("x", 120)
                .attr("y", 550)
                .attr("height", 15)
                .attr('width', 25)
                .style("fill", "darkblue");

            svg.append("text")
                .attr("x", 137)
                .attr("y", 580)
                .text("2.8")
                .style("font-size", "11px");

                svg.append("rect")
                .attr("x", 145)
                .attr("y", 550)
                .attr("height", 15)
                .attr('width', 25)
                .style("fill", "darkslateblue");

            svg.append("text")
                .attr("x", 162)
                .attr("y", 580)
                .text("3.9")
                .style("font-size", "11px");

                svg.append("rect")
                .attr("x", 170)
                .attr("y", 550)
                .attr("height", 15)
                .attr('width', 25)
                .style("fill", "royalblue");

            svg.append("text")
                .attr("x", 187)
                .attr("y", 580)
                .text("5.0")
                .style("font-size", "11px");

                svg.append("rect")
                .attr("x", 195)
                .attr("y", 550)
                .attr("height", 15)
                .attr('width', 25)
                .style("fill", "lightskyblue");

            svg.append("text")
                .attr("x", 212)
                .attr("y", 580)
                .text("6.1")
                .style("font-size", "11px");

                
                svg.append("rect")
                .attr("x", 220)
                .attr("y", 550)
                .attr("height", 15)
                .attr('width', 25)
                .style("fill", "cyan");

            svg.append("text")
                .attr("x", 237)
                .attr("y", 580)
                .text("7.2")
                .style("font-size", "11px");

                svg.append("rect")
                .attr("x", 245)
                .attr("y", 550)
                .attr("height", 15)
                .attr('width', 25)
                .style("fill", "yellow");

            svg.append("text")
                .attr("x", 262)
                .attr("y", 580)
                .text("8.3")
                .style("font-size", "11px");

                svg.append("rect")
                .attr("x", 270)
                .attr("y", 550)
                .attr("height", 15)
                .attr('width', 25)
                .style("fill", "hotpink");

            svg.append("text")
                .attr("x", 287)
                .attr("y", 580)
                .text("9.5")
                .style("font-size", "11px");

                svg.append("rect")
                .attr("x", 295)
                .attr("y", 550)
                .attr("height", 15)
                .attr('width', 25)
                .style("fill", "magenta");

            svg.append("text")
                .attr("x", 312)
                .attr("y", 580)
                .text("10.6")
                .style("font-size", "11px");

                svg.append("rect")
                .attr("x", 320)
                .attr("y", 550)
                .attr("height", 15)
                .attr('width', 25)
                .style("fill", "darkorchid");

            svg.append("text")
                .attr("x", 337)
                .attr("y", 580)
                .text("11.7")
                .style("font-size", "11px");

                svg.append("rect")
                .attr("x", 345)
                .attr("y", 550)
                .attr("height", 15)
                .attr('width', 25)
                .style("fill", "crimson");

            svg.append("text")
                .attr("x", 362)
                .attr("y", 580)
                .text("12.8")
                .style("font-size", "11px");

                
                svg.append("rect")
                .attr("x", 370)
                .attr("y", 550)
                .attr("height", 15)
                .attr('width', 25)
                .style("fill", "darkred");
        })

})