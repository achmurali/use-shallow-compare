import shallowCompare from '../src/shallowCompare';

describe('shallow equal', () => {
  it('correctly compares primitive types', () => {
    //number
    expect(shallowCompare(1, 1)).toBe(true);
    expect(shallowCompare(1.1, 1)).toBe(false);
    expect(shallowCompare(1.222, 1.222)).toBe(true);

    //string
    expect(shallowCompare('hello', 'hello')).toBe(true);
    expect(shallowCompare('hello', 'HELLO')).toBe(false);

    //boolean
    expect(shallowCompare(true, true)).toBe(true);
    
    //undefined & null
    expect(shallowCompare(null, null)).toBe(true);
    expect(shallowCompare(undefined, undefined)).toBe(true);

    expect(shallowCompare(null, undefined)).toBe(false);
    expect(shallowCompare(1, 'One')).toBe(false);
    expect(shallowCompare(1, undefined)).toBe(false);
    expect(shallowCompare(1, null)).toBe(false);
    expect(shallowCompare('One', undefined)).toBe(false);
  })

  it('correctly compares objects', () => {
    const obj = { a: 1 };
    const arr = [1,2,3];
    expect(shallowCompare(obj, obj)).toBe(true);
    expect(shallowCompare({a:1,b:2}, {a:1,b:2})).toBe(true);
    expect(shallowCompare({a:1,b:2,c:obj}, {a:1,b:2,c:obj})).toBe(true);
    expect(shallowCompare({a:1,b:2,c:obj}, {a:1,b:2,c:{ a:1 }})).toBe(false);
    expect(shallowCompare({a:1,b:2,c:obj}, {a:1,b:2,d:obj})).toBe(false);
    expect(shallowCompare({a:1,b:2,c:arr}, {a:1,b:2,c:arr})).toBe(true);
    expect(shallowCompare({a:1,b:2,c:arr}, {a:1,b:2,c:[1,2,3]})).toBe(false);
  })

  it('correctly compares objects/arrays', () => {
    const obj = { a: 1 };
    const arr = [1,2,3];
    expect(shallowCompare([1,2,3], [1,2,3])).toBe(true);
    expect(shallowCompare([1,2,3], [1,2,3,4])).toBe(false);
    expect(shallowCompare([1,2,obj], [1,2,obj])).toBe(true);
    expect(shallowCompare([1,2,obj,4], [1,2,obj])).toBe(false);
    expect(shallowCompare([1,2,{ a: 1 }], [1,2,{ a: 1}])).toBe(false);
    expect(shallowCompare([1,2,arr], [1,2,arr])).toBe(true);
    expect(shallowCompare([1,2,arr], [1,2,obj])).toBe(false);
  })

  it('correctly compares objects/map', () => {
    const obj = { a: 1 };
    const arr = [1,2,3];
    expect(shallowCompare(new Map([['a',1],['b',2]]), new Map([['a',1],['b',2]]))).toBe(true);
    expect(shallowCompare(new Map<string, any>([['a',1],['b',2],['c',arr],['d',obj]]), new Map<string, any>([['a',1],['b',2],['c',arr],['d',obj]]))).toBe(true);
    expect(shallowCompare(new Map<string, any>([['a',1],['b',2],['c',arr],['d',obj]]), new Map<string, any>([['a',1],['b',2]]))).toBe(false);
    expect(shallowCompare(new Map<string, any>([['a',1],['b',2],['c',arr],['d',obj]]), new Map<string, any>([['a',1],['b',2],['c',[1]],['d',{a:1}]]))).toBe(false);
  })

  it('correctly compares objects/set', () => {
    const obj = { a: 1 };
    const arr = [1,2,3];
    expect(shallowCompare(new Set([1,2,3]), new Set([1,2,3]))).toBe(true);
    expect(shallowCompare(new Set([1,2,3,4]), new Set([1,2,3]))).toBe(false);
    expect(shallowCompare(new Set([1,2,arr,obj]), new Set([1,2,arr,obj]))).toBe(true);
    expect(shallowCompare(new Set([1,2,obj,arr]), new Set([1,2,arr,obj]))).toBe(false);
  });

  it('correctly compares dates', () => {
    expect(shallowCompare(new Date('December 17, 1995 03:24:00'), new Date('December 17, 1995 03:24:00'))).toBe(true);
    expect(shallowCompare(new Date('December 17, 1995 03:24:00'), new Date(1995, 11, 17, 3, 24, 0))).toBe(true);
    expect(shallowCompare(new Date('December 17, 1995 03:24:00'), new Date('December 16, 1995 03:24:00'))).toBe(false);
  })
});