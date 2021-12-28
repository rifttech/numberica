
import React, { useState, useRef, useEffect } from 'react';
import { Parser } from 'expr-eval';
import { integrate, Table } from "./../commons/GaussianQuadrature";
import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'
import { round as rnd } from "./../commons/utils";
const parser = new Parser();

export default function Ex4() {
    // исходное состояние
    const [data, setData] = useState({
        fn: "sin(x)",
        a: "0",
        b: "pi",
        n: 10,
        aeval: 0,
        beval: 0,
        round: 0,
        result: [],
        graph: []
    });

    // Прожимаем кнопку "расчитать" автоматически при монтировании компонента,
    // чтобы пользователь сразу видел результы работы
    const buttonRef = useRef();
    useEffect(() => buttonRef.current.click(), []);

    // вычисление интеграла
    let calc = ({ fn, a, b, round }) => {
        try {
            let fnexr = parser.parse(fn);
            let argA = parser.parse(a.toUpperCase());
            let argB = parser.parse(b.toUpperCase());
            let evA = argA.evaluate();
            let evB = argB.evaluate();
            let func = (exr) => (x) => {
                return exr.evaluate({ x: x })
            };
            let temp = [];
            let n = minmax(data.n, 2, 10)
            let raw = integrate(func(fnexr), evA, evB, n);
            temp.push({ id: n, val: raw });

            let it = 0;
            let step = (evB - evA) / 100;
            let values = []
            while ((evA <= evB) || it < 10000) {
                values.push({ x: evA, y: fnexr.evaluate({ x: evA }) })
                evA += step;
                it++;
            }

            setData(prev => ({
                ...prev,
                result: [...temp],
                graph: [...values],
                aeval: evA,
                beval: evB
            }));
        } catch (err) {
            console.log("При вычислении случилась ошибка", err);
            alert("Увы, что-то пошло нетак! Попробуй еще раз.")
        }
    };

    return (
        <>
            <h1>4. Численное интегрирование</h1>
            <h2>Квадратуры Гаусса</h2>
            <Latex>{'$$ I = \\int_{a}^{b}f(x)dx = \\sum_{i=0}^{n}w_if(x_i) $$'}</Latex>
            <div>
                <TextInput label={"f(x)="} value={data.fn} onChange={value => setData(prev => ({ ...prev, fn: value }))} />
                <TextInput label={"a="} value={data.a} onChange={value => setData(prev => ({ ...prev, a: value }))} />
                <TextInput label={"b="} value={data.b} onChange={value => setData(prev => ({ ...prev, b: value }))} />
                <label style={{ marginLeft: "10px" }}>
                    Округлять до:
                    <select name="select" onChange={(e) => {
                        let digit = parseInt(e.target.value);

                        setData(p => ({ ...p, round: digit }));
                    }}
                        value={data.round}>
                        <option value="0">Не округлять</option>
                        <option value="2">2 знаков</option>
                        <option value="3">З знаков</option>
                        <option value="5">5 знаков</option>
                        <option value="8">8 знаков</option>
                    </select>
                </label>
                <TextInput label={"n="} value={data.n} onChange={value => setData(prev => ({ ...prev, n: Number(value) }))} />
            </div>
            <button ref={buttonRef} style={{ marginLeft: "5px", marginTop: "20px" }} onClick={() => calc(data)}>Расчитать!</button>
            <h3>Результаты выполнения:</h3>
            <hr />
            <div>
                <div>
                    {
                        data.result.map(e => {
                            const { a, b, round } = data;
                            let first = rnd(coefs(a, b)[0], round);
                            let second = rnd(coefs(a, b)[0], round);
                            let third = rnd(coefs(data.a, data.b)[1], round);
                            let result = rnd(e.val, round)
                            return (
                                <Latex key={e.id}>{`$$ I = ${first}\\sum_{i=0}^{${e.id}}{w_if\\left(${second}z_i+${third}\\right)} =${result} $$ `}</Latex>
                            )
                        })
                    }
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <Latex>{'$$ w_i $$'}</Latex>
                                </td>
                                <td>
                                    <Latex>{'$$ z_i $$'}</Latex>
                                </td>
                            </tr>
                            {/* Выводим корни и коэффиценты */}
                            {
                                Table[minmax(data.n, 2, 10)]
                                    .map((e, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{e[1]}</td>
                                                <td>{e[0]}</td>
                                            </tr>
                                        )
                                    })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

//cчитаем (a-b)/2 и (a+b)/2
function coefs(a, b) {
    let bound = [
        parser.parse(a.toUpperCase()).evaluate(),
        parser.parse(b.toUpperCase()).evaluate()
    ];
    console.log(bound)
    return [
        (bound[1] - bound[0]) / 2,
        (bound[1] + bound[0]) / 2
    ]
}

function TextInput({ label, value, onChange }) {
    return (
        <label>
            {label}
            <input type='text' value={value} onChange={e => onChange(e.target.value)} />
        </label>
    );
}

function minmax(value, min, max) {
    return Math.min(Math.max(value, min), max);
}