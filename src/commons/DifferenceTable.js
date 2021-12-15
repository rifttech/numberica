export default class DifferenceTable {
    constructor(data) {
        this.diff = [];
        init(this.diff, data, 5);
    }

    getTable() {
        return this.diff;
    }
}

// расчет таблицы разностей
function init(diff, data, count) {
    // console.log("data: " + data,"|", count, "| length:", data.length);
    if (count <= 0) {
        return;
    }
    let tmp = [];
    for (let i = 0; i < data.length - 1; i++) {
        tmp.push(data[i + 1] - data[i]);
    }
    diff.push(tmp);
    init(diff, tmp, count - 1);
}

let factorial = [0, 1, 2, 6, 24, 120]

function find(x, data) {
    //инициализируем таблицу разностей
    let table = new DifferenceTable(data.map(e => e.y));
    //за х0 принимаем первый узел
    let x0 = Number(data[0].x);
    let y0 = Number(data[0].y);
    let h = Math.abs(Number(data[1].x) - Number(data[0].x));
    let q = (x - x0) / h
    let result = y0;
    // далее по формуле интерполяции вперед, рачитываем значение функции
    for (let i = 0; i < 5; i++) {
        result += table.getTable()[i][0] * calcQ(q, i) / factorial[i + 1];
    }
    return result;
}

// расчет коэфицента к разности
function calcQ(val, i) {
    let r = 1;
    for (let j = i; j >= 0; j--) {
        r *= val - j;
    }
    return r;
}


export {
    find
}
