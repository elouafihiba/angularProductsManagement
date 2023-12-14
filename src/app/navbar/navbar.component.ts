import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {AppStateService} from "../services/app-state.service";
import {LoadingService} from "../services/loading.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    ReactiveFormsModule,
    NavbarComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  actions : Array<any>=[
    {title :"Home","route":"/admin/home",icon:"house"},
    {title :"Products","route":"/admin/products",icon:"search"},
    {title :"NewProduct","route":"/admin/newProduct",icon:"safe"}
  ];
  currentAction: any;

  constructor(public appState:AppStateService,
              public loadingService : LoadingService,
              public router :Router) {

  }
  setCurrentAction(action: any) {
    this.currentAction = action;

  }

  logout() {
    this.appState.authState={};
    this.router.navigateByUrl("/login");
  }

  login() {
    this.router.navigateByUrl("/login");
  }
}
