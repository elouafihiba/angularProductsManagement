import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {AppStateService} from "../services/app-state.service";

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
    {title :"Home","route":"/home",icon:"house"},
    {title :"Products","route":"/products",icon:"search"},
    {title :"NewProduct","route":"/newProduct",icon:"safe"}
  ];
  currentAction: any;
  constructor(public appState:AppStateService) {

  }
  setCurrentAction(action: any) {
    this.currentAction = action;

  }

}
