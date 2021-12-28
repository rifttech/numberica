import React, { useState, useRef, useEffect } from "react";
import { derrive } from "../commons/FiniteDifference";
import ControlPoint from "../components/ControlPoint";
import { round, parse } from "../commons/utils";
import { interpolate } from "../commons/LagrangeInterpolation"
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Latex from "react-latex-next";

//исходные данные задачи
const initial = {
    data: [
        "0;0",
        "5.01;0.18",
        "10.09;1.05",
        "13.98;1.73",
        "16.62;2.35",
        "18.01;2.96",
        "22.53;3.76",
        "25.33;4.48",
        "28.03;5.28",
        "30.42;6.12",
        "32.06;7.09",
        "33.62;8"
    ],
}

export default function Ex3() {
    //изначальное состояние
    const [state, setState] = useState({
        text: initial.data.join("\n"),
        result: [],
        plot: {
            data: [],
            min: 10,
            max: 90
        }
    });

    // Прожимаем кнопку "рассчитать" автоматически при монтировании компонента,
    // чтобы пользователь сразу видел результы работы
    const buttonRef = useRef();
    useEffect(() => buttonRef.current.click(), []);

    //рендер
    return (<>
        <h1>3. Численное дифференцирование</h1>
        <h2>Формулы конечных разностей</h2>
        <Latex>{` Общая формула: $$ {P}'(x)= \\frac{2x - x_1 - x_2} {(x_0-x_1)(x_0-x_2)}y_0 + \\frac{2x - x_0 - x_2}   {(x_1-x_0)(x_1-x_2)}y_1 + \\frac{2x - x_0 - x_1}   {(x_2-x_0)(x_2-x_2)}y_2$$`}</Latex>
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
                    <button ref={buttonRef} onClick={(evt) => {
                        try {
                            let array = calculate(state.text);
                            // зная табличные значения, интерполируем разностями
                            let dots = array.map(e => Number(e.x));
                            // функция
                            let xy = array.map(e => ({ x: e.x, y: e.y }));
                            // производные
                            let dy = array.map(e => ({ x: e.x, y: e.fx }));

                            let it = 0;
                            let plot = [];
                            for (let i = 0; i < array.length - 1; i++) {
                                let step = Math.abs(array[i].x - array[i + 1].x) / 5;
                                let left = array[i].x;
                                let right = array[i + 1].x;
                                while (left < right + step || it > 10000) {
                                    let rl = round(left, 3)
                                    plot.push({ x: rl, y: interpolate(rl, xy), fx: interpolate(rl, dy), visible: dots.indexOf(rl) >= 0 });
                                    left += step;
                                    it++;
                                }
                            }

                            setState(prev => ({
                                ...prev, result: [...array], plot: {
                                    data: [...plot],
                                    min: dots[0],
                                    max: dots[dots.length]
                                }
                            }))
                        } catch (err) {
                            console.log("При вычислении случилась ошибка", err);
                            alert("Увы, что-то пошло не так! Попробуй еще раз.")
                        }
                    }
                    }>Рассчитать производные!</button>
                </div>

            </div>
            <div className="ex3_container__main" style={{ display: "flex", flexDirection: "row" }}>
                <div>
                    {/* Вывод таблицы с производными */}
                    <table>
                        <tbody>
                            <tr>
                                <td>X</td>
                                <td>Y</td>
                                <td>f`(x)</td>
                            </tr>
                            {
                                state.result.map((e, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{e.x}</td>
                                            <td>{e.y}</td>
                                            <td>{e.fx}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                {/* график */}
                <ResponsiveContainer width="80%" height="50%">
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
                        <XAxis type="number" dataKey="x" domain={[Math.ceil(state.plot.min) - 5, Math.ceil(state.plot.max + 5)]} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {/* оригинальная функция */}
                        <Line name="f(x)" type="monotone" dataKey="y" stroke="#8884d8"
                            dot={<ControlPoint />}
                        />
                        {/* производная функции*/}
                        <Line name="f`(x)" type="monotone" dataKey="fx" stroke="#ff7300"
                            dot={<ControlPoint />}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    </>)

}

/**
 * Расчет производных
 */
function calculate(text) {
    let data = parse(text);
    let rs = [];
    for (let i = 0; i < data.length; i++) {
        // находим производную отностительно 3 контрольных точек
        // и записываем в массив
        let fx = derrive(data, i);
        rs.push({ x: data[i].x, y: data[i].y, fx: round(fx, 6) })
    }
    return rs;
}