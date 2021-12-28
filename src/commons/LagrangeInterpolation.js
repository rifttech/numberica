
/**
 * Ищем ближайшую точку среди контрольных точек
 */
function closest(x, data) {
    let arr = data.map(e => e.x);
    let curr = arr[0], diff = Math.abs(x - curr);
    let index = 0;
    for (let val = 0; val < arr.length; val++) {
        let newdiff = Math.abs(x - arr[val]);
        if (newdiff < diff) {
            diff = newdiff;
            curr = arr[val];
            index = val;
        };
    };
    return index;

}

function interpolate(x, data) {
    let center = closest(x, data);
    // выделяем узел, от которого будем отсчитывать узлы из контрольных точек
    if (center === data.length - 1) {
        center = data.length - 3
    } else if (center === 0) {
        center = 1;
    } else {
        center += -1
    }
    return lagrange(x, center, data, 3);
}

/**
 * Интерполяция полиномами лагранжа
 */
function lagrange(x, center, data, n) {
    let sum = 0;
    for (let i = 0; i < n; i++) {
        let product = 1;
        for (let j = 0; j < n; j++) {
            if (i === j) {
                continue;
            }
            product *= (x - data[j + center].x) / (data[i + center].x - data[j + center].x);
        }
        sum += product * data[i + center].y
    }
    return sum;
}


export {
    interpolate
}