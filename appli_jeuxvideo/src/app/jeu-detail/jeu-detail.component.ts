import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-jeu-detail',
  templateUrl: './jeu-detail.component.html',
  styleUrls: ['./jeu-detail.component.scss'],
})

export class JeuDetailComponent implements OnInit {
  jeuData: any = [];
  id = this.actRoute.snapshot.params['id'];

  constructor(private actRoute: ActivatedRoute, private http: HttpClient, public router: Router) {}

  ngOnInit() {
    this.getJeu(this.id).subscribe((data: {}) => {
      this.jeuData = data;
    })
  }

  getJeu(id: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/jeux/' + id)
      .pipe(retry(1), catchError(this.handleError));
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
