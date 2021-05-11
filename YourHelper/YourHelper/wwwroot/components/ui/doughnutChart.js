import React from 'react';
import {Doughnut} from 'react-chartjs-2';

const DoughnutChart = (props) =>{
    return(<Doughnut
        data={
            {
                labels: props.labels,
                datasets: [{
                    label: 'My First Dataset',
                    data: props.value,
                    backgroundColor: [
                        'rgb(93, 165, 161)',
                        'rgb(196, 83, 49)',
                        'rgb(231, 150, 9)',
                        'rgb(246, 232, 74)',
                        'rgb(177, 162, 167)',
                        'rgb(201, 167, 132)',
                        'rgb(140, 121, 81)',
                        'rgb(216, 205, 183)',
                        'rgb(8, 101, 83)',
                        'rgb(247, 216, 123)',
                        'rgb(1, 100, 132)'
                    ],
                    hoverOffset: 4
                }]
            }
        }
        options={
            
            {
                maintainAspectRatio: false,
            }
        }
    />)
}

export default DoughnutChart;