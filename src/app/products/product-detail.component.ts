import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product!: IProduct;
  imageWidth: number = 200;
  imageMargin: number = 2;
  errorMessage: string = '';
  sub!: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Initialize product with corresponding id
    this.sub = this.productService.getProducts().subscribe({
      next: productsFromHTTP =>
      {
        // Loop over all products
        productsFromHTTP.forEach(productInHTTP => {
          if(productInHTTP.productId == id)
          {
            this.product = productInHTTP;
          }
        });
      },
        error: err => this.errorMessage = err
    });
  }

  onBack(): void
  {
    this.router.navigate(['/products']);
  }
}
