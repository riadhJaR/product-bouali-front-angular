import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../token/token.service';
import { inject } from '@angular/core';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {

  //debugger;
  const token = inject(TokenService).token;
  if (token){
    const authReq = req.clone({

      /*setHeaders: {
        Authorization : 'Bearer ' + token
      }*/
      headers : new HttpHeaders ({
        Authorization : 'Bearer ' + token
      })
      //headers: req.headers.set('Authorization', 'Bearer ' + token)
    });
    return next(authReq);
  }
  return next(req);

};
