import { AngularFireStorage } from 'angularfire2/storage';
import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { TokenStorageService } from '../auth/token-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  uploadPercent: Observable<number>;

  constructor(
    private spinner: NgxSpinnerService,
    private token: TokenStorageService,
    private angularStorage: AngularFireStorage
  ) { }

  uploadFile(path, name, file): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.spinner.show();
        const filePath = path + '/' + name;
        /** spinner ends after 5 seconds */
        const task = this.angularStorage.upload(filePath, file);
        // observe percentage changes
        this.uploadPercent = task.percentageChanges();
        task.snapshotChanges().pipe(
          finalize(() => {
            this.spinner.hide();
            resolve(true)
          })
        ).subscribe()
      } catch (err) {
        reject(err)
      }
    })
  }

  loadFile(path, name): Promise<any> {
    return new Promise((resolve, reject) => {
      const storageRef = this.angularStorage.ref(path + '/' + name);
      storageRef.getDownloadURL().subscribe(data => (
        resolve(data)
      ), error => (
        reject(error)
      )
      );
    })
  }

  deleteFile(path): Promise<any> {
    return new Promise((resolve, reject) => {
      const storageRef = this.angularStorage.ref(path + '/' + name);
      storageRef.delete().subscribe(result => (
        resolve(result)
      ),
        error => (
          reject(error)
        )
      );
    })
  }
}
