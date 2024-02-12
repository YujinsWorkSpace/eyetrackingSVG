import React, { useState, useRef } from 'react';
import OriginalSVG from './OriginalSVG.jsx';
import DuplicatedSVG from './DuplicatedSVG.jsx';

const BarchartSVG = () => {
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

    return (
        <div
            ref={svgRef}
            onMouseMove={handleMouseMove}
            style={{ position: 'relative', width: '700px', height: '580px' }}
        >
            <OriginalSVG />
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    clipPath: `circle(100px at ${cursorPos.x}px ${cursorPos.y}px)`,
                    pointerEvents: 'none',
                }}
            >
                <DuplicatedSVG cursorPos={cursorPos} />
            </div>
        </div>
    );
};

export default BarchartSVG;
