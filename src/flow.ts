/* eslint-disable @typescript-eslint/no-unused-vars */
import { flow, pipe } from 'fp-ts/function';
// performs function composition

const size = (s: string) => s.length; // a -> b
const isAtLeast3 = (n: number) => n >= 3; // b -> c
// * a composition of the first 2 functions. the return type needs to match input type of subsequent.
const isLongEnough = flow(size, isAtLeast3); // a -> c

isLongEnough('hello'); // -> true
// isLongEnough is a function composed from the prev 2 functions, the args are passed through the flow
// !(pipe) A -> (A->B) -> (B->C) -> (C->D)
// flow (A->B) -> (B->C) -> (C->D) -> (D->E)

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;
const print = (n: number): string => `res: ${n}`;

const f = flow(len, double, print);
const result = f('aaa');
console.log(result);

// assert.strictEqual(f('aaa'), 6);
/* ------------------------------------------------------ */
/*                           Ex                           */
/* ------------------------------------------------------ */

// ? const f = <A>(a: A) => pipe(a, g1, g2, g3); // Im a function that takes a: A
// ===
// ? const f2 = flow(g1, g2, g3); // I'm the same function
//
const concat = (s1: string, s2: string) => s1 + s2;

const trim = (s: string) => s.trim();

const isAlsoValid = flow(concat, trim, size, isAtLeast3);
isAlsoValid("I'm", 'valid');

// const flow =
//   <A, B, C>(f: (a: A) => B, g: (b, B) => C) =>
//   (a: A): C =>
//     g(f(a));
