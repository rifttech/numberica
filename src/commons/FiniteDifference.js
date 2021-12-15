function derriveInternal(data, i, i0, i1, i2) {
    let x0 = data[i0].x;
    let x1 = data[i1].x;
    let x2 = data[i2].x;

    let a0 = ((2 * data[i].x - x1 - x2) / ((x0 - x1) * (x0 - x2))) * data[i0].y
    let a1 = ((2 * data[i].x - x0 - x2) / ((x1 - x0) * (x1 - x2))) * data[i1].y
    let a2 = ((2 * data[i].x - x0 - x1) / ((x2 - x0) * (x2 - x1))) * data[i2].y
    return a0 + a1 + a2;
}

function derrive(data, i) {
    if (i === 0) {
        // левые разности
        return derriveInternal(data, i, i, i + 1, i + 2);
    } else if (i === data.length - 1) {
        // правые
        return derriveInternal(data, i, i - 2, i - 1, i);
    } else {
        // центральные
        return derriveInternal(data, i, i - 1, i, i + 1)
    }
}


export {
    derrive
}