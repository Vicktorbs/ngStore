import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product.models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() prodcut: Product = {
    id: '',
    name: '',
    image: '',
    price: 0
  }
  @Output() addedProduct = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart() {
    this.addedProduct.emit(this.prodcut)
  }

}
