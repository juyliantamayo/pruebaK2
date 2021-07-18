import { NgModule } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InsertLanzadorComponent } from './components/insert-lanzador/insert-lanzador.component';
import { LoginComponent } from './components/login/login.component';
import { ThrowComponent } from './components/throw/throw.component';

const routes: Routes = [{component:LoginComponent,path:''},{component:DashboardComponent,path:"insert",children:[{component:ThrowComponent,path:''}]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
 
})
export class AppRoutingModule { }
