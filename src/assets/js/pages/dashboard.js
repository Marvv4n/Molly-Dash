
// Toggle numbers function
function toggleNumbers() {
    showNumbers = !showNumbers;
    chart.updateOptions({
        dataLabels: {
            enabled: showNumbers
        }
    });
}

/**
 * Theme: Taplox- Responsive Bootstrap 5 Admin Dashboard
 * Module/App: Dashboard
 */

//
//Sales Report -chart
//
// Add toggle state
var showNumbers = false;

var options = {
    series: [{
        name: "Page Views",
        type: "bar",
        data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67],
    },
    {
        name: "Clicks",
        type: "area",
        data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35],
    },
    {
        name: "Conversion Ratio", 
        type: "area",
        data: [12, 16, 11, 22, 28, 25, 15, 29, 35, 45, 42, 48],
    }
    ],
    chart: {
        height: 313,
        type: "line",
        toolbar: {
            show: true,
            tools: {
                download: true,
                selection: true,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true
            },
            autoSelected: 'zoom'
        },
        zoom: {
            enabled: true,
            type: 'x'
        }
    },
    dataLabels: {
        enabled: showNumbers,
        formatter: function(val) {
            return val.toFixed(1) + "%"
        }
    },
    stroke: {
        dashArray: [0, 0, 2],
        width: [0, 2, 2],
        curve: 'smooth'
    },
    fill: {
        opacity: [1, 1, 1],
        type: ['solid', 'gradient', 'gradient'],
        gradient: {
            type: "vertical",
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90]
        },
    },
    markers: {
        size: [0, 0],
        strokeWidth: 2,
        hover: {
            size: 4,
        },
    },
    xaxis: {
        categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        axisTicks: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
    },
    yaxis: {
        min: 0,
        axisBorder: {
            show: false,
        }
    },
    grid: {
        show: true,
        strokeDashArray: 3,
        xaxis: {
            lines: {
                show: false,
            },
        },
        yaxis: {
            lines: {
                show: true,
            },
        },
        padding: {
            top: 0,
            right: -2,
            bottom: 0,
            left: 10,
        },
    },
    legend: {
        show: true,
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: 5,
        markers: {
            width: 9,
            height: 9,
            radius: 6,
        },
        itemMargin: {
            horizontal: 10,
            vertical: 0,
        },
    },
    plotOptions: {
        bar: {
            columnWidth: "30%",
            barHeight: "70%",
            borderRadius: 3,
        },
    },
    colors: ["#1a80f8", "#17c553", "#7942ed"],
    tooltip: {
        shared: true,
        y: [{
            formatter: function (y) {
                if (typeof y !== "undefined") {
                    return y.toFixed(1) + "k";
                }
                return y;
            },
        },
        {
            formatter: function (y) {
                if (typeof y !== "undefined") {
                    return y.toFixed(1) + "k";
                }
                return y;
            },
        },
        ],
    },
}

var chart = new ApexCharts(
    document.querySelector("#dash-performance-chart"),
    options
);

chart.render();




class VectorMap {


    initWorldMapMarker() {
        const map = new jsVectorMap({
            map: 'world',
            selector: '#world-map-markers',
            zoomOnScroll: true,
            zoomButtons: false,
            markersSelectable: true,
            markers: [
                { name: "Canada", coords: [56.1304, -106.3468] },
                { name: "Brazil", coords: [-14.2350, -51.9253] },
                { name: "Russia", coords: [61, 105] },
                { name: "China", coords: [35.8617, 104.1954] },
                { name: "United States", coords: [37.0902, -95.7129] }
            ],
            markerStyle: {

// Improved timespan handlers
function updateChartTimespan(period) {
    const now = new Date();
    const ranges = {
        '1M': {
            start: new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()),
            end: now
        },
        '6M': {
            start: new Date(now.getFullYear(), now.getMonth() - 6, now.getDate()),
            end: now
        },
        '1Y': {
            start: new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()),
            end: now
        }
    };

    const range = ranges[period] || ranges['1Y'];
    const data = getDataForRange(range.start, range.end);
    
    chart.updateSeries([{
        name: 'Page Views',
        data: data.pageViews
    }, {
        name: 'Clicks',
        data: data.clicks
    }, {
        name: 'Conversion Ratio',
        data: data.conversion
    }]);
}

function getDataForRange(start, end) {
    // Implement your data fetching logic here
    // This is a dummy implementation
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
        pageViews: months.map(() => Math.floor(Math.random() * 80)),
        clicks: months.map(() => Math.floor(Math.random() * 40)),
        conversion: months.map(() => Math.floor(Math.random() * 50))
    };
}

                initial: { fill: "#7f56da" },
                selected: { fill: "#1bb394" }
            },
            labels: {
                markers: {
                    render: marker => marker.name
                }
            },
            regionStyle: {
                initial: {
                    fill: 'rgba(169,183,197, 0.3)',
                    fillOpacity: 1,
                },
            },
        });
    }

    init() {
        this.initWorldMapMarker();
    }

}

// Time span selector function
function updateChartTimespan(period) {
    let data = [];
    const now = new Date();
    
    switch(period) {
        case '1M':
            data = getDailyData(30);
            break;
        case '6M':
            data = getMonthlyData(6);
            break;
        case '1Y':
            data = getMonthlyData(12);
            break;
        default:
            data = getAllData();
    }
    
    chart.updateSeries([{
        name: 'Page Views',
        data: data.pageViews
    }, {
        name: 'Clicks',
        data: data.clicks
    }, {
        name: 'Conversion Ratio',
        data: data.conversion
    }]);
}

document.addEventListener('DOMContentLoaded', function (e) {
    new VectorMap().init();
    
    // Add event listeners for timespan buttons
    document.querySelectorAll('.btn-outline-light').forEach(button => {
        button.addEventListener('click', (e) => {
            updateChartTimespan(e.target.textContent.trim());
        });
    });
});

// Dummy data functions (replace with your actual data fetching logic)
function getDailyData(days) {
    const pageViews = Array.from({length: days}, () => Math.floor(Math.random() * 100));
    const clicks = Array.from({length: days}, () => Math.floor(Math.random() * 50));
    const conversion = Array.from({length: days}, () => Math.floor(Math.random() * 40));
    return { pageViews, clicks, conversion };
}

function getMonthlyData(months) {
    const pageViews = Array.from({length: months}, () => Math.floor(Math.random() * 1000));
    const clicks = Array.from({length: months}, () => Math.floor(Math.random() * 500));
    const conversion = Array.from({length: months}, () => Math.floor(Math.random() * 400));
    return { pageViews, clicks, conversion };
}

function getAllData() {
    return getMonthlyData(12); // Or fetch from your data source
}