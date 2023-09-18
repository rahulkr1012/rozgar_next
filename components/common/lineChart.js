import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { chartMonthAction, } from '@/action/profilePreviewAction';
import moment from 'moment';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export const options = {
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    stacked: false,
    plugins: {
        title: {
            display: true,
            //   text: 'Chart.js Line Chart - Multi Axis',
        },
    },
    scales: {
        y: {
            type: 'linear',
            display: true,
            position: 'left',
        }
    },
};


export function LineCharts() {
    const labels = [...Array(12).keys()].map((i) => {
        return moment().subtract(i, 'month').format('MMM YYYY')
    })
    const [data, setData] = useState({
        labels: labels,
        datasets: [{
            axis: 'y',
            label: 'Actions',
            data: [],
            fill: false,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.4)',
            borderWidth: 1
        }]
    });

    useEffect(() => {
        chartMonthAction().then((res) => {
            setData({
                ...data,
                datasets: [{
                    ...data.datasets, data: res.result.data, label: 'Actions',
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.4)'
                }]
            })
        }).catch((err) => {
            alert(err)
        })
    }, [])

    return (

        <React.Fragment>

            <Bar data={data} />

        </React.Fragment>
    )
}
