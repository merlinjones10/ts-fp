/* eslint-disable @typescript-eslint/no-unused-vars */
// pure function = no side effects, does not mutate data unintentionally

interface IExample {
  readonly minimum: 21;
}
const minimumAge: IExample = { minimum: 21 };
// or
const minimum2 = Object.freeze({ minimum: 21 });
// ===
const minimum3: Readonly<{ minimum: number }> = { minimum: 21 };
