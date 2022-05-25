import React, { useEffect, useRef, useState } from "react";
import { BuildSpline, Spline } from "./../commons/Spline";
import { parse, round } from "../commons/utils";
import Latex from "react-latex-next";
import Plotter from "../components/Plotter";

// исходные данные задачи
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
    // начальные условия
    const [state, setState] = useState({
        text: initial.data.join("\n"),
        result: [],
        step: 1,
        origin: [],
        eq: "",
        plot: {
            data: [],
            min: -100,
            max: 100
        }
    });

    // Прожимаем кнопку "рассчитать" автоматически при монтировании компонента,
    // чтобы пользователь сразу видел результы работы
    const buttonRef = useRef();
    useEffect(() => buttonRef.current.click(), [])

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
                    <button ref={buttonRef} onClick={(e) => {
                        let r = calculate(state.text, state.step);
                        setState(prev => ({
                            ...prev,
                            plot: { ...prev.plot, data: [...r.plot] },
                            origin: [...r.origin],
                            eq: r.equation
                        }))
                    }}>Рассчитать!</button>
                </div>

            </div>
            <div className="ex2_container__main">
                <div style={{ height: "300px" }}>
                    <Plotter lineName={"Кубический сплайн S(x)"} plot={state.plot} />
                </div>
                <div>
                    <Latex>{state.eq}</Latex>
                </div>
            </div>

        </div>
    </>)
}

// Расчет сплайна
function calculate(text, step) {
    try {
        let data = parse(text);
        let sp = BuildSpline(data);
        // крайнее левое и правое положение сетки
        let left = Number(data[0].x)
        let right = Number(data[data.length - 1].x)
        let dots = data.map(e => Number(e.x));
        let rs = [];

        while (left < right + 0.1) {
            rs.push({ x: left, y: Spline(sp, left), visible: dots.indexOf(left) >= 0 })
            left += step;
        }

        return {
            origin: [...data],
            plot: [...rs],
            equation: buildEquation(sp)
        }

    } catch (err) {
        console.log("При вычислении случилась ошибка", err);
        alert("Увы, что-то пошло не так! Попробуй еще раз.")
    }

}

// вывод формулы сплайна
function buildEquation(sp) {
    let sign = (x, d = "+") => {
        if (x < 0) {
            return '+' + Math.abs(x);
        } else if (x > 0) {
            return '-' + Math.abs(x);
        } else {
            return d;
        }
    }
    let eq = (r) => `${r[0]}x^3 ${sign(r[1])}x^2 ${sign(r[2])}x ${sign(r[3])} ,x\\in\\left[${r[4]},${r[5]}\\right] \\\\`
    let eqs = ""
    for (let i = 0; i < sp.length; i++) {
        eqs += eq(sp[i])
    }

    return `$$
    S(x)=\\begin{cases} 
        ${eqs}
    \\end{cases}
    $$`
}