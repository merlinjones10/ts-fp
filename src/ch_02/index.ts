/* eslint-disable @typescript-eslint/no-unused-vars */
const NAME_STR = 'merlin';

// fist class functions
const hi = (name: string) => `Hi ${name}`;
const greeting = (name: string) => hi(name);
// greeting has redundant code, SHOULD BE

const greetingFp = hi; // pass hi as function
console.log(greetingFp(NAME_STR));
/* 
In other words,  hi  is already a function that expects one argument, why place
another function around it that simply calls  hi  with the same bloody argument?
*/

/*

// this line 
ajaxCall(json => callback(json)); 
 
// is the same as this line 
ajaxCall(callback); 
 
// so refactor getServerStuff
const getServerStuff = callback => ajaxCall(callback); 
 
// ...which is equivalent to this
const getServerStuff = ajaxCall; // <-- look mum, no ()'s
*/
