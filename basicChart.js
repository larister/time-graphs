(function(){
    'use strict';

    function makeBasicChart() {
      var xScale = new Plottable.Scale.Linear();
      var yScale = new Plottable.Scale.Linear();

      var xAxis = new Plottable.Axis.Numeric(xScale, 'bottom');
      var yAxis = new Plottable.Axis.Numeric(yScale, 'left');

      var plot = new Plottable.Plot.Line(xyData, xScale, yScale);

      var chart = new Plottable.Component.Table([
                    [yAxis, plot],
                    [null,  xAxis]
                  ]);

      chart.renderTo("#basicChart");
    }

    window.makeBasicChart = makeBasicChart;

})();