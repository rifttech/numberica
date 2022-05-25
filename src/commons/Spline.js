import gauss from "gaussian-elimination";

/**
 * построить сплайн
 * принимает узлы
 */
export function BuildSpline(points) {

    let knots = points.length - 1;
    let matrix = newZeroMatrix(knots);
    console.log(points);
    fillMatrix(matrix, points, knots);
    // console.log(matrix.map(e => e.join(" ")))
    // находим коэффициенты
    let coefs = gauss(matrix);
    //console.log(coefs);
    // разделяем уравнения по 4 коффициента
    return prepareResult(coefs, points);
}


function fillMatrix(matrix, points, knots){
    for (let i = 0; i < knots; i++) {
        // основные уравнения 2n
        fill(matrix[2 * i], points[i].x, points[i].y, i);
        fill(matrix[2 * i + 1], points[i + 1].x, points[i + 1].y, i);

        // первые производные n - 1
        // вторые производные n - 1

        if (i > 0){
            fillD1(matrix, points, i, knots);
            fillD2(matrix, points, i, knots);
        } 
    }

    // условия натурального сплайна, еще 2 уравнения
    fillEndSplineCondition(matrix, points);
}


/**
 * Вычисляем значение в точке x
 * @param {*} coefs 
 * @param {*} x 
 */
export function Spline(coefs, x) {
    let d = 0;
    for (let i = 0; i < coefs.length; i++) {
        let inclusive = coefs.length - 1 == i;
        if (range(coefs[i][coefs[i].length - 2], coefs[i][coefs[i].length - 1], x, inclusive)) {
            d = i;
            break;
        }
    }
    console.log(d);
    let c = coefs[d];
    return c[0] * x * x * x + c[1] * x * x + c[2] * x + c[3];
}

/**
 * Определение границ использования одной из функций сплайна
 * @param {*} a 
 * @param {*} b 
 * @param {*} x 
 * @param {*} inclusive 
 * @returns 
 */
function range(a, b, x, inclusive) {
    console.log(a, b, x);
    return (!inclusive) ? (x >= a && x < b) : (x >= a && x <= b);
}

/**
 * Добавление основых уравнений в матрицу
 */
function fill(row, x, y, i) {
    let offset = 4 * (i < 1 ? 0 : i); // определяем номер столбца

    row[offset + 3] = 1 // d
    row[offset + 2] = x // c
    row[offset + 1] = row[offset + 2] * x // b
    row[offset] = row[offset + 1] * x // a

    row[row.length - 1] = y //y;
}
/**
 * Добавление уравнений в матрицу - первые прозводные
 * @param {*} matrix 
 * @param {*} points 
 * @param {*} i 
 * @param {*} knots 
 */
function fillD1(matrix, points, i, knots) {
    let r = (2 * knots - 1) + i
    let m = 4 * (i - 1);
    let n = 4 * i;
    let x = points[i].x;
    //console.log(r);
    matrix[r][m] = 3 * x * x // a_i
    matrix[r][m + 1] = 2 * x // b_i
    matrix[r][m + 2] = 1 // c_i

    matrix[r][n] = -3 * x * x // a_i+1
    matrix[r][n + 1] = -2 * x // b_i+1
    matrix[r][n + 2] = -1 // c_i+1

    matrix[r][matrix[r].length - 1] = 0 //y;
}

/**
 * Добавление уравнений в матрицу - вторые прозводные
 * @param {*} matrix 
 * @param {*} points 
 * @param {*} i 
 * @param {*} knots 
 */
function fillD2(matrix, points, i, knots) {
    let r = ((2 * knots - 1) + i) + (knots - 1)
    let m = 4 * (i - 1);
    let n = 4 * i;
    let x = points[i].x;
    //console.log(r);
    matrix[r][m] = 6 * x // a_i
    matrix[r][m + 1] = 2 // b_i


    matrix[r][n] = -6 * x // a_i+1
    matrix[r][n + 1] = -2// b_i+1
    
    matrix[r][matrix[r].length - 1] = 0 //y;
}

/**
 * Подготовить результат.
 * Возвращает список коэффициентов + границы по х
 * @param {Array} coefs 
 * @param {Array} points 
 * @returns 
 */
function prepareResult(coefs, points){
    let result = [];
    const chunkSize = 4;
    for (let i = 0; i < coefs.length; i += chunkSize) {
        const chunk = coefs.slice(i, i + chunkSize);
        result.push(chunk.map(e => e));
    }

    // добавляем границы [x(i) ; x(i+1)]
    for (let i = 0; i < result.length; i++) {
        result[i].push(points[i].x)
        result[i].push(points[i + 1].x)
    }

    return result;
}

/**
 * Доваляет в матрицу конечные условия натурального сплайна
 * @param {*} matrix 
 * @param {*} points 
 */
function fillEndSplineCondition(matrix, points){
    // условия натурального сплайна, еще 2 уравнения
    matrix[matrix.length - 2][0] = 6 * points[0].x;
    matrix[matrix.length - 2][1] = 2;

    matrix[matrix.length - 1][matrix[0].length - 5] = 6 * points[points.length - 1].x;
    matrix[matrix.length - 1][matrix[0].length - 4] = 2;
}

/**
 * Инициализируем строку матрицы
 * Количество столбцов равно 4n + 1, n - кол-во узлов
 * @param {Array} matrix матрица
 * @param {Number} n количество столбцов
 */
function newZeroMatrix(n) {
    let matrix = [];
    for (let i = 0; i < 4 * n; i++) {
        matrix.push([])
        for (let j = 0; j < 4 * n + 1; j++) {
            matrix[i].push(0);
        }
    }
    return matrix;
}
