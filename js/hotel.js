let margin = { top: 20, right: 10, bottom:100, left: 40},
	width = 750 - margin.right -margin.left,
	height = 500 -margin.top - margin.bottom;
//the g element is used as a container for grouping objects.
let svg = d3.select('body')
		.append('svg')
		.attr({
			'width': width +margin.right +margin.left,
			'height': height +margin.top +margin.bottom
		})
		.append("g")
			.attr("transform", "translate(" +margin.left + "," + margin.right + ")");


//define the x and y scales

let xScale = d3.scale.ordinal()
	.rangeRoundBands([0, width], 0.2, 0.2);

let yScale = d3.scale.linear()
	.range([height, 0]);

	//define axis

let xAxis = d3.svg.axis()
	.scale(xScale)
	.orient('bottom');

let yAxis = d3.svg.axis()
	.scale(yScale)
	.orient("left")

d3.csv("state_guest.csv", function(error, data){
	if(error) console.log("Error: data not loaded");

	data.forEach(function(d) {
		d.state =  d.state;
		d.count = +d.count
		console.log("d.count", d.count);
	});
	data.sort(function(a,b){
		return b.count - a.count
	});

	xScale.domain(data.map(function(d) {
		return d.state;
	}));
	yScale.domain([0, d3.max(data, function(d){
		return d.count
	})]);

// draw the bars
	svg.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr('height', 0)
		.attr('y', height)
		.transition().duration(3000)
		.delay(function(d, i){return i + 200;})
		.attr({
			'x': function(d){
					return xScale(d.state);},
			'y': function (d) {
					return yScale(d.count);},
			'width': xScale.rangeBand(),
			'height': function(d){ return height - yScale(d.count);}
		})
		.style('fill', function(d, i){ return 'rgb(20, 20, ' + ((i*30)+ 100)+ ')'})
	//label the bars

	svg.selectAll('text')
		.data(data)
		.enter()
		.append('text')
		.text(function(d){ return d.count})
		.attr('x', function(d){return xScale(d.state) + xScale.rangeBand()/2;})
		.attr('y', function(d) {return yScale(d.count) + 12;})
		.style('fill', 'white')
		.style('text-anchor', 'middle');
	//draw the xAxis
	svg.append('g')	
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,'+ height + ')')
		.call(xAxis)
		.selectAll('text')
		.attr('transform', "rotate(-60)")
		.attr('dx', '-.8em')
		.attr('dy', '.25em')
		.style('text-anchor', 'end')

	svg.append('g')
		.attr('class', 'y axis')
		.call(yAxis)
		.style('font-size', '12px')
});




















