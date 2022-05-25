import React from "react";
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Scatter } from 'recharts';
import ControlPoint from "./ControlPoint";
import {round} from "./../commons/utils"
/**
 * Компонент, рисует график функции
 */
export default function Plotter({ plot, lineName, extra = [{x: 20, y: 0.75}], tooltip = false }) {
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
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis type="number" dataKey="x" domain={[plot.min - 5, plot.max + 5]} />
                <YAxis type="number" dataKey= "y" domain={[minY(plot.data, 10), maxY(plot.data, 10)]} allowDataOverflow={true}/>
                {tooltip ? (<Tooltip shared="true" />): null}
                <Legend />
                
                



                <Line name={lineName} type="monotone" dataKey="y" stroke="#8884d8"
                    dot={<ControlPoint />}
                />
                { extra.length === 0 ? null :(<Scatter name="dot" dataKey="y" data={extra}/>)}
                
            </ComposedChart>
        </ResponsiveContainer>
    )
}

function minY(plot, percent = 0){
    let min = Math.min(...plot.map(e => e.y));
    min -= min * percent * 0.01;
    return round(min, 2);
}

function maxY(plot, percent = 0){
    let max = Math.max(...plot.map(e => e.y))
    max += max * percent * 0.01;
    return round(max,2);
}