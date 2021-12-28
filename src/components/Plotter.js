import React from "react";
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ControlPoint from "./ControlPoint";

/**
 * Компонент, рисует график функции
 */
export default function Plotter({ plot, lineName }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
                width={500}
                height={300}
                data={plot.data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" domain={[plot.min - 5, plot.max + 5]} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line name={lineName} type="monotone" dataKey="y" stroke="#8884d8"
                    dot={<ControlPoint />}
                />
            </ComposedChart>
        </ResponsiveContainer>
    )
}