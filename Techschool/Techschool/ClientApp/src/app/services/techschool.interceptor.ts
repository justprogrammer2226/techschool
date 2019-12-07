import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";

export class TechschoolInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const reqWithNewUrl = req.clone({ setHeaders: { 'Content-Type': 'application/json' } });
    const token = localStorage.getItem('techschool-token');
    if (token) {
      const bearer = `Bearer ${token}`;
      const authReq = reqWithNewUrl.clone({
        setHeaders: {
          Authorization: bearer
        }
      });
      return next.handle(authReq);
    }
    return next.handle(reqWithNewUrl);
  }
}
