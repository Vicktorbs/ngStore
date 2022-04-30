import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {

  img: string = '';
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    // Code
  }
  @Input() alt: string = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault = './assets/img/bike.jpg'
  counter = 0;
  counterFn: number | undefined;

  constructor() {
    // Before render y no se deben usar operaciones asincronas - solo corre una vez
  }

  imgError() {
    this.img = this.imageDefault
  }

  igmLoad() {
    // console.log('Log hijo');
    this.loaded.emit(this.img)
  }

}
