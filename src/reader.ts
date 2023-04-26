/* eslint-disable @typescript-eslint/no-unused-vars */
import { Reader } from 'fp-ts/lib/Reader';
// interface Reader<R, A> {
//   (r: R): A;
// }
/*
The first thing you need to know is that the type Reader<R, A> represents a function (r: R) => A
where R represents an "environment" needed for the computation (we can "read" from it) and A is the result.

/* ------------------------------------------------------ */
/*               // Non reader example setup  -             */
/* ------------------------------------------------------ */
const f = (b: boolean): string => (b ? 'true' : 'false');
const g = (n: number): string => f(n > 2); // returns string from the eval.
const h = (s: string): string => g(s.length + 1); // passes 'foo' length + 1 into g. which evals it to bool, which passes to f
console.log(h('foo')); // 'true'
/* ------------------------------------------------------ */
// What if we want to internationalise f? Well, we could add an additional parameter...
interface Dependencies {
  i18n: {
    true: string;
    false: string;
  };
}
const f1 = (b: boolean, deps: Dependencies): string =>
  b ? deps.i18n.true : deps.i18n.false;
/* -----------------------Problem ...------------------------ */
// Now we have a problem though, g doesn't compile anymore, We must add an additional parameter to g as well
// must pass through an argument that the other functions do not use
const g1 = (n: number, deps: Dependencies): string => f1(n > 2, deps); // ok
// Now it's h that doesn't compile, we must add an additional parameter to h as well
const h1 = (s: string, deps: Dependencies): string => g1(s.length + 1, deps);

const instance: Dependencies = {
  i18n: {
    true: 'vero',
    false: 'falso',
  },
};

console.log(h1('foo', instance)); //

//* As you can see, h and g must have knowledge about f dependencies despite not using them.

// Can we improve this part? Yes we can, we can move Dependencies from the parameter list to the return type.

/* ------------------------------------------------------ */
/*                         Reader                         */
/* ------------------------------------------------------ */
// ? Let's start by rewriting our functions, putting the deps parameter alone
const f2 =
  (b: boolean): ((deps: Dependencies) => string) =>
  deps =>
    b ? deps.i18n.true : deps.i18n.false;

const g2 = (n: number): ((deps: Dependencies) => string) => f2(n > 2);

const h2 = (s: string): ((deps: Dependencies) => string) => g2(s.length + 1);
// Note that (deps: Dependencies) => string is just Reader<Dependencies, string>

/* ------------------------------------------------------ */
const f3 =
  (b: boolean): Reader<Dependencies, string> =>
  deps =>
    b ? deps.i18n.true : deps.i18n.false;

const g3 = (n: number): Reader<Dependencies, string> => f3(n > 2);

const h3 = (s: string): Reader<Dependencies, string> => g3(s.length + 1);

console.log(h3('foo')(instance)); // 'vero'
