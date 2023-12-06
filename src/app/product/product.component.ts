import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  products :Array<any> =[];
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
  }

  handleCheckProduct(product: any) {
    this.productService.checkProduct(product).subscribe({
      next :updatedProduct => {
        product.checked=!product.checked;
        //this.getProducts();
      }
    })
    product.checked=!product.checked;

  }
}
