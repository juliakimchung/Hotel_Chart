let margin7 = {top:80, right:20, bottom:20, left:20},
		widths1 = 450,
 		heights1 = 450,
    radius1 = widths1/2;

let color1 = d3.scale.ordinal()
		.range(["#93c700", "#ffc801", "#d60000","#0e99da"]);

let arc3 = d3.svg.arc()
		.outerRadius(radius -10)
		.innerRadius(radius -100);

let pie2 = d3.layout.pie()
		.sort(null)
		.value(function(d) { return d.counts;});

let svg3 = d3.select('body').append('svg')
		.attr('width', widths1)
		.attr('height', heights1)
		.append('g')
		.attr('transform', 'translate('+ widths1/2 + "," + heights1/2 + ")");


d3.csv("paymenttype.csv", function(error, data){
	console.log("data from paymenttype",data );
	data.forEach(function(d){
		d.counts = +d.counts;
		d.name = d.name;
		console.log("d.Count from paymenttype", d.counts);
	});

	//append g elements(arc)
	let gg = svg3.selectAll('.arc')
		.data(pie2(data))
		.enter().append('g')
		.attr('class', 'arc');
		console.log("data from let gg=svg3.selectAll", data);
	//append the path of the arc
	gg.append('path')
		.attr('id', "wavy")
		.attr('d', arc3)
		.style('fill', function(d){
			console.log("d", d);
			return color1(d.data.name); 
		});
		//append the label
	gg.append('text')
		.attr('transform', function(d) {return 'translate(' + arc3.centroid(d) + ')';})
		.attr('dy', '.35em')
		.style('text-anchor', 'middle')
		.text(function(d) {return d.data.name})

	
	


});
