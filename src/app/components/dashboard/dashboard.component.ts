import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  states: any[] = [];
  sleectFormControll: FormControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  closeSiedenav: boolean = false;
  centroCostos: any[] = [];
  selectedStates = this.states;
  pagina: string="" ;
  withSidebar = '15%';


 
  
  constructor( private router: Router) { }
  links = [
    {
      name: 'Insert Launcher',
      url: 'insert',
      enuso: true,
 
    },
    {
      name: 'Throw',
      url: 'throw',
      enuso: false,
 
    }
   /*{
      name: 'Empleado',
      url: 'empleado',
      enuso: true,
      visible: 2
    },
    {
      name: 'Forma de pago',
      url: 'formaPago',
      enuso: false,
      visible: 3
    },
    {
      name: 'Jornada',
      url: 'jornada',
      enuso: false,
      visible: 4
    },
    {
      name: 'Asignacion de jornada',
      url: 'asignacionJornada',
      enuso: false,
      visible: 5
    },
    {
      name: 'visualizar jornada',
      url: 'visualizarJornada',
      enuso: false,
      visible: 6
    },*/
  ];
   mediaQueryWith() {
   
    !(screen.width < 1024)
      ? (this.withSidebar = '20%')
      : (this.withSidebar = '35%');
    return !(screen.width < 1024) ? 'side' : 'over';
  }
  ngOnInit(): void {
    
  }
  redireccionamiento(url: string) {
    this.router.navigateByUrl('/dashboard/' + url);

    const linkspivot:any[] = [];
    this.links.forEach((element) => {
      const elementPivot = element;
      elementPivot.enuso = false;
      if (elementPivot.url == url) {
        elementPivot.enuso = true;
      }

      linkspivot.push(elementPivot);
    });
    this.links = linkspivot;
    this.pagina = this.links.find((element) => {
      return element.enuso;
    }).name;
  }
 

}
