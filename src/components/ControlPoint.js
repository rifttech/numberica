import React from "react";

// кастомная точка на графике, работает по visible=true 
const ControlPoint = (props) => {
    const { cx, cy, /*stroke,*/ payload /*, value*/ } = props;
    if (payload.visible) {
        return (
            <svg x={cx - 4} y={cy - 4} width={8} height={8} fill="white">
                <g transform="translate(4 4)">
                    <circle r="4" fill="black" />
                    <circle r="2" fill="white" />
                </g>
            </svg>
        );
    }

    return null;
};

export default ControlPoint