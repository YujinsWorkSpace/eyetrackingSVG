import React, { useState, useEffect } from 'react';
import './index.css'; // You'll need to create this CSS file

function MagnifierWindow() {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    const onMouseMove = (e) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <div
            className="magnifier"
            style={{
                left: `${cursorPos.x}px`,
                top: `${cursorPos.y}px`
            }}
        />
    );
}

export default MagnifierWindow;
