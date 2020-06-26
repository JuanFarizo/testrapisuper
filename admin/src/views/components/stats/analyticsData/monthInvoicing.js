export default {
  series: [{
    name: "Este mes",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
  },
  {
    name: "Mes anterior",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
  }],
  chartOptions: {
    chart: {
      toolbar: { show: false },
    },
    stroke: {
      curve: 'smooth',
      dashArray: [0, 8],
      width: [4, 2],
    },
    grid: {
      borderColor: '#e7e7e7',
    },
    legend: {
      show: false,
    },
    colors: ['#F97794', '#b8c2cc'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        inverseColors: false,
        gradientToColors: ['#15B0CE', '#b8c2cc'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
      },
    },
    markers: {
      size: 0,
      hover: {
        size: 5
      }
    },
    xaxis: {
      labels: {
        style: {
          cssClass: 'text-grey fill-current',
        }
      },
      axisTicks: {
        show: false,
      },
      categories: [
        '01','02','03','04','05','06','07','08','09','10',
        '11','12','13','14','15','16','17','18','19','20',
        '21','22','23','24','25','26','27','28','29','30',
        '31',
      ],
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        style: {
          cssClass: 'text-grey fill-current',
        },
        formatter: function(val) {
          return val > 999 ? (val / 1000).toFixed(1) + 'k' : val;
        }
      }
    },
    tooltip: {
      x: { show: false }
    }
  }
}
