(function() {
    "use strict";

    var quantitativeData  = [{ x: -2, y: 15 }, { x: 1, y: 20 }, { x: 4, y: -3 }, { x: 8, y: 0 }, { x: 10, y: -10 }];
    var quantitativeData2 = [{ x: -2, y: 20 }, { x: 5, y: -10 }, { x: 7, y: 10 }, { x: 10, y: 7 }];

    var colors = new Plottable.Scale.Color("Category10").range();

    function makeBasicChart(xyData) {
        var xScale = new Plottable.Scale.Linear();
        var yScale = new Plottable.Scale.Linear();

        var xAxis = new Plottable.Axis.Numeric(xScale, "bottom");
        var yAxis = new Plottable.Axis.Numeric(yScale, "left");

        var plot = new Plottable.Plot.Line(xyData, xScale, yScale);

        plot.project("stroke", colors[0]);
        plot.project("fill", colors[0]);
        plot.animate(true);

        var chart = new Plottable.Component.Table([
            [yAxis, plot],
            [null, xAxis]
        ]);

        return chart;
    }

    function getXYPlot(data) {
        var xScale = new Plottable.Scale.Linear();
        var yScale = new Plottable.Scale.Linear();
        var ds = new Plottable.Dataset(data);
        var plot = new Plottable.Plot.Area(ds, xScale, yScale);

        plot.animate(true);
        return plot;
    }

    function makeStackedAreaChart() {
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

        return chart;
    }

    function makeStackedBarChart(stackedData) {
        var data0  = [{x : "Left", y : 10}, {x : "Right", y : 20}];
        var data1  = [{x : "Left", y : 12}, {x : "Right", y : 5}];

        [data0, data1].forEach(function(data, i){
            data.forEach(function(d){
                d.i = i;
            });
        });

        var xScale     = new Plottable.Scale.Ordinal();
        var yScale     = new Plottable.Scale.Linear();
        var colorScale = new Plottable.Scale.Color("Category10");

        var xAxis  = new Plottable.Axis.Category(xScale, "bottom");
        var yAxis  = new Plottable.Axis.Numeric(yScale, "left");
        var lines  = new Plottable.Component.Gridlines(null, yScale);
        var plot   = new Plottable.Plot.StackedBar(xScale, yScale)
            .animate(true);
        var chart;


        for(var i = 0; i < stackedData.length; ++i) {
            plot.addDataset(stackedData[i]);
        }

        plot.project("fill", function(d){return "Series #" + d.i;}, colorScale);

        chart = new Plottable.Component.Table([
            [null, yAxis, lines.merge(plot)],
            [null, null, xAxis]
        ]);

        return chart;
    }

    window.makeCharts = function(xyData, stackedData){
        var basicChart = makeBasicChart(xyData);
        var stackedArea = makeStackedAreaChart();
        var stackedBar = makeStackedBarChart(stackedData);

        var chartsTable = new Plottable.Component.Table();

        chartsTable.addComponent(0, 0, new Plottable.Component.Label("Num1", "horizontal"));
        chartsTable.addComponent(1, 0, basicChart);

        chartsTable.addComponent(0, 1, new Plottable.Component.Label("Num2", "horizontal"));
        chartsTable.addComponent(1, 1, stackedArea);

        chartsTable.addComponent(2, 0, new Plottable.Component.Label("Num3", "horizontal"));
        chartsTable.addComponent(3, 0, stackedBar);

        chartsTable.renderTo("#table");
    };

})();