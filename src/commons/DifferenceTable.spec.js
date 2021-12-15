import DifferenceTable from './DifferenceTable';

test("", ()=> {
    let data = [0,1,2,3,4,5,6,7,8,9]
    let d = new DifferenceTable(data);
    console.log(d.getTable());
})
