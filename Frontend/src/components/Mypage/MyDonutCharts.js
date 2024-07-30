import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from "../../axios";

// Chart.js의 요소를 등록합니다.
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const MyDonutCharts = () => {

  const [dataMoney, setDataMoney] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  let mem_id = window.sessionStorage.getItem('mem_id');

  useEffect(() => {
    axios
      .post(`/Money/${mem_id}`)
      .then((res) => {
        if (res.data.MyMoney) {
          const formattedEvents = res.data.MyMoney.reduce((acc, item) => {
            const { category_name, moneys_amount } = item;
            if (acc[category_name]) {
              acc[category_name] += moneys_amount;
            } else {
              acc[category_name] = moneys_amount;
            }
            return acc;
          }, {});

          const formattedData = Object.keys(formattedEvents).map(category_name => ({
            title: category_name,
            price: formattedEvents[category_name]
          }));

          setDataMoney(formattedData);
          console.log('성공');
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("fetching 에러입니다:", error);
        setError(error);
        setIsLoading(false);
      });
  }, [mem_id]);

  // 총 금액 계산
  const totalAmount = dataMoney.reduce((acc, item) => acc + item.price, 0);

  const data = {
    labels: dataMoney.map(item => item.title || '기타'),
    datasets: [
      {
        label: '금액',
        data: dataMoney.map(item => item.price || 0),
        backgroundColor: [
          '#667BC6',
          '#FDFFD2',
          '#FFB4C2',
          '#55AD9B',
        ],
        hoverBackgroundColor: [
          '#667BC6',
          '#FDFFD2',
          '#FFB4C2',
          '#55AD9B',
        ],
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          const percentage = ((value / totalAmount) * 100).toFixed(2) + '%';
          return percentage;
        },
        color: '#000',
        font: {
          weight: 'bold',
          size : 20,
        },
        anchor: 'end',
        align: 'start',
        offset: 30,
      },
    },
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <br /><br />
      <Doughnut data={data} options={options}/>
    </div>
  );
};

export default MyDonutCharts;
