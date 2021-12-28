export default class DifferenceTable {
    constructor(data) {
        this.diff = [];
        init(this.diff, data, 5);
    }

    getTable() {
        return this.diff;
    }
}

/**
 * Инициализация таблицы разностей
 * @param diff таблица разностей
 * @param data исходный массив, по которому вычисляются разности
 * @param n определяет глубину расчета разностей
 */
function init(diff, data, n) {
    // console.log("data: " + data,"|", count, "| length:", data.length);
    // услровие выхода из рекурсии
    if (n <= 0) {
        return;
    }

    // расчитываем n-тые разности.
    // записываем их в таблицу
    let tmp = [];
    for (let i = 0; i < data.length - 1; i++) {
        tmp.push(data[i + 1] - data[i]);
    }
    diff.push(tmp);

    // реккурсивный вызов, считаем разности более высокого порядка
    init(diff, tmp, n - 1);
}

// чтобы не тратить время на расчет факториала, запишем сразу его значения для некторых его значений
let factorial = [0, 1, 2, 6, 24, 120];

/**
 * Интерполирует f(x)
 */
function interpolate(x, data, table) {
    //за х0 принимаем первый узел
    let x0 = Number(data[0].x);
    let y0 = Number(data[0].y);

    let index = 0;
    while (data[index] < x && index < 100) {
        index++;
    }

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
// имеется ввиду последовательность q(q-1)(q-2)...(q -n)
function calcQ(val, i) {
    let r = 1;
    for (let j = i; j >= 0; j--) {
        r *= val - j;
    }
    return r;
}


export {
    interpolate
}