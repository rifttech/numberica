import * as GQ from "./GaussianQuadrature";
test("", () => {
    for (let i = 2; i < 8; i++) {
        let raw = GQ.integrate(Math.sin, 0, Math.PI, i)
        let round5 = GQ.round(raw, 5);
        console.log("n=%s r=%s, r(E5)=%s, d=%s", i, raw, round5, raw - 2);
    }
});