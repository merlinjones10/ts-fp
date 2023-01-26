const f = (b: boolean): string => (b ? 'true' : 'false');

const g = (n: number): string => f(n > 2);

const h = (s: string): string => g(s.length + 1);

console.log(h('foo')); // 'true'
