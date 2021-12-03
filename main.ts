function sum(a: number, b: number) : number {
    return a + b;
}
console.log("Eager sum", sum(10, 20));

type Lazy<T> = () => T

function lazySum(a : () => number, b: () => number) : ()=>number {
    return () => a() + b()
}
function lazySumWithType(a : Lazy<number>, b: Lazy<number>) : Lazy<number> {
    return () => a() + b()
}
console.log("lazysum of 5, 6 equals ", lazySum(()=>5, ()=>6)())

console.log("lazysumWithType of 10, 20 equals", lazySumWithType(()=>10, ()=>20)())

function infiniteFunc<T>() : T {
    return infiniteFunc()
}

function first (a: number, b: number): number {
    return a
}
function lazyFirst (a: Lazy<number>, b: Lazy<number>): Lazy<number> {
    return () => a()
}
console.log("lazyFirst: ", lazyFirst(() => 10, () => infiniteFunc())())
