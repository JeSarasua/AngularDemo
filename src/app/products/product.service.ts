import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, concatAll, tap, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService
{
  // To pull data from a back-end web server, simply change this Url
  private productUrl = 'api/products/products.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]>
  {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // getProductDetail(productID: number): Observable<IProduct>
  // {
  //   // Get all products
  //   // Filter for the specific productID
  //   this.getProducts().forEach(product => {
  //     if(product.productId)
  //   });

  //   // Return the specific product detail
  //   return this.http.get<IProduct>(this.productUrl)
  // }


  private handleError(err: HttpErrorResponse)
  {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent)
    {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    }
    else
    {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(()=>errorMessage);
  }
}
