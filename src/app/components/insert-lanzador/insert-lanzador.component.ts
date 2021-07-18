import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LauncherService } from 'src/app/service/launcher/launcher.service';
export interface DialogData {

  id: string;
  point:string[]
}
@Component({
  selector: 'app-insert-lanzador',
  templateUrl: './insert-lanzador.component.html',
  styleUrls: ['./insert-lanzador.component.css']
})
export class InsertLanzadorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InsertLanzadorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private launcherService: LauncherService) { }
  tiros: boolean[] = [false, false, false, false, false]

  ngOnInit(): void {
  }
alphaOnly(event) {
  var key = event.keyCode;
  return ((key >= 65 && key <= 90) || key == 8);
}
  pushLauncher() {
    let stringPivot = "";
    this.tiros.forEach(element => {
      if (element) {
        stringPivot += "1"
      } else {
        stringPivot += "0"
      }
    });
    this.data.point.push(stringPivot)

    this.launcherService.addPoint(this.data.id,this.data.point).then(()=>{
      this.dialogRef.close();
    })
  }

}



