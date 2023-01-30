import React, {Component} from 'react';
import './LineGrap.css';
import { Card, CardContent, Typography} from '@material-ui/core';
import {Line} from 'react-chartjs-2';
import numeral from 'numeral';

//https://disease.sh/v3/covid-19/historical/all?lastdays=120

const options = {
    legend: {
        display: false,
    },

    elements: {
        point: {
            radius: 0,

        },
    },

    maintainAspectRatio: false,

    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll"
                }
            }
        ],

        yAxes: [{
            gridLine: {
                display: false,
            },

            ticks: {
                callbacks: function(value, index, values) {
                    return numeral(value).format("0a");
                }
            }
        }]
    },


    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function(tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
}


const casesTypeColors = {
    cases: {
        hex: "#ea4310",
        backGround: "rgba(236, 122, 84, 0.5)",
        
    },

    recovered: {
        hex: "#7dd71d",
        backGround: "rgba(142, 206, 136, 0.5)",
        
    },

    deaths: {
        hex: "#cc1034",
        backGround: "rgba(224, 129, 143, 0.5)",
        
    }
}


class LineGrap extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: {},
        }
    }




    componentDidMount() {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(response => response.json())
        .then((data) => {
           const chartData = this.buildChart(data, this.props.casesType);
           this.setState({
               data: chartData
           })
        })
    }


    componentDidUpdate(prevProps, prevState) {
        if(prevProps.casesType !== this.props.casesType){
            fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(response => response.json())
            .then((data) => {
               const chartData = this.buildChart(data, this.props.casesType);
               this.setState({
                   data: chartData
               })
            }) 
        }
       
    }



    buildChart(data, casesType) {
        const chartData = [];
        let lastDataPoint;
        console.log(casesType)
        for(let date in data.cases) {
            if(lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }

                chartData.push(newDataPoint);
            }

            lastDataPoint = data[casesType][date];
        }

        
        return chartData;
    }


    render() {
        return(
            <div>
                {this.state.data?.length > 0 && (
                    <Line 
                        options={options}
                        data = {{
                            datasets: [{
                                backgroundColor: casesTypeColors[this.props.casesType].backGround,
                                borderColor: casesTypeColors[this.props.casesType].hex,
                                data: this.state.data
                            }]
                        }}
                    />
                )}
               
            </div>
        )
    }
}


export default LineGrap;