import React from 'react';
import ReactApexChart from 'react-apexcharts';

const MyDonutCharts = () => {
  // 차트의 데이터와 옵션 설정
  const chartOptions = {
    chart: {
      type: 'donut',
    },
    legend: {
      show: false,
    },
    labels: ['웨딩홀', '스듀디오', '드레스', '메이크업'],
    series: [200,150,300,250],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    tooltip: {
      enabled: true, // 툴팁 활성화
      y: {
        formatter: function(value) {
          return value + ' 개'; // 툴팁에 표시될 값의 포맷 설정
        }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              formatter: function(seriesName) {
                return seriesName; // 라벨 이름을 반환하여 중앙에 표시
              }
            },
            value: {
              show: true,
              formatter: function(val) {
                if (typeof val === 'number') {
                  return val.toFixed(1) + ' 개'; // 중앙 값에 표시될 포맷 설정
                }
                return val;
              }
            }
          }
        }
      }
    }
  };

  return (
    <div className="donut-chart">
      <ReactApexChart options={chartOptions} series={chartOptions.series} type="donut" height={650} />
    </div>
  );
};

export default MyDonutCharts;
