import React, { useState } from "react";
import { Build, Interpolate } from "./../commons/Spline";
import { parse } from "../commons/utils";
import ControlPoint from "../components/ControlPoint";
import { LineChart, ComposedChart, Scatter, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { round } from "../commons/GaussianQuadrature";
import Latex from "react-latex-next";
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
        step: 1,
        origin: [],
        eq: "",
        plot: {
            min: -100,
            max: 100
        }
    });


    return (<>
        <h1>3. Сплайны</h1>
        <h2>Кубический сплайн</h2>
        <div className="ex2_container">
            <div className="ex2_container__input">
                <p>Исходные данные:</p>
                <textarea
                    style={{ width: "200px", height: "300px", fontSize: "20px" }}
                    value={state.text}
                    onChange={(e) => setState(p => ({ ...p, text: e.target.value }))} />

                <div>
                    <button onClick={(e) => {
                        let r = calculate(state.text, state.step);
                        setState(prev => ({ ...prev, result: [...r.plot], origin: [...r.origin], eq: r.equation }))
                    }}>Расчитать!</button>
                </div>

            </div>
            <div className="ex2_container__main">
                <div style={{ height: "300px" }}>
                    <ResponsiveContainer width="80%">
                        <ComposedChart
                            width={500}
                            height={300}
                            data={state.result}
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
                            <Line name="Кубический сплайн S(x)" type="monotone" dataKey="y" stroke="#8884d8"
                                dot={<ControlPoint />}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
                <div>
                    <Latex>{state.eq}</Latex>
                </div>

            </div>

        </div>
    </>)

}



function calculate(text, step) {
    try {
        let data = parse(text);
        let sp = Build(data);
        // крайнее левое и правое пложение сетки
        console.log(sp)
        let left = Number(data[0].x)
        let right = Number(data[data.length - 1].x)
        let dots = data.map(e => Number(e.x));
        let rs = [];

        while (left < right + 0.1) {
            rs.push({ x: left, y: Interpolate(left, sp), visible: dots.indexOf(left) >= 0 })
            left += step;
        }

        return {
            origin: [...data],
            plot: [...rs],
            equation: buildEquation(sp)
        }

    } catch (err) {
        console.log("При вычислении случилась ошибка", err);
        alert("Увы, что-то пошло нетак! Попробуй еще раз.")
    }

}


function buildEquation(sp) {
    let sign = (x, d) => {
        if (x < 0 || d) {
            return '+' + Math.abs(x);
        } else if (x > 0) {
            return '-' + Math.abs(x);
        } else {
            return "";
        }
    }
    let eq = ({ a, b, c, d, x }, x1) => `${round(a, 5)}${sign(round(b, 5), '+')}\\left(x${sign(x)}\\right)${sign(round(c / 2, 5), '+')}\\left(x${sign(x)}\\right)^2${sign(round(d / 6, 5), '+')}\\left(x${sign(x)}\\right)^3,x\\in\\left[${x},${x1}\\right] \\\\  `;

    let eqs = ""
    for (let i = 0; i < sp.length - 1; i++) {
        eqs += eq(sp[i], sp[i + 1].x)
    }

    return `$$
    S(x)=\\begin{cases} 
        ${eqs}
    \\end{cases}
    $$`
}