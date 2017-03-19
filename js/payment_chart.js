let widths1 = 450,
 		heights1 = 450,
    radius1 = Math.min(widths1, heights1)/2;

let color1 = d3.scale.ordinal()
	.range(["#93c700", "#ffc801", "#d60000","#0e99da"]);


let pie2 = d3.layout.pie()
	.sort(null)
	.value(function(d) { return d.COUNT;});

let svg3 = d3.select('body').append('svg')
		.attr('width', widths1)
		.attr('height', heights1)
		.append('g')
		.attr('transform', 'translate('+ widths1/2 + "," + heights1/2 + ")");

let arc3 = d3.svg.arc()
	.outerRadius(radius -10)
	.innerRadius(radius -100)

d3.csv("payment.csv", function(error, data){
	data.forEach(function(d){
		d.COUNT = +d.COUNT;
		console.log("d.Count", d.COUNT);
	});

let gg = svg3.selectAll('.arc')
			.data(pie(data))
			.enter().append('g')
			.attr('class', 'arc');

		gg.append('path')
			.attr('d', arc3)
			.style('fill', function(d){
			return color1(d.data.Name); 
		});

		gg.append('text')
			.attr('transform', function(d) {return 'translate(' + arc3.centroid(d) + ')';})
			.attr('dy', '.35em')
			.style('text-anchor', 'middle')
			.text(function(d) {return d.data.Name})







});


