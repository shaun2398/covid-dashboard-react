import React from 'react'
import { Line } from 'react-chartjs-2'

function LineChart({infected, deceased, recoveries}) {

    return (
        <div>
        <Line 
        data={{
            labels: Object.keys(infected),
            datasets: [{
                label: 'Infected Last 30 Days',
                data: Object.values(infected),
                backgroundColor: 'red',
                borderColor: 'red',
                borderWidth: 1
            },
            {
                label: 'Recoveries Last 30 Days',
                data: Object.values(recoveries),
                backgroundColor: 'green',
                borderColor: 'green',
                borderWidth: 1
            },
            {
                label: 'Deaths Last 30 Days',
                data: Object.values(deceased),
                backgroundColor: 'gray',
                borderColor: 'gray',
                borderWidth: 1
            }
        ]
        }}
        width={150}
        height={200}
        options={{mainAspectRatio: false}}/>
        </div>
    )
}

export default LineChart
