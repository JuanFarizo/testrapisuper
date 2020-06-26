export default {
  // Diary Sales
  selectedDate: 0,
  analyticsData: [
    { paymentType: 'Efectivo',      counts: 30, color: 'success' },
    { paymentType: 'Tarjeta local', counts: 20, color: 'primary' },
    { paymentType: 'Otras tarjetas',   counts: 10, color: 'danger' },
  ],
  series: [30, 20, 10],
  chartOptions: {
    labels: ['Efectivo', 'Tarjeta local', 'Otras tarjetas'],
    dataLabels: {
      enabled: false
    },
    legend: { show: false },
    chart: {
      type: 'pie',
      offsetY: 0,
      dropShadow: {
        enabled: false,
        blur: 5,
        left: 1,
        top: 1,
        opacity: 0.2
      },
      toolbar: {
        show: false
      }
    },
    stroke: {
      width: 5
    },
    colors: ['#5ECA8E', '#45B3E3', '#f29292', '#FFC085'],
    fill: {
      type: 'gradient',
      gradient: {
        gradientToColors: ['#28C76F', '#009EE3', '#EA5455', '#FF9F43']
      }
    }
  }
} // export default
