import React, { useState, useRef } from 'react';
import OriginalSVG from './OriginalSVG.jsx';
import DuplicatedSVG from './DuplicatedSVG.jsx';

const BarchartSVG = ({ svgSize, windowOn }) => {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const svgRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!svgRef.current) return;
        const { left, top } = svgRef.current.getBoundingClientRect();
        setCursorPos({
            x: event.clientX - left,
            y: event.clientY - top,
        });
    };

    // Convert svgSize to a scale factor; assuming svgSize 100 is normal (1x scale)
    const scale = svgSize / 100;

    // Keep the dimensions and position constants for the clipping, but scale the duplicated SVG
    const rectWidth = 500; // Fixed width for clipping area
    const rectHeight = 250; // Fixed height for clipping area

    // Calculate the inset values for the clipping area
    const insetTop = cursorPos.y - rectHeight / 2;
    const insetRight = svgRef.current ? svgRef.current.offsetWidth - cursorPos.x - rectWidth / 2 : 0;
    const insetBottom = svgRef.current ? svgRef.current.offsetHeight - cursorPos.y - rectHeight / 2 : 0;
    const insetLeft = cursorPos.x - rectWidth / 2;

    return (
        <div
            ref={svgRef}
            onMouseMove={handleMouseMove}
            style={{ position: 'relative' }}
        >
            <OriginalSVG style={{ width: `${svgSize}%`, height: `${svgSize}%`}} />
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    clipPath: `inset(${insetTop}px ${insetRight}px ${insetBottom}px ${insetLeft}px)`,
                    pointerEvents: 'none',
                }}
            >
                {/* Apply the scaling directly to the DuplicatedSVG container */}
                {windowOn && 
                    (
                        <div
                            style={{
                                transform: `scale(${scale})`,
                                transformOrigin: 'center center', // This might need adjustment
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                overflow: "hidden",
                            }}
                        >
                            <DuplicatedSVG cursorPos={cursorPos} />
                        </div>
                    )
                }
                
            </div>
        </div>
    );
};

export default BarchartSVG;
