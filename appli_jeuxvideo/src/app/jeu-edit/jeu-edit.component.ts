import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { retry, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-jeu-edit',
  templateUrl: './jeu-edit.component.html',
  styleUrls: ['./jeu-edit.component.scss'],
})

export class JeuEditComponent implements OnInit {
  jeuData: any = [];
  id = this.actRoute.snapshot.params['id'];

  constructor(private actRoute: ActivatedRoute, private http: HttpClient, public router: Router) {
  }

  ngOnInit() {
    this.getJeu(this.id).subscribe((data: {}) => {
      this.jeuData = data;
    })
  }

  modifierJeu() {
    if(window.confirm('Voulez-vous modifier le jeu ?')){
      this.updateJeu(this.id, this.jeuData).subscribe(data => {
        this.router.navigate(['/tabs/tab1'])
      })
    }
  }

  updateJeu(id: any, jeu: any): Observable<any> {
    return this.http.put<any>('http://localhost:3000/api/jeux/' + id, this.jeuData)
      .pipe(retry(1), catchError(this.handleError));
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
