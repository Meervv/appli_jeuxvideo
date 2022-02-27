import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { JeuDetailComponent } from './jeu-detail/jeu-detail.component';
import { JeuEditComponent } from './jeu-edit/jeu-edit.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'jeu-detail/:id', component: JeuDetailComponent },
  { path: 'jeu-edit/:id', component: JeuEditComponent },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
