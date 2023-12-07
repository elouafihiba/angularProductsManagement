import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  public products :Array<Product>=[];
  public keyword : string="";
  constructor(private productService:ProductService) {
  }
  ngOnInit() {
  this.getProducts();
  }
  getProducts(){

    this.productService.getProducts()
      .subscribe({
        next:data =>this.products=data,
        error:err => {
          console.log(err);
        }

      })

    //this.products=this.productService.getProducts();
  }

  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next: updatedProduct => {
        product.checked = !product.checked;
        //this.getProducts();
      }
    })
    product.checked = !product.checked;

  }

  handleDelete(product: Product) {
    if(confirm("Are you sure ?"))
    this.productService.deleteProduct(product).subscribe({
      next:value => {
        //this.getProducts();
        this.products=this.products.filter(p=>p.id!=product.id)
      }
  })
}

  searchProducts() {
    this.productService.searchProducts(this.keyword).subscribe({
      next : value => {
        this.products=value;
      }
    })

  }
}
