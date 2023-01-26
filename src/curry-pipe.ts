/* eslint-disable @typescript-eslint/no-unused-vars */
import { pipe, flow } from 'fp-ts/lib/function';
/* ----------------------- pipe ----------------------- */
// A -> (A->B) -> (B->C) -> (C->D)

function add1(num: number): number {
  return num + 1;
}

function mult2(num: number): number {
  return num * 2;
}

// pipe only uses functions with 1 argument.
const res = pipe(1, add1, mult2, toString);

/* ------------------------ flow -------------------------- */
// same as pipe (almost) but 1st arg is a fn
//(A->B) -> (B->C) -> (C->D) -> (D->E)

pipe(1, flow(add1, mult2, toString));
flow(add1, mult2, toString)(1);

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);
const result = f('aaa');
console.log(result);

// assert.strictEqual(f('aaa'), 6);
/* ------------------------------------------------------ */

function sumOf(a: number, b: number, c: number, d: number, e: number): number {
  return a + b + c + d + e;
}

function sumCurry(a: number) {
  return (b: number) => {
    return (c: number) => {
      return (d: number) => {
        return (e: number) => {
          return sumOf(a, b, c, d, e);
        };
      };
    };
  };
}

sumOf(1, 2, 3, 4, 5);

const afterWePassedA = sumCurry(1);
const afterWePassedAB = afterWePassedA(2);
const afterWePassedABC = afterWePassedAB(3);
const afterWePassedABCD = afterWePassedABC(4);
const afterWePassedABCDE = afterWePassedABCD(5);

const imANumber = sumCurry(1)(2)(3)(4)(5);

// For instance...
// VERBOSE code that repeats itself...
function getUserProperty(username: string, property: string) {
  //....
  return `${property}`;
}

const jamesHeight = getUserProperty('james', 'height');
const jamesGender = getUserProperty('james', 'gender');
// etc...

// CURRIED
const getUserPropCurried = (user: string) => (property: string) => {
  return getUserProperty(user, property);
};

const getJamesProperty = getUserPropCurried('james');
// or
const getPeteProperty = (property: string) => getUserProperty('pete', property);

const jamesWeight = getJamesProperty('weight');
const jamesEyes = getJamesProperty('eyeColor');

const peteHeight = getPeteProperty('height');
