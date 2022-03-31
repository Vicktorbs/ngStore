const username: string | number = 'viktorbs';
const sum = (a: number, b: number) => {
  return a + b;
}
sum(1,2);

class Persona {
  age: number;
  lastName: string;

  constructor(age: number, lastName: string) {
    this.age = age;
    this.lastName = lastName
  }
}
class Persona1 {
  constructor(public age: number, public lastName: string) { }
}

const nico = new Persona(20, 'Solis')
const nico1 = new Persona1(20, 'Solis')
