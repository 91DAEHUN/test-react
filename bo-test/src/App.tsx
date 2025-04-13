import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ariaLabel, PrimeReactProvider } from 'primereact/api';
import { useEffect } from 'react';
import { Button } from 'primereact/button'; 
import { Chart } from 'primereact/chart';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Plugin
} from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
import './App.css';


// Chart.js에 플러그인 등록
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels as Plugin);

function App() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const chartLoadCallbackPlugin = {
    id: 'chartLoadCallbackPlugin',
    afterRender(chart:any) {
      console.log('차트가 로드 완료됨!', chart);
      // ✅ 여기에 원하는 로직 실행 (1회용이면 flag 처리)
    }
  };
  
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
        labels: ['A', 'B', 'C'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    documentStyle.getPropertyValue('--blue-500'), 
                    documentStyle.getPropertyValue('--yellow-500'), 
                    documentStyle.getPropertyValue('--green-500')
                ],
                hoverBackgroundColor: [
                    documentStyle.getPropertyValue('--blue-400'), 
                    documentStyle.getPropertyValue('--yellow-400'), 
                    documentStyle.getPropertyValue('--green-400')
                ],
                datalabels: {
                  color: 'black'
                }
            }
        ]
    };
    const options = {
        cutout: '60%',
        plugins: {
          tooltip: {
            enabled:true,
            external: (context:any) => {
              const tooltipModel = context.tooltip;
              const tooltipEl = document.getElementById('my-custom-tooltip');
      
              if (!tooltipEl || tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = '0';
                return;
              }
      
              const { chart } = context;
              const position = chart.canvas.getBoundingClientRect();
      
              // 예시 데이터: 첫 번째 데이터포인트 사용
              const dataPoint = tooltipModel.dataPoints?.[0];
              if (dataPoint) {
                tooltipEl.innerHTML = `
                  <div><strong>${dataPoint.label}</strong></div>
                  <div>${dataPoint.formattedValue}</div>
                `;
              }
      
              // 툴팁 위치 조정
              tooltipEl.style.opacity = '1';
              tooltipEl.style.top='53%';
              tooltipEl.style.left='50%';
              
              // tooltipEl.style.left = position.left + window.scrollX + tooltipModel.caretX + 'px';
              // tooltipEl.style.top = position.top + window.scrollY + tooltipModel.caretY + 'px';
            }
        },
          datalabels: {
            color: 'black',
            formatter: (value: number, context: any) => `${value}개`,
            anchor: 'center',
            align: 'center'
          }
        }
    };


    setChartData(data);
    setChartOptions(options);
}, []);

  return (
    <>
      <PrimeReactProvider>
        <div className="card flex justify-content-center" style={{width:"400px",position:"relative"}}>
            <Chart type="doughnut" data={chartData} options={chartOptions} plugins={[ChartDataLabels,chartLoadCallbackPlugin]} className="w-full md:w-30rem" />
            <div id="my-custom-tooltip" style={{position:"absolute",top:"50%;",left:"50%;",transform:"translate(-50%,-50%)",display:"flex",alignItems:"center",gap:"4px"}}></div>
        </div>

      </PrimeReactProvider>
    </>
  )
}

export default App
