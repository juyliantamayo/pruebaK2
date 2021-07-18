import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LauncherService {
  async addPoint(id: string, point: string[]) {
    await this.angularFirestore.collection("launcher").doc(id).update({ 'score': point })
  }

  constructor(private angularFirestore: AngularFirestore, private angularFireStorage: AngularFireStorage) { }

  async pushLauncher(nombre: string, filer: File,):Promise<any> {
    let stringReturn="";
    await this.angularFirestore.collection("launcher", ref => ref.where('nombre', "==", nombre)).get().toPromise().then(async (whereData: QuerySnapshot<unknown>) => {
   
      
      if (whereData.docs.length > 0) {
       
        
        stringReturn= "error"
      } else {
        await this.angularFirestore.collection("launcher").add({ "nombre": nombre, 'pathImg': "", "score": [] }).then(async (refLauncher: DocumentReference) => {
          await this.angularFireStorage.upload(refLauncher.path, filer).then(async (refImg: UploadTaskSnapshot) => {
            await this.angularFirestore.collection("launcher").doc(refLauncher.id).update({ 'pathImg': await refImg.ref.getDownloadURL() })
          })
        });
      }
    })
return stringReturn;
  }
  public getLauncher(): Observable<DocumentChangeAction<unknown>[]> {
    return this.angularFirestore.collection("launcher").snapshotChanges()
  }

}
