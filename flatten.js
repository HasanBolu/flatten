
const arr = [1, 2, [3, 4, [5, 6]]];

function flatDeep(arr, d = 1){
    if(!Array.isArray(arr)){
        return arr;
    }

    return d > 0 
        ? arr.reduce((acc, curr) => acc.concat(flatDeep(curr, d - 1)), []) 
        : arr.slice();
}

console.log(flatDeep(arr, Infinity)); 