import React from 'react';
import {PolarArea} from 'react-chartjs-2';

const PolarAreaChart = (props) =>{
    return(<PolarArea
        data={
            {
                labels: props.labels,
                datasets: [{
                    label: 'Диаграмма статистики',
                    data: props.value,
                    backgroundColor: [
                        'rgb(93, 165, 161, 0.2)',
                        'rgb(196, 83, 49, 0.2)',
                        'rgb(231, 150, 9, 0.2)',
                        'rgb(246, 232, 74, 0.2)',
                        'rgb(177, 162, 167, 0.2)',
                        'rgb(201, 167, 132, 0.2)',
                        'rgb(140, 121, 81, 0.2)',
                        'rgb(216, 205, 183, 0.2)',
                        'rgb(8, 101, 83, 0.2)',
                        'rgb(247, 216, 123, 0.2)',
                        'rgb(1, 100, 132, 0.2)'
                    ],
                    borderColor: [
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
                    borderWidth: 1,
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

export default PolarAreaChart;