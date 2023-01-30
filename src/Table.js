import React, {Component} from 'react';
import './Table.css';
import { Card, CardContent, Typography} from '@material-ui/core';
import numeral from 'numeral';


class Table extends Component {

    constructor(props){

        super(props);

    }



    render() {
        return(
            <div className="table">
                {this.props.countries.map((country, i) => (
                    <tr key={i}>
                        <td>{country.country}</td>
                        <td>
                            <strong>{numeral(country.cases).format("0,0")}</strong>
                        </td>
                    </tr>
                ))}
            </div>
        )
    }
}


export default Table;