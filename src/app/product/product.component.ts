import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  public products :Array<Product>=[];
  public keyword : string="";
  totalePages:number=0;
  pageSize:number=3;
  currentPage:number=1;

  constructor(private productService:ProductService,
              private router:Router) {
  }
  ngOnInit() {
  this.searchProducts();
  }
  searchProducts(){

    this.productService.searchProducts(this.keyword,this.currentPage,this.pageSize)
      .subscribe({
        next:(resp) =>
        {
          this.products=resp.body as Product[];
          let totalProducts:number = parseInt(resp.headers.get('x-total-count')!);
          this.totalePages = Math.floor(totalProducts / this.pageSize);
          if (totalProducts % this.pageSize !=0)
          {
            this.totalePages=this.totalePages+1;
          }
        },
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

  /*searchProducts() {
    this.currentPage=1;
    this.totalePages=0;
    this.productService.searchProducts(this.keyword, this.currentPage,this.pageSize).subscribe({
      next : value => {
        this.products=value;
      }
    })

  }*/

  handleGoTopage(page: number) {
    this.currentPage=page;
    this.searchProducts();
  }

  handleEdit(product: Product) {
  this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
}
