
import React, { useState } from 'react';
import { Parser } from 'expr-eval';
import * as GQ from "./../commons/GaussianQuadrature";
import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'


const parser = new Parser();

export default function Ex4() {
    const [data, setData] = useState({
        fn: "sin(x)",
        a: "0",
        b: "pi",
        aeval: 0,
        beval: 0,
        round: 0,
        result: [],
        graph: []
    });

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
            for (let i = 2; i < 8; i++) {



                let raw = GQ.integrate(func(fnexr), evA, evB, i)
                temp.push({ id: i, val: raw });
            }

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
            <div>
                <label>
                    f(x) =
                    <input type='text' value={data.fn} onChange={e => setData(p => ({ ...p, fn: e.target.value }))} />
                </label>
                <label style={{ marginLeft: "10px" }}>
                    a=
                    <input type='text' value={data.a} onChange={e => setData(p => ({ ...p, a: e.target.value }))} />
                </label>
                <label style={{ marginLeft: "10px" }}>
                    b=
                    <input type='text' value={data.b} onChange={e => setData(p => ({ ...p, b: e.target.value }))} />
                </label>
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
            </div>

            <button style={{ marginLeft: "5px", marginTop: "20px" }} onClick={() => calc(data)}>Расчитать!</button>

            <h3>Результы выполнения:</h3>
            <hr />
            {
                data.result.map(e => {
                    return (
                        <Latex key={e.id}>{`$$ I = ${coefs(data.a, data.b)[0]}\\sum_{i=0}^{${e.id}}{w_if\\left(${coefs(data.a, data.b)[0]}z_i+${coefs(data.a, data.b)[1]}\\right)} =${GQ.round(e.val, parseInt(data.round))} $$ `}</Latex>
                    )
                })
            }

        </>
    )
}

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