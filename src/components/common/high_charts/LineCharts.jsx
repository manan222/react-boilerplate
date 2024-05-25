import React from "react";
import HightCharts from "highcharts";
import HighChartsReact from 'highcharts-react-official';
import drilldown from 'highcharts/modules/drilldown';

drilldown(HightCharts)

const options ={
    title: {
        text: 'My chart'
    },
    series: [{
        type: 'line',
        data: [1, 2, 3]
    }]
    }


const LineCharts=()=>{
    return (
        <div>
            <HighChartsReact highcharts={HightCharts} options={options} />
        </div>
    )
}

export default LineCharts;