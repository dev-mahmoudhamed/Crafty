import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from './models/products';
import { Pagination } from './models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Crafty';
  products?: Product[];


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let url = "https://localhost:7007/api/products?pageSize=50";

    this.http.get<Pagination<Product[]>>(url).subscribe({
      next: (response) => this.products = response.data,
      error: (err) => console.log(err)
    });
  }
}
