const {describe, expect, test} = require('@jest/globals'); 
const flatDeep = require('./flatten');

// creates n dimensional array with the value of dimension in the last depth
// e.g. it returns [[[[4]]]] if depth is 4
const createNDimensionalArray = (depth) => {    
    if(depth === 1){
        return [1];
    }

    let arr = [];
    let current = [];
    arr.push(current);
    for (let i = 2; i <= depth; i++) {
        const value = i === depth ? [depth] : []; 
        current.push(value);
        current = current[0];
    }

    return arr;
}

// creates an array which has the characteristic each item has one more depth level than previous one
// e.g it returns [[1], [[2]], [[[3]]], [[[[4]]]]] if length is 4
const createArbitrarilyNestedArray = (length) => {
    const arr = [];
    for (let i = 1; i <= length; i++) {
        arr.push(createNDimensionalArray(i));
    }

    return arr;
}

const createHugeArrayWithSomeNesting = (length) => {
    const arr = [];
    for (let i = 1; i <= length; i++) {
        const value = (i % 100 === 0 && i <= 1000) ? createNDimensionalArray(i) : [i];  
        arr.push(value)
    }

    return arr;
}

describe('flatDeep function tests', () => {
    test('it should flat an arbitrarily nested array of values', () => {
        const arr = [1, 2, [3, 4, [5, 6], [7, 8, [9, 10]]]];
        const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const result = flatDeep(arr, Infinity);
        expect(result).toStrictEqual(expected);
    });

    test('It should flat an array with 1 level depth', () => {
        const arr = [[1], [2], [3], [4]];
        const expected = [1, 2, 3, 4];
        const result = flatDeep(arr, 1);
        expect(result).toStrictEqual(expected);
    });

    test('It should flat an array with 2 level depth', () => {
        const arr = [[1, [2, 3]], [[4,5]]];
        const expected = [1, 2, 3, 4, 5];
        const result = flatDeep(arr, 2);
        expect(result).toStrictEqual(expected);
    });

    test('It should flat an array with 1000 level depth', () => {
        const length = 1000;
        const arr = createArbitrarilyNestedArray(length);
        const result = flatDeep(arr, Infinity);
        expect(result).toHaveLength(length);
    });

    test('It should flat a nested array which has 40000 element', () => {
        const length = 40000;
        const arr = createHugeArrayWithSomeNesting(length);
        const result = flatDeep(arr, Infinity);
        expect(result).toHaveLength(length);
    });

    test('it should return input itself if the input is not an array', () => {
        const arr = { a:1, b:2 };
        const result = flatDeep(arr);
        expect(result).toStrictEqual(arr);
    });

    test('it should not touch null or undefined values', () => {
        const arr = [[1], [2], [3], [4], null, undefined];
        const expected = [1, 2, 3, 4, null, undefined];
        const result = flatDeep(arr, 1);
        expect(result).toStrictEqual(expected);
    });

    test('it should not touch object values', () => {
        const arr = [[1], [2], [3], [4], {a:1, b:2}];
        const expected = [1, 2, 3, 4, {a:1, b:2}];
        const result = flatDeep(arr);
        expect(result).toStrictEqual(expected);
    });
})