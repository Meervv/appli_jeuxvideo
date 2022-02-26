import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {

  jeuData: any = [];

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.getAll().subscribe(res=>this.jeuData=res);
  }

  getAll() : Observable<any> {
    return this.http.get<any>('http://localhost:3000/list/jeux').pipe(retry(1), catchError(this.handleError));
  }

  navigate(){
    this.router.navigate(['/detail-jeu'])
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
