import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LauncherService } from 'src/app/service/launcher/launcher.service';
import { InsertLanzadorComponent } from '../insert-lanzador/insert-lanzador.component';

@Component({
  selector: 'app-throw',
  templateUrl: './throw.component.html',
  styleUrls: ['./throw.component.css']
})
export class ThrowComponent implements OnInit {


  constructor(private launcherService: LauncherService, public dialog: MatDialog) { }
  displayedColumns: string[] = ['img', 'name', 'points', "round", "throw"];
  dataSource = [];
  ngOnInit(): void {
    this.launcherService.getLauncher().subscribe((value: DocumentChangeAction<unknown>[]) => {
      this.dataSource = [];
      value.forEach((element: DocumentChangeAction<unknown>) => {
        this.dataSource.push({ "name": element.payload.doc.data()['nombre'], "img": element.payload.doc.data()['pathImg'], "id": element.payload.doc.id, "score": element.payload.doc.data()["score"] == null || undefined ? 0 : this.coutnPoints(element.payload.doc.data()["score"]), "ScoreString": element.payload.doc.data()["score"] })
      })
      this.dataSource = this.dataSource.sort((element1, elemnt2) => {
        if (element1['score'] > elemnt2['score']) {
          return -1;
        }

        if (element1['score'] < elemnt2['score']) {
          return 1;
        }
        let pivotArray: string[] = [element1['name'], elemnt2['name']];
        pivotArray = pivotArray.sort();
        if (pivotArray[0] == element1['name']) {
          return -1
        } else {
          return 1
        }
        return 0;
      })
    })
  }
  coutnPoints(point: string[]) {
    let contador = 0;

    point.forEach((element: string) => {
      element.split('').forEach((score: string, index: number) => {
        if (score == "1") {
          contador++;
          if (index == 4) {
            contador++;
          }
        }
      })
    })
    return contador;
  }

  pushPlayer() {
    this.launcherService.pushLauncher(this.nombre.value, this.file).then((value) => {
  
      
      if (value == "error") {
        alert("the player's name is already in use")
      }else{
        this.nombre.reset()
      }
    });
  }
  openDialog(id: string, score: string[]): void {
    const dialogRef = this.dialog.open(InsertLanzadorComponent, {
      width: "60%",
      data: { id: id, point: score }
    });
  }
  srcResult: any;
  getError(formPivotContro: FormControl) {
    if (formPivotContro.hasError('required')) {
      return 'Please complete this field';
    }
    return '';
  }
  validar() {
    let isValid = false;
    const pattern = new RegExp('^[A-Z]+$', 'i');
    if (!pattern.test(this.nombre.value)) {
      isValid = false;
    } else {
      isValid = true;
    }
  }

  previewFile(event) {
    this.file = event.target.files[0];
  }
  nombre = new FormControl('', [Validators.required, Validators.nullValidator]);
  file: File = null;

}
