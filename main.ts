function sum(a: number, b: number): number {
  return a + b;
}
console.log("Eager sum", sum(10, 20));

type Lazy<T> = () => T;

function lazySum(a: () => number, b: () => number): () => number {
  return () => a() + b();
}
function lazySumWithType(a: Lazy<number>, b: Lazy<number>): Lazy<number> {
  return () => a() + b();
}
console.log("lazysum of 5, 6 equals ", lazySum(() => 5, () => 6)());

console.log(
  "lazysumWithType of 10, 20 equals",
  lazySumWithType(() => 10, () => 20)(),
);

function infiniteFunc<T>(): T {
  return infiniteFunc();
}

function first(a: number, b: number): number {
  return a;
}
function lazyFirst(a: Lazy<number>, b: Lazy<number>): Lazy<number> {
  return () => a();
}
console.log("lazyFirst: ", lazyFirst(() => 10, () => infiniteFunc())());

function and(a: Lazy<boolean>, b: Lazy<boolean>): Lazy<boolean> {
  return () => !a() ? false : b();
}
function trace<T>(x: Lazy<T>, message: string): Lazy<T> {
  return () => {
    console.log(message);
    return x();
  };
}
console.log(
  "false and false ",
  and(trace(() => false, "L"), trace(() => false, "R"))(),
);
console.log(
  "false and true ",
  and(trace(() => false, "L"), trace(() => true, "R"))(),
);
console.log(
  "true and false ",
  and(trace(() => true, "L"), trace(() => false, "R"))(),
);
console.log(
  "true and true ",
  and(trace(() => true, "L"), trace(() => true, "R"))(),
);
function or(a: Lazy<boolean>, b: Lazy<boolean>): Lazy<boolean> {
  return () => a() ? true : b();
}
console.log(
  "false or false ",
  or(trace(() => false, "L"), trace(() => false, "R"))(),
);
console.log(
  "false or true ",
  or(trace(() => false, "L"), trace(() => true, "R"))(),
);
console.log(
  "true or false ",
  or(trace(() => true, "L"), trace(() => false, "R"))(),
);
console.log(
  "true or true ",
  or(trace(() => true, "L"), trace(() => true, "R"))(),
);

type LazyList<T> = Lazy<
  | {
    head: Lazy<T>;
    tail: LazyList<T>;
  }
  | null
>;
function toList<T>(xs: T[]): LazyList<T> {
  return () => {
    if (xs.length === 0) {
      return null;
    } else {
      return {
        head: () => xs[0],
        tail: toList(xs.splice(1)),
      };
    }
  };
}

console.log(
  "toList of [1,2,3,4] to lazylist => ",
  toList([1, 2, 3, 4])()?.head(),
);
console.log(
  "toList of [1,2,3,4] to lazylist => ",
  toList([1, 2, 3, 4])()?.tail()?.head(),
);

function printList<T>(xs: LazyList<T>) {
  const pair = xs();
  if (pair !== null) {
    console.log(pair?.head());
    if (pair!.tail !== null) {
      printList(pair!.tail);
    }
  }
}
printList(toList([1, 2, 3, 4, 5, 6, 7, 8, 9]));

function range(n: Lazy<number>): LazyList<number> {
  let begin = n();
}
