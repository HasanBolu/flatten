function flatDeep(arr, d = 1){
    if(!Array.isArray(arr)){
        return arr;
    }

    return d > 0 
        ? arr.reduce((acc, curr) => acc.concat(flatDeep(curr, d - 1)), []) 
        : arr.slice();
}

module.exports = flatDeep;