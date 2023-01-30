import React, {Component} from 'react';
import './Map.css';
import { Card, CardContent, Typography} from '@material-ui/core';
import {MapContainer, TileLayer} from 'react-leaflet';
import {drawCircle} from './util';
import { ReactBingmaps } from 'react-bingmaps';

class Map extends Component {

    constructor(props){
        super(props);
    }
    
    //AmUi_XQx8xdjQc39zqIDpTiEo83iKxznFs_WabbidhRc1ZLvQYJPYorz2C4TfBXd
    
    render() {
        return(
            <div className="map">
                <ReactBingmaps 
                    mapTypeId={"grayscale"}
                    style={{height:"100%", width:"100%"}}  
                    center = {this.props.center} 
                    zoom = {this.props.zoom} 
                    bingmapKey="AmUi_XQx8xdjQc39zqIDpTiEo83iKxznFs_WabbidhRc1ZLvQYJPYorz2C4TfBXd"
                    infoboxesWithPushPins = {drawCircle(this.props.countries, this.props.casesType)}
                >
                </ReactBingmaps>
            </div>
            
        )
    }
    
}



export default Map;