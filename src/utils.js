// Uitlities

const square = (x) => x*x;
export { square }; //not an odbject

export const add = (a,b) => a+b;

const subtract = (a,b) => a-b;
export {subtract as default};// default export, can only have one per file
//alternatively
export default (a,b) => a + b;
//can't use : export default const subtract = ...
