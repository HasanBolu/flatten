# Array flattener

Implementation of array flattener with javascript.

```js
function flatDeep(arr, d = 1){
    if(!Array.isArray(arr)){
        return arr;
    }

    return d > 0 
        ? arr.reduce((acc, curr) => acc.concat(flatDeep(curr, d - 1)), []) 
        : arr.slice();
}
```

# Installation

Following npm command installs project dependencies.

```
npm install
```

Following npm command runs unit tests in the project
```
npm test
```
