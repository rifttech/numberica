import React, { useState } from "react";
import { derrive } from "../commons/FiniteDifference";
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
    const [state, setState] = useState({
        text: initial.data.join("\n"),
        result: []
    });


    return (<>
        <h1>3. Численное дифференцирование</h1>
        <h2>Формулы конечных разностей</h2>
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
                        let array = calculate(state.text);
                        setState(prev => ({ ...prev, result: [...array] }))
                    }
                    }>Расчитать производные!</button>
                </div>

            </div>
            <div className="ex3_container__main">
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
        </div>
    </>)

}


function calculate(text) {
    const roundTo = (number, digits) => {
        let d = Math.pow(10, digits);
        return Math.round((number + Number.EPSILON) * d) / d
    }


    try {
        let data = parsedata(text);
        let rs = [];
        for (let i = 0; i < data.length; i++) {
            let fx = derrive(data, i);
            rs.push({ x: data[i].x, y: data[i].y, fx: roundTo(fx, 6) })
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
