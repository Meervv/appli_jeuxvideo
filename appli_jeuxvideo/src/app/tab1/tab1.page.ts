import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {

  jeuData: any = [];
  id = this.actRoute.snapshot.params['id'];

  constructor(private http: HttpClient, private router: Router, private actRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getAllJeux().subscribe(res=>this.jeuData=res);
  }

  getAllJeux() : Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/jeux').pipe(retry(1), catchError(this.handleError));
  }

  getJeu(id: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/jeux/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  supprimerJeu(jeu) {
    if(window.confirm('Voulez-vous supprimer le jeu ?')){
      this.deleteJeu(jeu.id).subscribe(data => {
        this.router.navigate(['/tabs/tab1'])
      })
    }
  }
  
  deleteJeu(id: any): Observable<any> {
    return this.http.delete('http://localhost:3000/api/jeux/' + id, this.jeuData)
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
