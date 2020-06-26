export default {
  series: [10],
  chartOptions: {
    plotOptions: {
      radialBar: {
        size: 110,
        startAngle: -150,
        endAngle: 150,
        hollow: {
          size: '77%',
        },
        track: {
          background: "#bfc5cc",
          strokeWidth: '50%',
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            offsetY: 18,
            color: '#99a2ac',
            fontSize: '4rem'
          }
        }
      }
    },
    colors: ['#15B0CE'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#00b5b5'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      },
    },
    stroke: {
      lineCap: 'round'
    },
    chart: {
      sparkline: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        blur: 3,
        left: 1,
        top: 1,
        opacity: 0.1
      },
    },
  }
} // export default
