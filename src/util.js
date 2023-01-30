import React from 'react';
import numeral from 'numeral';

const casesTypeColors = {
    cases: {
        hex: "#ea4310",
        backGround: "rgba(236, 122, 84, 0.5)",
        multiplier: 30
    },

    recovered: {
        hex: "#7dd71d",
        backGround: "rgba(142, 206, 136, 0.5)",
        multiplier: 25
    },

    deaths: {
        hex: "#cc1034",
        backGround: "rgba(224, 129, 143, 0.5)",
        multiplier: 5
    }
}


export const sortData = (data) => {
    const tempData = [...data];

    tempData.sort((a, b) => {
        if(a.cases > b.cases){
            return -1;
        }
        else {
            return 1;
        }
    })

    return tempData;
}


function customizePushpin(country, casesType="cases") {
    let radius = Math.sqrt(country[casesType]) / casesTypeColors[casesType].multiplier;
    let svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" + 2 * radius + "\" height=\"" + 2 * radius + "\">\n        <circle cx=\"" + radius + "\" cy=\"" + radius + "\" r=\"" + (radius - 2) + "\" stroke=\"" + casesTypeColors[casesType].hex + "\" stroke-width=\"" + 2 + "\" fill=\"" + casesTypeColors[casesType].backGround + "\"/></svg>";
    return svg;
}


export const drawCircle = (data, casesType) => data.map((country) => (
    {
        "location": [country.countryInfo.lat, country.countryInfo.long], 
        "addHandler":"mouseover", //on mouseover the pushpin, infobox shown
        "infoboxOption": { 
            showPointer: false, 
            showCloseButton: false , 
            description: '<div class="info__container">' + 
                            '<div class="info__flag" style="background-image: url(' + country.countryInfo.flag + ')"/>' + 
                            '<br><br><br><br><br><br>'+
                            '<div class="info__name">' + country.country + '</div>' + 
                            '<div class="info__cases">Cases: ' +  numeral(country.cases).format("0,0") + '</div>' +
                            '<div class="info__deaths">Deaths: ' + numeral(country.deadths).format("0,0") + '</div>' +
                            '<div class="info__recovered">Recovered: ' + numeral(country.recovered).format("0,0") + '</div>' + 
                         '</div>'
        },
        "pushPinOption": {icon: customizePushpin(country, casesType)},
    }
))




