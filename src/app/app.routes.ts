import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProductComponent} from "./product/product.component";
import {NewProductComponent} from "./new-product/new-product.component";
import {EditProductComponent} from "./edit-product/edit-product.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";

export const routes: Routes = [
  {path:"login",component:LoginComponent,},
  {
    path:"admin",component:AdminTemplateComponent,
    //canActivate:[AuthenticationGuard],
    children : [
      {path:"products",component:ProductComponent,},
      {path:"newProduct", component:NewProductComponent ,
        //canActivate:[AuthorizationGuard],
        //data :{requiredRoles :'ADMIN'}
      },
      {path:"editProduct/:id",component:EditProductComponent,
        //canActivate:[AuthorizationGuard],
        //data :{requiredRoles :'ADMIN'}
      },
      {path:"home",component:HomeComponent},
      {path:"notAuthorized",component:NotAuthorizedComponent,},
    ]
  },
  {path:"",redirectTo:"login",pathMatch:'full'}




];


