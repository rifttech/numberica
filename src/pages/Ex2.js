import React, { useState } from "react";
import { Build, Interpolate } from "./../commons/Spline";
import {
    ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine, ReferenceArea,
    ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
    Label, LabelList, Scatter, ScatterChart
} from 'recharts'
const initial = {
    data: [
        "-100;4.06",
        "-75;6.78",
        "-50;9.49",
        "-25;16.27",
        "0;40.67",
        "25;97.62",
        "50;146.63",
        "75;151.85",
        "100;162.7"
    ],
}



export default function Ex2() {
    const [state, setState] = useState({
        text: initial.data.join("\n"),
        result: [],
        step: 10,
    });


    return (<>
        <h1>3. Сплайны</h1>
        <h2>Кубический сплайн</h2>
        <div className="ex3_container">
            <div className="ex3_container__input">
                <p>
                    Исходные данные:
                </p>
                <textarea
                    style={{ width: "200px", height: "300px", fontSize: "20px" }}
                    value={state.text}
                    onChange={(e) => setState(p => ({ ...p, text: e.target.value }))} />

                <div>
                    <button onClick={(e) => {
                        let array = calculate(state.text, state.step);
                        setState(prev => ({ ...prev, result: [...array] }))
                    }
                    }>Расчитать!</button>
                </div>

            </div>
            <div className="ex3_container__main">
                <LineChart
                    width={800}
                    height={600}
                    data={state.result}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                    <XAxis dataKey="x" />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />

                    <Line dot={false} type="monotone" dataKey="y" stroke="#387908" yAxisId={1} />
                </LineChart>
            </div>
        </div>
    </>)

}



function calculate(text, step) {
    try {
        let data = parsedata(text);

        let sp = Build(data);
        // крайнее левое и правое пложение сетки

        let left = Number(data[0].x)
        let right = Number(data[data.length - 1].x)

        let rs = [];

        while (left < right + 0.1) {
            rs.push({ x: left, y: Interpolate(left, sp) })
            left += step;
        }

        return rs;
    } catch (err) {
        console.log("При вычислении случилась ошибка", err);
        alert("Увы, что-то пошло нетак! Попробуй еще раз.")
    }

}


function parsedata(text) {
    return text.split("\n")
        .map(e => {
            let str = e.replace(/\s/g, '');
            let val = str.split(";");
            return { x: val[0], y: val[1] }
        })
}
