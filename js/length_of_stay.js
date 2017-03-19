let margin5 = { top: 10, right: 10, bottom:100, left: 80},
		width5 = 1350 - margin5.right -margin5.left,
		height5 = 550 -margin5.top - margin5.bottom;
//the g element is used as a container for grouping objects.
let svg5 = d3.select('body')
		.append('svg')
		.attr({
			'width': width5 +margin.right +margin.left,
			'height': height5 +margin.top +margin.bottom
		})
		.append("g")
			.attr("transform", "translate(" +margin5.left + "," + margin5.right + ")");


//define the x and y scales

let xScale5 = d3.scale.ordinal()
		.rangeRoundBands([0, width5], 0.5, 0.5);

let yScale5 = d3.scale.linear()
		.range([height5, 0]);

	//define axis

let xAxis5 = d3.svg.axis()
		.scale(xScale5)
		.orient('bottom');

let yAxis5 = d3.svg.axis()
		.scale(yScale5)
		.orient("left")

d3.csv("len_stay.csv", function(error, data){
		if(error) console.log("Error: data not loaded");
		data.forEach(function(d) {
			d.id =  d.id;
			d.stay_len= +d.stay_len
			console.log("d.length", d.stay_len);
		});
		data.sort(function(a,b){
			return b.stay_len - a.stay_len
		});
		//specify the domains of the x and y scales
		xScale5.domain(data.map(function(d) {
			return d.id;
		}));
		yScale5.domain([0, d3.max(data, function(d){
			return d.stay_len;
		})]);


// draw the bars
		svg5.selectAll('rect')
			.data(data)
			.enter()
			.append('rect')
			.attr('height', 0)
			.attr('y', height5)
			.transition().duration(3000)
			.delay(function(d, i){return i + 200;})
			.attr({
				'x': function(d){
						return xScale5(d.id);},
				'y': function (d) {
						return yScale5(d.stay_len);},
				'width': xScale5.rangeBand(),
				'height': function(d){ return height5 - yScale5(d.stay_len);}
			})
			.style('fill', function(d, i){ return 'rgb(20,20,' + ((i+30) + 100)+ ')' });
		
		//draw the xAxis
		svg5.append('g')	
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,'+ height5 + ')')
			.call(xAxis5)
			.selectAll('text')
			.attr('transform', "rotate(-60)")
			.attr('dx', '-.8em')
			.attr('dy', '.15em')
			.style('text-anchor', 'end')
			.style('font-size', '8px');

		svg5.append('g')
			.attr('class', 'y axis')
			.call(yAxis5)
			.style('font-size', '12px')
});



