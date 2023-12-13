import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  formLogin! : FormGroup;
  errorMessage =undefined;
  constructor(private formBuilder:FormBuilder,
              private router : Router,
              private authService:AuthService) {
  }
  ngOnInit(): void {
    this.formLogin=this.formBuilder.group({
      username : this.formBuilder.control(""),
      password : this.formBuilder.control("")
    })
  }
  handleLogin() {
    let username=this.formLogin.value.username;
    let password=this.formLogin.value.password;
    this.authService.login(username, password)
      .then(resp=>{
        this.router.navigateByUrl("/admin");
      })
      .catch(error=>{
        this.errorMessage=error;
      })
  }

}
