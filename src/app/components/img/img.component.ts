import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit {

  img: string = '';
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

  ngOnChanges(changes: SimpleChanges): void {
    // before - during render
    // changes inputs -- multiples times ca vez que se actualice un input
  }

  ngOnInit(): void {
    // before render
    // async - fetch -- once time
    this.counterFn = window.setInterval(() => {
      this.counter += 1;
      console.log('running counter');
    }, 1000)
  }

  ngAfterViewInit() {
    // after render
    // handler children -- once time
  }

  ngOnDestroy() {
    // delete -- once time
    window.clearInterval(this.counterFn)
  }

  imgError() {
    this.img = this.imageDefault
  }

  igmLoad() {
    console.log('Log hijo');
    this.loaded.emit(this.img)
  }

}
