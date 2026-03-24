import MyUtils from '../src/script_Pages/utils'
const { filterByCrop} = MyUtils;

const mockData = [
    { Crop: 'Maize', Yield: 100 },
    { Crop: 'Rice', Yield: 80 },
    { Crop: 'Rice', Yield: 120 },
    { Crop: 'Lettuce', Yield: 80 },
    { Crop: 'Rice', Yield: 120 }
];

 const result = filterByCrop(mockData, 'Rice');
 const crop = result[0].Crop;

// Testing filterByCrop function
test(`Test 1- FilterByCrop functionality should only return ${result.length} rows of ${crop} data entry`, () => {
   
    expect(result.length).toBe(3);
    expect(crop).toBe('Rice');
});