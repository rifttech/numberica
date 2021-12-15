


function Build(data) {
    let x = []
    let y = []
    for (let i = 0; i < data.length; i++) {
        x.push(Number(data[i].x))
        y.push(Number(data[i].y))
    }

    let splines = [];

    for (let i = 0; i < x.length; i++) {
        splines.push({ a: null, b: null, c: null, d: null, x: null });
    }
    // var splines = new Array(X.length).fill({a:null,b:null,c:null,d:null,x:null});
    const n = x.length;
    for (let i = 0; i < n; i++) {
        splines[i].x = x[i];
        splines[i].a = y[i];
    }
    splines[0].c = splines[n - 1].c = 0;

    // Решение СЛАУ относительно коэффициентов сплайнов c[i] методом прогонки для трехдиагональных матриц
    // Вычисление прогоночных коэффициентов - прямой ход метода прогонки
    var alpha = new Array(n - 1).fill(0);
    var beta = new Array(n - 1).fill(0);
    for (let i = 1; i < n - 1; ++i) {
        let hi = x[i] - x[i - 1];
        var hi1 = x[i + 1] - x[i];
        var A = hi;
        var C = 2.0 * (hi + hi1);
        var B = hi1;
        var F = 6.0 * ((y[i + 1] - y[i]) / hi1 - (y[i] - y[i - 1]) / hi);
        var z = (A * alpha[i - 1] + C);
        alpha[i] = -B / z;
        beta[i] = (F - A * beta[i - 1]) / z;
    }

    // Нахождение решения - обратный ход метода прогонки
    for (let i = n - 2; i > 0; --i) {
        splines[i].c = alpha[i] * splines[i + 1].c + beta[i];
    }

    // По известным коэффициентам c[i] находим значения b[i] и d[i]
    for (let i = n - 1; i > 0; --i) {
        let hi = x[i] - x[i - 1];
        splines[i].d = (splines[i].c - splines[i - 1].c) / hi;
        splines[i].b = hi * (2.0 * splines[i].c + splines[i - 1].c) / 6.0 + (y[i] - y[i - 1]) / hi;
    }

    return splines;
}

function Interpolate(x, splines) {
    if (splines == null) {
        return NaN; // Если сплайны ещё не построены - возвращаем NaN
    }

    const n = splines.length;
    var s = { a: null, b: null, c: null, d: null, x: null };

    if (x <= splines[0].x) // Если x меньше точки сетки x[0] - пользуемся первым эл-тов массива
    {
        s = splines[0];
    }
    else if (x >= splines[n - 1].x) // Если x больше точки сетки x[n - 1] - пользуемся последним эл-том массива
    {
        s = splines[n - 1];
    }
    else // Иначе x лежит между граничными точками сетки - производим бинарный поиск нужного эл-та массива
    {
        var i = 0;
        var j = n - 1;
        while (i + 1 < j) {
            var k = i + (j - i) / 2;
            if (x <= splines[k].x) {
                j = k;
            }
            else {
                i = k;
            }
        }
        s = splines[j];
    }

    var dx = x - s.x;
    // Вычисляем значение сплайна в заданной точке по схеме Горнера
    return s.a + (s.b + (s.c / 2.0 + s.d * dx / 6.0) * dx) * dx;
}

export {
    Build, Interpolate
}