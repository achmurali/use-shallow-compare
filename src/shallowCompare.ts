function typeOf(object: any): string {
  return object.constructor.name.toLowerCase();
}

const { hasOwnProperty } = Object.prototype;

function shallowCompare(a: any, b: any): boolean {
  let source = a;
  let target = b;

  //for primitive types
  if (Object.is(source, target))
    return true;

  //to check for undefined
  if (typeof source !== 'object' || !source || typeof target !== 'object' || !target)
    return false;

  if (typeOf(source) !== typeOf(target))
    return false;

  if (typeOf(source) === 'map') {
    source = Object.fromEntries(source);
    target = Object.fromEntries(target);
  }

  if (typeOf(source) === 'set') {
    source = [...source];
    target = [...target];
  }

  if (typeOf(source) === 'date') 
    return source.getTime() === target.getTime();
  
  const sourceKeys = Object.keys(source);
  const targetKeys = Object.keys(target);
  
  if(sourceKeys.length !== targetKeys.length)
    return false;

  return [...sourceKeys, ...targetKeys].every(k => source[k] === target[k]
        && hasOwnProperty.call(source, k)
        && hasOwnProperty.call(target, k));
}

export default shallowCompare;