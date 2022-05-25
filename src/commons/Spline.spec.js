import { BuildSpline, Spline } from "./Spline"
import { parse } from "./utils";

test('spline', () => {
    let data =
        `-100;4.06
        -75;6.78
        -50;9.49
        -25;16.27
        0;40.67
        25;97.62
        50;146.63
        75;151.85
        100;162.7`
        ;


    // let data =
    //     `0;21
    //     1;24
    //     2;24
    //     3;18
    //     4;16`
    //     ;

    let c = BuildSpline(parse(data));

    console.log(c);

    console.log(Spline(c, -25));
})