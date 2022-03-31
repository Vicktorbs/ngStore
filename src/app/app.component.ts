import { Component } from '@angular/core';

import { Product } from './product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'Victor';
  age = 25;
  img = 'https://www.w3schools.com/howto/img_avatar.png';
  btnDisabled = true;
  person = {
    name: 'Victor',
    age: 25,
    avatar: 'https://www.w3schools.com/howto/img_avatar.png'
  }
  emojis = [ '😂' , '🐦', '🐳','🌮', '💚']
  names: string[] = ['Victor', 'Brenda', 'Fernanda', 'Maria']
  newName = '';
  products: Product[] = [
    {
      name: 'EL mejor juguete',
      price: 565,
      image: './assets/img/toy.jpg',
      category: 'all',
    },
    {
      name: 'Bicicleta casi nueva',
      price: 356,
      image: './assets/img/bike.jpg'
    },
    {
      name: 'Colleción de albumnes',
      price: 34,
      image: './assets/img/album.jpg'
    },
    {
      name: 'Mis libros',
      price: 23,
      image: './assets/img/books.jpg'
    },
    {
      name: 'Casa para perro',
      price: 34,
      image: './assets/img/house.jpg'
    },
    {
      name: 'Gafas',
      price: 3434,
      image: './assets/img/glasses.jpg'
    }
  ]

  toggleButton() {
    this.btnDisabled = !this.btnDisabled;
  }

  ageIncrease() {
    this.person.age += 1;
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    console.log(element.scrollTop);
  }

  changeName(event: Event) {
    const element = event.target as HTMLInputElement;
    this.person.name = element.value;
  }

  addName() {
    this.names.push(this.newName);
    this.newName = '';
  }

  deleteName(index: number) {
    this.names.splice(index, 1)
  }
}
