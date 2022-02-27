import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {  Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-jeu-create',
  templateUrl: './jeu-create.component.html',
  styleUrls: ['./jeu-create.component.scss'],
})

export class JeuCreateComponent implements OnInit {
  @Input() jeuDetails = { 
    libelle: '', 
    annee: '',
    description: '',
    crossPlateforme: '',
    genre: '',
    plateforme: '',
    type: ''
  };

  constructor(public router: Router, private http: HttpClient) {}

  ngOnInit() {}

  addEmployee(dataEmployee: any) {
    this.createJeu(this.jeuDetails).subscribe((data: {}) => {
      this.router.navigate(['/tabs/tab1']);
    });
  }

  createJeu(jeu: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/jeux', jeu);
  }
}
