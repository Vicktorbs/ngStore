import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.models';

import { StoreService } from "../../services/store.service";
import { ProductsService } from '../../services/products.service';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  @Input() products: Product[] = [];
  // @Input() productId: string | null = null;
  @Input()
  set productId(id: string | null) {
    if (id) {
      this.onShowDetail(id)
    }
  }
  @Output() loadMore = new EventEmitter();

  myShoppingCart: Product[] = [];
  total = 0;
  showProductDetail = false;
  productsChosen: Product = {
    id: '',
    title: '',
    images: [''],
    price: 0,
    description: '',
    category: {
      id: 0,
      name: ''
    }
  };
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  onAddToShoppingCart(product: Product) {
    // console.log(product);
    this.storeService.addProduct(product)
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    if (!this.showProductDetail) {
      this.showProductDetail = true;
    }
    // this.toggleProductDetail();
    this.productsService.getProduct(id)
    .subscribe(data => {
      this.productsChosen = data;
      this.statusDetail = 'success';
    }, errorMsg => {
      window.alert(errorMsg);
      this.statusDetail = 'error';
    })
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo prodcuto',
      description: 'bla bla bla',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 1000,
      categoryId: 2,
    }
    this.productsService.create(product)
    .subscribe(data => {
      // console.log('created ', data);
      this.products.unshift(data)
    })
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'nuevo titulo',
    }
    const id = this.productsChosen.id;
    this.productsService.update(id, changes)
    .subscribe(data => {
      // console.log('updated ', data);
      const productIndex = this.products.findIndex(item => item.id === this.productsChosen.id);
      this.products[productIndex] = data;
    })
  }

  deleteProduct() {
    const id = this.productsChosen.id;
    this.productsService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productsChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false
    });
  }

  onLoadMore() {
    this.loadMore.emit();
  }
}
