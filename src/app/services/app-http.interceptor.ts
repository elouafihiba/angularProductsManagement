import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {AppStateService} from "./app-state.service";
import {LoadingService} from "./loading.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private appStateService:AppStateService,
              private loadingService:LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /*this.appStateService.setProductState({
      status:"LOADING"
    })*/
    this.loadingService.showLoadingSpiner();
    let reqClone = req.clone({
      headers: req.headers.set("Authorization", "Bearer JWT")
    });

    return next.handle(reqClone).pipe(
      finalize(() => {
        /*this.appStateService.setProductState({
          status: ""
        });*/
        this.loadingService.hideLoadingSpiner();
      })
    );
  }
}
