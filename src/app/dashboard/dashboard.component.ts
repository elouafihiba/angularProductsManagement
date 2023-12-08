import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{

  constructor(public appState : AppStateService) {

  }

  totaleCheckedProducts() {
    let checkedProducts =
      this.appState.productState.products.filter((p:any) => p.checked == true);
    return checkedProducts.length;
  }
}
