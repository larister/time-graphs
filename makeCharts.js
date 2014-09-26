(function() {
    "use strict";

    var quantitativeData  = [{ x: -2, y: 15 }, { x: 1, y: 20 }, { x: 4, y: -3 }, { x: 8, y: 0 }, { x: 10, y: -10 }];
    var quantitativeData2 = [{ x: -2, y: 20 }, { x: 5, y: -10 }, { x: 7, y: 10 }, { x: 10, y: 7 }];

    var colors = new Plottable.Scale.Color("Category10").range();

    function makeBasicChart() {
        var xScale = new Plottable.Scale.Linear();
        var yScale = new Plottable.Scale.Linear();

        var xAxis = new Plottable.Axis.Numeric(xScale, "bottom");
        var yAxis = new Plottable.Axis.Numeric(yScale, "left");

        var plot = new Plottable.Plot.Line(xyData, xScale, yScale);

        plot.project("stroke", colors[0]);
        plot.project("fill", colors[0]);

        var chart = new Plottable.Component.Table([
            [yAxis, plot],
            [null, xAxis]
        ]);

        chart.renderTo("#basicChart");
    }

    function getXYPlot(data) {
        var xScale = new Plottable.Scale.Linear();
        var yScale = new Plottable.Scale.Linear();
        var ds = new Plottable.Dataset(data);
        var plot = new Plottable.Plot.Area(ds, xScale, yScale);

        plot.animate(true);
        return plot;
    }

    function stackedAreaPlot(plotData) {
        var xScale = new Plottable.Scale.Linear();
        var yScale = new Plottable.Scale.Linear();

        var plot = getXYPlot(quantitativeData);
        var plot2 = getXYPlot(quantitativeData2);

        var xAxis = new Plottable.Axis.Numeric(xScale, "bottom");
        var yAxis = new Plottable.Axis.Numeric(yScale, "left");

        plot.project("fill", colors[0]);
        plot2.project("fill", colors[1]);

        var group = new Plottable.Component.Group([plot, plot2]);

        var chart = new Plottable.Component.Table([
            [yAxis, group],
            [null, xAxis]
        ]);

        chart.renderTo("#areaPlot");
    }

    window.makeCharts = function(){
        makeBasicChart();
        stackedAreaPlot();
    };

})();