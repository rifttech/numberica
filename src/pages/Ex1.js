import React, { useState } from "react";
import { find } from "../commons/DifferenceTable";
import { round } from "../commons/GaussianQuadrature"
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
        value: 23
    });

    return (<>
        <h1>1. Интерполяция</h1>
        <h2>Метод разделенных разностей</h2>
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
                    <label>
                        f(
                        <input type='text' value={state.value} onChange={e => setState(p => ({ ...p, value: e.target.value }))} />
                        ) = {state.result === undefined ? "<не расчитано>" : round(state.result, 5)}
                    </label>
                </div>
                <div>
                    <button onClick={(e) => {
                        let array = calculate(state.text, state.value);
                        setState(prev => ({ ...prev, result: array }))
                    }
                    }>Расчитать!</button>
                </div>

            </div>
            <div className="ex3_container__main">

            </div>
        </div>
    </>)
}
function calculate(text, v) {

    try {
        let data = parsedata(text);
        let y = find(v, data)
        return y;
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
