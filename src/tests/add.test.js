const add = (a,b) => a+b;
const generateGreeting = (name) => `Hello ${name}`;

test('should add two numbers', () => {
  const result = add(3,4);

  expect(result).toBe(7);
  // if (result !== 7) {
  //   throw new Error(`Added 4 and 3. Result was ${result}. Expect 7`);
  // }
});

test('should say Hello <name>', () =>{
  const greeting = generateGreeting('Kyr');

  expect(greeting).toBe(`Hello Kyr`);
});


