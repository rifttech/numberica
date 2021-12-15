
import React, { useState } from 'react';
import { Parser } from 'expr-eval';
import * as GQ from "./../commons/GaussianQuadrature";




const parser = new Parser();

export default function Ex4() {
    const [data, setData] = useState({
        fn: "sin(x)",
        a: "0",
        b: "pi",
        round: 0,
        result: [],
    });

    let calc = ({ fn, a, b, round }) => {
        try {
            let temp = [];
            for (let i = 2; i < 8; i++) {

                let fnexr = parser.parse(fn);
                let argA = parser.parse(a.toUpperCase());
                let argB = parser.parse(b.toUpperCase());

                let func = (exr) => (x) => {
                    return exr.evaluate({ x: x })
                };


                let raw = GQ.integrate(func(fnexr), argA.evaluate(), argB.evaluate(), i)



                temp.push({ id: i, val: raw });
            }
            setData(prev => ({ ...prev, result: [...temp] }));
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
                        <p style={{ marginLeft: "10px" }} key={e.id}> I = {GQ.round(e.val, parseInt(data.round))} , при n={e.id}</p>
                    )
                })
            }
        </>
    )
}

