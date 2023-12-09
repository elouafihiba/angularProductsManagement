import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {AppErrorsComponent} from "../app-errors/app-errors.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AppErrorsComponent, DashboardComponent, NavbarComponent],
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent {

}
