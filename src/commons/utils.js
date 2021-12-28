function parse(text) {
    return text.split("\n")
        .map(e => {
            let str = e.replace(/\s/g, '');
            let val = str.split(";");

            return { x: Number(val[0]), y: Number(val[1]) }
        })
}


/**
 * Округляет число до конректного знака после запятой
 * @param {Number} number число
 * @param {Number} digits количество знаков после запятой
 * @returns 
 */
function round(number, digits) {
    if (digits === 0) {
        return number;
    }
    let d = Math.pow(10, digits);
    return Math.round((number + Number.EPSILON) * d) / d
}

export {
    parse,
    round
}