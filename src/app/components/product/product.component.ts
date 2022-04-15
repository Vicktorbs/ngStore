import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product.models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() prodcut: Product = {
    id: '',
    title: '',
    images: [''],
    price: 0,
    description: '',
    category: {
      id: 0,
      name: ''
    }
  }
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();

  constructor() { }

  onAddToCart() {
    this.addedProduct.emit(this.prodcut)
  }

  onShowDetail() {
    this.showProduct.emit(this.prodcut.id);
  }

}
