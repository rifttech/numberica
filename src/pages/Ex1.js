import React, { useEffect, useRef, useState } from "react";
import DifferenceTable, { interpolate } from "../commons/DifferenceTable";
import { parse, round } from "../commons/utils";
import DataInput from "../components/DataInput";
import Plotter from "../components/Plotter";
import Latex from "react-latex-next";

//Данные по умолчанию
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
    //начальное состояние компонента
    const [state, setState] = useState({
        text: initial.data.join("\n"),
        result: undefined,
        value: initial.value,
        table: [],
        plot: {
            data: [],
            step: 100,
            origin: [],
            min: 0,
            max: 70
        }
    });

    // Прожимаем кнопку "расчитать" автоматически при монтировании компонента,
    // чтобы пользователь сразу видел результы работы
    const buttonRef = useRef();
    useEffect(() => buttonRef.current.click(), []);

    // рендер страницы
    return (<>
        <h1>1. Интерполяция</h1>
        <h2>Метод разделенных разностей</h2>
        <span>{buildFormula(5)}</span>
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
                    <button ref={buttonRef} onClick={(e) => {
                        try {
                            // при клике по кнопке начинаем расчитывать
                            let data = parse(state.text);
                            let table = new DifferenceTable(data.map(e => e.y));
                            let array = interpolate(state.value, data, table);
                            let plot = []
                            let it = 0;
                            let dots = data.map(e => Number(e.x)) || [];

                            // расширяем сегрметы точками,
                            // ибо надо отображать контрольные точки и они должны входить в тот же датасет
                            for (let i = 0; i < dots.length - 1; i++) {
                                let step = Math.abs(dots[i] - dots[i + 1]) / 10;
                                let left = dots[i];
                                let right = dots[i + 1];
                                // расчитываем для графика точки
                                // добавим еще условие выхода из цикла если итераций больше 10к
                                while (left < right + step || it > 10000) {
                                    plot.push({ x: left, y: interpolate(left, data, table), visible: dots.indexOf(left) >= 0 });
                                    left += step;
                                    it++;
                                }
                            }

                            //изменем состояние компонента
                            setState(prev => ({
                                ...prev, result: array,
                                table: table.getTable(),
                                plot: {
                                    data: [...plot],
                                    step: 100,
                                    min: dots[0],
                                    max: dots[dots.length - 1],
                                    origin: dots
                                }
                            }))
                        } catch (error) {
                            console.log("При вычислении случилась ошибка", error);
                            alert("Увы, что-то пошло нетак! Попробуй еще раз.")
                        }
                    }
                    }>Расчитать!</button>
                </div>

            </div>
            <div className="ex3_container__main">
                <Plotter plot={state.plot} lineName={"Интерполянт P(x)"} />
            </div>
        </div>
        {/* вывод таблицы разностей */}
        <div>
            {buildTable(state.table)}
        </div>
    </>)
}

/**
 * Вывод формулы для интерполяции вперед по 5м разностям
 */
function buildFormula(n) {
    let formula = `$$ P_${n}(x) = y_0 + \\Delta y_0q `

    const q = (m) => {
        let qexr = "q";
        for (let i = 1; i < m; i++) {
            qexr += `(q - ${i})`
        }
        return qexr;
    }

    for (let i = 2; i <= n; i++) {
        formula += `+ \\frac{\\Delta^${i}y_0${q(i)}}{${i}!}`
    }

    formula += '$$'

    return (
        <Latex>{formula}</Latex>
    )
}

/**
 * Вывод таблицы разностей
 */
function buildTable(table) {
    // deep copy массива
    let copy = JSON.parse(JSON.stringify(table));

    for (let i = 0; i < copy.length; i++) {
        let cells = 5 - copy[i].length
        for (let j = 0; j < cells; j++) {
            copy[i].push(null);
        }
    }
    return (
        <table>
            <tbody>
                {
                    copy.map((row, ri) => {
                        return (
                            <tr key={ri}>
                                <td><Latex>{`$$ \\Delta^${ri + 1}y_0 $$`}</Latex></td>
                                {
                                    row.map((col, ci) => {
                                        return (col) ? (
                                            <td key={ci}>{round(Number(col), 5)}</td>
                                        ) : null
                                    })
                                }
                            </tr>)
                    })
                }
            </tbody>
        </table>
    )
}

