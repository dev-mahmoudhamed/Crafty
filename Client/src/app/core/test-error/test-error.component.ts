import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent {
  baseUrl = environment.apiUrl;
  validationErrors: string[] = [];

  constructor(private http: HttpClient) { }

  get404Error() {
    this.http.get(this.baseUrl + 'products/555').subscribe({
      next: response => console.log(response),
      error: error => console.error(error)
    });
  }
  get500Error() {
    this.http.get(this.baseUrl + 'buggy/serverError').subscribe({
      next: response => console.log(response),
      error: error => console.error(error)
    });
  }
  get400Error() {
    this.http.get(this.baseUrl + 'buggy/badRequest').subscribe({
      next: response => console.log(response),
      error: error => console.error(error)
    });
  }
  get400ValidationError() {
    this.http.get(this.baseUrl + 'products/xyzProduct').subscribe({
      next: response => console.log(response),
      error: error => {
        console.error(error);
        this.validationErrors = error.errors;
      }
    });
  }
}
