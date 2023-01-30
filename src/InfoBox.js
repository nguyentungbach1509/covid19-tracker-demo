import React, {Component} from 'react';
import './InfoBox.css';
import { Card, CardContent, Typography} from '@material-ui/core';

const casesTypeColors = {
    cases: {
        hex: "#ea4310",
        
    },

    recovered: {
        hex: "#7dd71d",
        
    },

    deaths: {
        hex: "#cc1034",
        
    }
}

class InfoBox extends Component {

    constructor(props){
        super(props);

    }


    render(){
        return(
            <Card onClick={this.props.onClick} className={`inforbox ${this.props.active && `inforboxSelected__${this.props.casesType}`}`}>
                <CardContent className="inforbox__content">
                    <Typography  className="inforbox__title" color="textSecondary">{this.props.title}</Typography>

                    <h2 className={`inforbox__cases ${(this.props.title !== "Cases") && `${this.props.title}`}`}>{this.props.cases}</h2>


                    <Typography className="inforbox__total" color="textSecondary">
                        Total: {this.props.total}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}


export default InfoBox;