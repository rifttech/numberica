import React, { useState } from "react";
import { find } from "../commons/DifferenceTable";
import { round } from "../commons/GaussianQuadrature";
import { parse } from "../commons/utils";
import DataInput from "../components/DataInput";
import ControlPoint from "../components/ControlPoint";
import { LineChart, ComposedChart, Scatter, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const initial = {
    data: [
        "10;0.17365",
        "20;0.34202",
        "30;0.5",
        "40;0.64279",
        "50;0.76604",
        "60;0.86603"
    ],
    value: 23
}

export default function Ex1() {
    const [state, setState] = useState({
        text: initial.data.join("\n"),
        result: undefined,
        value: 23,
        plot: {
            data: [],
            step: 100,
            origin: [],
            min: 0,
            max: 70
        }
    });

    return (<>
        <h1>1. Интерполяция</h1>
        <h2>Метод разделенных разностей</h2>
        <div className="ex3_container">
            <div className="ex3_container__input">
                <p>
                    Исходные данные:
                </p>
                <DataInput text={state.text} onChange={(e) => setState(p => ({ ...p, text: e.target.value }))} />
                <div>
                    <label>
                        f(
                        <input type='text' value={state.value} onChange={e => setState(p => ({ ...p, value: e.target.value }))} />
                        ) = {state.result === undefined ? "<не расчитано>" : round(state.result, 5)}
                    </label>
                </div>
                <div>
                    <button onClick={(e) => {
                        let data = parse(state.text);
                        let array = calculate(data, state.value);
                        let plot = []
                        let it = 0;
                        let dots = data.map(e => Number(e.x)) || [];

                        // расширяем сегрметы точками,
                        // ибо надо отображать контрольные точки и они должны входить в тот же дата сет

                        for (let i = 0; i < dots.length - 1; i++) {
                            let step = Math.abs(dots[i] - dots[i + 1]) / 10;
                            let left = dots[i];
                            let right = dots[i + 1];
                            while (left < right + step || it > 10000) {
                                plot.push({ x: left, y: calculate(data, left), visible: dots.indexOf(left) >= 0 });
                                left += step;
                                it++;
                            }
                        }

                        setState(prev => ({
                            ...prev, result: array, plot: {
                                data: [...plot],
                                step: 100,
                                min: dots[0],
                                max: dots[dots.length - 1],
                                origin: dots
                            }
                        }))
                    }
                    }>Расчитать!</button>
                </div>

            </div>
            <div className="ex3_container__main">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        width={500}
                        height={300}
                        data={state.plot.data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="x" domain={[state.plot.min - 5, state.plot.max + 5]} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line name="Итерполянта f(x)" type="monotone" dataKey="y" stroke="#8884d8"
                            dot={<ControlPoint />}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    </>)
}
function calculate(data, v) {
    try {

        let y = find(v, data)
        return y;
    } catch (err) {
        console.log("При вычислении случилась ошибка", err);
        alert("Увы, что-то пошло нетак! Попробуй еще раз.")
    }

}


