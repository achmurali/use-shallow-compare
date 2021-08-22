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
  if (typeof source !== 'object' || source === null || typeof target !== 'object' || target === null)
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

  if (source.constructor.name === 'date')
    return source.getTime() === target.getTime();

  return [...Object.keys(source), ...Object.keys(target)].every(k => source[k] === target[k]
        && hasOwnProperty.call(source, k)
        && hasOwnProperty.call(target, k));
}

export default shallowCompare;