# use-shallow-compare

useEffect with shallow comparison. Additionaly, a shallow comparison function.

## Description

Optimising useEffect hook with a shallow comparison of it's dependency list, providing 
better performance than deep-comparison or stock useEffect.

## Features

- useShallowEffect.
- shallow comparison function.
- Super Light and Fast.

## Installation

```npm install use-shallow-compare```

## Usage

using useShallowEffect -

```
import { useShallowEffect } from 'useShallowCompare';

useShallowEffect(() => {
    //side-effects generally used, similar to useEffect
}, dependency_list);

```

using the shallow comparison function - 

```
import shallowCompare from 'useShallowCompare';

console.log(shallowCompare(a,b));//returns boolean
```

## Shallow Comparison in words -

- `Object.is` comparison between primitive types.
- For other objects, iterate through their keys and comparing their values with `===`

#### Currently supporting - primitive types, arrays, objects, map, set, date.
   

