//** React Imports */
import { useState,  useEffect } from "react";

//** SVG Imports */
import KoreaMap from 'public/images/wide_areas/korea_subdivision.svg'

//** Styles */
import { lightGreen, red } from '@mui/material/colors';

const KoreaMapComponent = props => {

    // ** Props
    const { title, color1, color2, Hcolor, icon, stats, trend, trendNumber } = props

    return(
        <KoreaMap   
            sx ={{
                'path': {
                    fill: '#1da1f2',
                    ':hover': {
                        fill: {Hcolor},
                        stroke: {Hcolor},
                        strokeWidth: '3px',
                        transition: 'fill 0.4s'
                    }
                }
            }}
            color={color1}
            width={'500'}  
            arial-label="대한민국 지도"
        />
    );
};

export default KoreaMapComponent;

KoreaMapComponent.defaultProps = {
    color1: lightGreen['800'],
    color2: lightGreen['200'],
    Hcolor: red
}