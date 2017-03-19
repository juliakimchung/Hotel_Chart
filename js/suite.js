 let widths = 450,
 		 heights = 450,
     radius = Math.min(widths, heights)/2;

let color = d3.scale.ordinal()
	.range(["#289976", "#b1ff91",  "#ffe877", "#ff5600"]);


let pie = d3.layout.pie()
	.sort(null)
	.value(function(d) { return d.Count;});

let svg1 = d3.select('body').append('svg')
		.attr('width', widths)
		.attr('height', heights)
		.append('g')
		.attr('transform', 'translate('+ widths/2 + "," + heights/2 + ")");

let arc = d3.svg.arc()
	.outerRadius(radius -10)
	.innerRadius(radius -150)

d3.csv("suite_reserve_count.csv", function(error, data){
	data.forEach(function(d){
		d.Count = +d.Count;
		console.log("d.Count", d.Count);
	});

	let g = svg1.selectAll('.arc')
			.data(pie(data))
		.enter().append('g')
			.attr('class', 'arc');

	g.append('path')
		.attr('d', arc)
		.style('fill', function(d){
			return color(d.data.Name); 
		});

	g.append('text')
		.attr('transform', function(d) {return 'translate(' + arc.centroid(d) + ')';})
		.attr('dy', '.35em')
		.style('text-anchor', 'middle')
		.text(function(d) {return d.data.Name})







});


