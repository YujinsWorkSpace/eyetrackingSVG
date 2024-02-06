import React from 'react';
import ReactImageMagnify from 'react-image-magnify';
import BarChart from "./barchart.svg?react"

const WindowMagnifier = () => {
    return (
        <ReactImageMagnify {...{
            smallImage: {
                alt: 'Wristwatch by Ted Baker London',
                isFluidWidth: true,
                src: <BarChart style={innerWidth}/>
            },
            largeImage: {
                src: <BarChart/>,
                width: 100,
                height: 100
            }
        }} />
    );
}

export default WindowMagnifier;
