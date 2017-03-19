margin = { top: 10, right: 45, bottom:75, left: 80};
let wd = 650 - margin.right -margin.left;
let ht= 450 -margin.top - margin.bottom;
//the g element is used as a container for grouping objects.
let svg7 = d3.select('body')
		.append('svg')
		.attr({
			'width': wd +margin.right +margin.left,
			'height':ht +margin.top +margin.bottom
		})
		.append("g")
			.attr("transform", "translate(" +margin.left + "," + margin.right + ")");


//define the x and y scales

let xScale7 = d3.scale.ordinal()
	.rangeRoundBands([0, wd], 0.2, 0.2);

let yScale7 = d3.scale.linear()
	.range([ht, 0]);

	//define axis

let xAxis7 = d3.svg.axis()
	.scale(xScale7)
	.orient('bottom');

let yAxis7 = d3.svg.axis()
	.scale(yScale7)
	.orient("left")

d3.csv("revenue.csv", function(error, data){
		if(error) console.log("Error: data not loaded");
		console.log("data from revenue.csv", data);
		data.forEach(function(d) {
			d.Month =  d.Month;
			d.Revenue = +d.Revenue;
			console.log("d.Revenue", d.Revenue);
		});
		// data.sort(function(a,b){
		// 	return b.Revenue - a.Revenue;
		// });

		xScale7.domain(data.map(function(d) {
			return d.Month;
		}));
		yScale7.domain([0, d3.max(data, function(d){
			return d.Revenue;
		})]);


// draw the bars
		svg7.selectAll('rect')
			.data(data)
			.enter()
			.append('rect')
			.attr('height', 0)
			.attr('y', ht)
			.transition().duration(3000)
			.delay(function(d, i){return i + 200;})
			.attr({
				'x': function(d){
						return xScale7(d.Month);},
				'y': function (d) {
						return yScale7(d.Revenue);},
				'width': xScale7.rangeBand(),
				'height': function(d){ return ht - yScale7(d.Revenue);}
			})
			.style('fill', function(d, i){ return '#93c700' });
			
		//label the bars

		svg7.selectAll('text')
			.data(data)
			.enter()
			.append('text')
			.text(function(d){ return d.Revenue})
			.attr('x', function(d){return xScale7(d.Month) + xScale7.rangeBand()/2;})
			.attr('y', function(d) {return yScale7(d.Revenue) + 12;})
			.style('fill', 'white')
			.style('text-anchor', 'middle');
		//draw the xAxis
		svg7.append('g')	
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,'+ ht + ')')
			.call(xAxis7)
			.selectAll('text')
			.attr('transform', "rotate(-20)")
			.attr('dx', '-.8em')
			.attr('dy', '.25em')
			.style('text-anchor', 'end')
			.style('font-size', '15px');

		svg7.append('g')
			.attr('class', 'y axis')
			.call(yAxis7)
			.style('font-size', '12px')
});



