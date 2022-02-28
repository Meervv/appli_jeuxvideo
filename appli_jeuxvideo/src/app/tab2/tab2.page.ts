import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {  Observable } from 'rxjs';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
  @Input() jeuDetails = {
    libelle: '', 
    annee: '',
    description: '',
    crossPlateforme: '',
    genre: '',
    plateforme: '',
    type: ''
  };

  form: FormGroup;

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
