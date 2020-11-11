var classPromise = d3.json("classData.json");

var getImg = function(image) {
    return "imgs/"+image.picture;
}

var makeGraph = function(students) {
    var screen = {width:600, height:600}
    d3.select("#graph")
    .attr("width", screen.width)
    .attr("height", screen.height)

var xscale = d3.scaleLinear()
.domain([0,50])
.range([0,screen.width])

var yscale = d3.scaleLinear()
.domain([0,100])
.range([screen.height, 0])

var drawgraph = function(students, screen, xscale, yscale) {
    d3.select("#graph")
    .selectAll("circle")
    .data(students)
    .enter()
    .append("circle")
    
    .attr("cx", function(student) {
        return xscale(getHwmean(student));
    })
    .attr("cy", function(student){
        return yscale(getfinalGrade(student));
    })
    .attr("r", 5)
    .attr("fill", "red")
    
    .on("mouseenter", function(students) {
        console.log("hovering");
        var Xposition = d3.event.pageX;
        var Yposition = d3.event.pageY;
        d3.select("#toolTip")
        .classed("hidden", false)
        .style("top", Yposition+"px")
        .style("left", Xposition+"px")
        
        d3.select("#toolTip #img img")
        .attr("src", getImg(students))
    })
}
drawgraph(students, screen, xscale, yscale);

}

var getfinalGrade = function(students) {
    var getgrade = students.final.map(function(grade) {
        return grade.grade;
    })
    return getgrade;
}
var getHwmean =function(students) {
    var getGrade = students.homework.map(function(grade) {
        return grade.grade;
    })
    return d3.mean(getGrade).toFixed(0);
}



    
var successFNC = function(students) {
    console.log("Data", students);
    makeGraph(students);
}
var failFNC = function(students) {
    console.log("Failure in getting data", errMessage);
    d3.select("title")
    .text("files not found");
}
classPromise.then(successFNC,failFNC);