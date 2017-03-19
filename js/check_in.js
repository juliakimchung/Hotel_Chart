margin = { top: 10, right: 10, bottom:100, left: 60};
let width1 = 1350 - margin.right -margin.left;
let height1 = 450-margin.top - margin.bottom;
//The "g" element is used as a container for grouping objects
let svg2 = d3.select('body')
		.append('svg')
		.attr({
			'width': width1 +margin.right +margin.left,
			'height': height1 +margin.top +margin.bottom
		})
		.append("g")
			.attr("transform", "translate(" +margin.left + "," + margin.right + ")");


//define the x and y scales

let xScale1 = d3.scale.ordinal()
	.rangeRoundBands([0, width1], 0.5, 0.5);

let yScale1 = d3.scale.linear()
	.range([height1, 0]);

	//define axis

let xAxis1 = d3.svg.axis()
	.scale(xScale1)
	.orient('bottom');

let yAxis1 = d3.svg.axis()
	.scale(yScale1)
	.orient("left")

d3.csv("res.csv", function(error, data){
	if(error) console.log("Error: data not loaded");

	data.forEach(function(d) {
		d.check_in_date =  d.check_in_date;
		d.Counts = +d.Counts;
		console.log("d.Counts", d.Counts);
	});
	

	xScale1.domain(data.map(function(d) {
		return d.check_in_date;
	}));
	yScale1.domain([0, d3.max(data, function(d){
		return d.Counts;
	})]);

	

// draw the bars
	svg2.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr('height', 0)
		.attr('y', height1)
		.transition().duration(3000)
		.delay(function(d, i){return i + 200;})
		.attr({
			'x': function(d){
					return xScale1(d.check_in_date);},
			'y': function (d) {
					return yScale1(d.Counts);},
			'width': xScale1.rangeBand(),
			'height': function(d){ return height1 - yScale1(d.Counts);}
		})
		.style('fill', function(d, i){ return '#ff530d'})
	//label the bars

	svg2.selectAll('text')
		.data(data)
		.enter()
		.append('text')
		.text(function(d){ return d.Counts})
		.attr('x', function(d){return xScale1(d.check_in_date) + xScale1.rangeBand();})
		// .attr('y', function(d) {return yScale(d.Counts) + 12;})
		.style('fill', 'white')
		.style('text-anchor', 'end');
	//draw the xAxis
	svg2.append('g')	
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,'+ height1 + ')')
		.call(xAxis1)
		.selectAll('text')
		.attr('transform', "rotate(-60)")
		.attr('dx', '-.8em')
		.attr('dy', '.25em')
		.style('text-anchor', 'end')

	svg2.append('g')
		.attr('class', 'y axis')
		.call(yAxis1)
		.style('font-size', '12px')
});




















