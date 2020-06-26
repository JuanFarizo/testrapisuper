export default {
  analyticsData: [
    { 'customerType': 'Efectivo', 'counts': 890, color: 'success' },
    { 'customerType': 'Tarjeta', 'counts': 258, color: 'danger' },
    { 'customerType': 'Mercadopago', 'counts': 149, color: 'primary' },
    { 'customerType': 'QR', 'counts': 349, color: 'warning' },
  ],
  series: [690, 258, 149, 349],
  chartOptions: {
    labels: ['Efectivo', 'Tarjeta', 'Mercadopago', 'QR'],
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
    colors: ['#5ECA8E', '#f29292', '#45B3E3', '#FFC085'],
    fill: {
      type: 'gradient',
      gradient: {
        gradientToColors: ['#28C76F', '#EA5455', '#009EE3', '#FF9F43']
      }
    }
  }
} // export default
