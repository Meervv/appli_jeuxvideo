import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-jeu-delete',
  templateUrl: './jeu-delete.component.html',
  styleUrls: ['./jeu-delete.component.scss'],
})
export class JeuDeleteComponent implements OnInit {

  jeuData: any = [];
  id = this.actRoute.snapshot.params['id'];

  constructor(public router: Router, private http: HttpClient, private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.deleteJeu(this.id).subscribe((data: {}) => {
      this.jeuData = data;
    })
  }

  deleteJeu(id: any): Observable<any> {
    return this.http.delete<any>('http://localhost:3000/api/jeux/' + this.id);
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
