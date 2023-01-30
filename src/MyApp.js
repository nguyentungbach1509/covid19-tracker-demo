import React, {Component} from 'react';
import './MyApp.css';
import { MenuItem, FormControl, Select, Card, CardContent} from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import {sortData} from './util';
import LineGrap from './LineGrap';
import "leaflet/dist/leaflet.css";
import numeral from 'numeral';

class MyApp extends Component {

    constructor(props){
        super(props);

        this.state = {
            countries: [],
            country: "worldwide",
            countryInfo: {},
            tableData: [],
            mapCenter: [
                51.505,
                -0.09
            ],
            mapZoom: 3,
            mapCountries: [],
            casesType: "cases"
        }

    }


    componentDidMount() {
        fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then((data) => {
            const countries = data.map((country) => ({
                name: country.country,
                value: country.countryInfo.iso2
            }));

            this.setState({
                countries: countries,
                tableData: sortData(data),
                mapCountries: data
            })
        })

        fetch('https://disease.sh/v3/covid-19/all')
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                countryInfo: data
            })
        })
    }


    onCountryChange = (event) => {
        const countryCode = event.target.value

        const url = countryCode === "worldwide" ? 
        "https://disease.sh/v3/covid-19/all" : 
        `https://disease.sh/v3/covid-19/countries/${countryCode}`;


        fetch(url)
        .then(response => response.json())
        .then((data) => {
            this.setState({
                country: countryCode,
                countryInfo: data,
                mapCenter: [data.countryInfo.lat, data.countryInfo.long],
                mapZoom: 4
            })
        })
    }

    changeStat = (stat) => {
        if(stat) {
            return "+" + numeral(stat).format("0.0a");
        }
        else {
            return "+0";
        }
    }

    render() {
        return(
            <div className="app">
                <div className="app__left">
                    <div className="app__header">
                        <h1>COVID-19 TRACKER</h1>
                        <FormControl variant="outlined"  className="app__dropdown">
                            <Select native value={this.state.country} onChange={this.onCountryChange.bind(this)}>
                                <option value="worldwide">Worldwide</option>
                                {this.state.countries.map((country, i) => (
                                    <option key={i} value={country.value}>{country.name}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <div className="app__stats">
                        <InfoBox 
                            active={this.state.casesType === "cases"}
                            casesType={this.state.casesType}
                            onClick={(event) => this.setState({casesType:"cases"})}
                            title="Coronavirus Cases"
                            cases={this.changeStat(this.state.countryInfo.todayCases)} 
                            total={this.changeStat(this.state.countryInfo.cases)}
                        />
                        <InfoBox 
                            active={this.state.casesType === "deaths"}
                            casesType={this.state.casesType}
                            onClick={(event) => this.setState({casesType:"deaths"})}
                            title="Deaths"
                            cases={this.changeStat(this.state.countryInfo.todayDeaths)} 
                            total={this.changeStat(this.state.countryInfo.deaths)}
                        />
                        <InfoBox
                            active={this.state.casesType === "recovered"}
                            casesType={this.state.casesType}
                            onClick={(event) => this.setState({casesType:"recovered"})} 
                            title="Recovered"
                            cases={this.changeStat(this.state.countryInfo.todayRecovered)} 
                            total={this.changeStat(this.state.countryInfo.recovered)}
                        />
                    </div>

                    <Map casesType={this.state.casesType} center={this.state.mapCenter} zoom={this.state.mapZoom} countries={this.state.mapCountries}/>

                </div>

                <Card className="app__right">
                    <CardContent>
                        <h3>Live Cases by countries</h3>
                        
                        <Table countries={this.state.tableData}/>
                        
                        <h3>Worldwide new {this.state.casesType}</h3>
                        <LineGrap casesType={this.state.casesType}/>
                    </CardContent>
                </Card>
            </div>
        )
    }
}




export default MyApp;