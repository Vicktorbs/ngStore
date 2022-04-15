import { Component, OnInit } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.models';

import { StoreService } from "../../services/store.service";
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
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
  limit = 10;
  offset = 0;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getProductsByPage(10, 0)
    .subscribe(data => {
      // console.log(data);
      this.products = data;
    })
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
    this.productsService.getProduct(id)
    .subscribe(data => {
      // console.log(data);
      this.toggleProductDetail();
      this.productsChosen = data;
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

  loadMore() {
    this.productsService.getProductsByPage(this.limit, this.offset)
    .subscribe(data => {
      // console.log(data);
      this.products = this.products.concat(data);
      this.offset += this.limit;
    })
  }
}
