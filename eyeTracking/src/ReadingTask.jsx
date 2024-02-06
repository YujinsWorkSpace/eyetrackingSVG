import React, {useRef} from "react";
import BarChart from "./barchart.svg?react"
import useWindowMirror from "./useWindowMirror.js";

function ReadingTask({svgSize }) {
    // const mainRef = useRef(null);
    // const mirrorRef = useRef(null);

    // useWindowMirror(true);

    return (
        <div className='font'>

            {<BarChart style={{width: `${svgSize}%`, height: `${svgSize}%`}}/>}
        </div>
    );
};

export default ReadingTask;