import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  productId!:number;
  productFormGroup! : FormGroup;
  constructor(private activatedRoute : ActivatedRoute,
              private productService:ProductService,
              private fb:FormBuilder) {
  }
  ngOnInit(): void {
    this.productId=this.activatedRoute.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe({
      next :(product)=>{
      this.productFormGroup=this.fb.group({
        id : this.fb.control(product.id),
        name : this.fb.control(product.name),
        price : this.fb.control(product.price),
        checked : this.fb.control(product.checked),
      })
      },error:err => {
      console.log(err);
      }
    });
  }

  updateProduct() {

  }
}
