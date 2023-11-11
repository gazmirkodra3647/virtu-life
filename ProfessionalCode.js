/* 
   Filename: ProfessionalCode.js
   Content: Sophisticated and elaborate code example showcasing various concepts and techniques in JavaScript
*/

// Class definition for a Person
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

// Function to calculate the factorial of a number
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

// Array of names
const names = ['John', 'Jane', 'Michael', 'Samantha'];

// Filter names that contain the letter 'a'
const filteredNames = names.filter(name => name.includes('a'));

// Creating new Person instances
const person1 = new Person('Alice', 25);
const person2 = new Person('Bob', 30);

// Call the greet method on each person
person1.greet();
person2.greet();

// Object with nested properties and methods
const complexObject = {
  property1: 'value1',
  property2: {
    nestedProperty1: 'nestedValue1',
    nestedProperty2: 'nestedValue2',
    nestedMethod: function() {
      console.log('This is a nested method.');
    }
  },
  complexMethod: function() {
    console.log('This is a complex method.');
  }
};

complexObject.complexMethod();
complexObject.property2.nestedMethod();

// Example of a closure
function outerFunction(number1) {
  return function innerFunction(number2) {
    return number1 + number2;
  }
}

const closure = outerFunction(5);
console.log(closure(10));

// Promises example
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function delayedGreeting() {
  await delay(2000);
  console.log('Delayed greeting after 2 seconds!');
}

delayedGreeting();

// REST parameters
function sum(...args) {
  return args.reduce((a, b) => a + b);
}

console.log(sum(1, 2, 3, 4, 5));

// Exporting modules
export { Person, factorial };

// Importing modules
import { Person, factorial } from './modules';

// Template literals
const greeting = (name) => `Hello, ${name}!`;

console.log(greeting('World'));

// ... (continued code)