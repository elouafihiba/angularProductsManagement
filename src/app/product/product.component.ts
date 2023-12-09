import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {RouterLink} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

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
  totalPages:number=0;
  pageSize:number=3;
  currentPage:number=1;

  constructor(private productService:ProductService,
              private router:Router,
              public appState: AppStateService) {
  }
  ngOnInit() {
  this.searchProducts();
  }
  searchProducts(){
    /*this.appState.setProductState({
      status : "LOADING"
    });*/
    this.productService.searchProducts(
      this.appState.productState.keyword,
      this.appState.productState.currentPage,
      this.appState.productState.pageSize)
      .subscribe({
        next:(resp) =>
        {
          //this.appState.productState.products=resp.body as Product[];
          let products=resp.body as Product[];
          let totalProducts:number=parseInt(resp.headers.get('x-total-count')!);
          //this.appState.productState.totaleProducts=totalProducts;
          //this.appState.productState.totalePages =
          let totalPages=
            Math.floor(totalProducts / this.appState.productState.pageSize);
          if (totalProducts % this.appState.productState.pageSize !=0 ) {
            //++this.appState.productState.totalePages;
            ++totalPages;
          }
          this.appState.setProductState({
            products :products,
            totalProducts : totalProducts,
            totalPages : totalPages,
            status : "LOADED"
          })
        },
        error:err => {
          this.appState.setProductState({
            status : "ERROR",
            errorMessage :err
          })        }

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
        //this.appState.productState.products=
          //this.appState.productState.products.filter((p:any)=>p.id!=product.id);
        this.searchProducts();
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
    this.appState.productState.currentPage=page;
    this.searchProducts();
  }

  handleEdit(product: Product) {
  this.router.navigateByUrl(`/admin/editProduct/${product.id}`)
  }
}
