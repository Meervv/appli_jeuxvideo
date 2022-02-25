import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  jeuData: any = {};

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.loadJeux();
  }

  loadJeux() {
    return this.getAll().subscribe((res: any) => {
      this.jeuData = res;
    });
  }

  getAll() : Observable<any> {
    return this.http.get<any>('http://localhost:3000/list/jeux').pipe(retry(1), catchError(this.handleError));
  }

  submit() {
    this.http.post('http://localhost:3000/new/jeux', this.jeuData).subscribe((res: any) => {
      console.log(res);
    })
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
