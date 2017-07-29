import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, 
  FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataProvider {
  constructor(private afDB: AngularFireDatabase) {}

  push(path: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afDB.list(path).push(data).then((firebaseNewData) => {
        // Return the uid created
        const newData: any = firebaseNewData;
        resolve(newData.path.o[newData.path.o.length - 1]);
      }, (error) => {
        reject(error);
      });
    });
  }

  update(path: string, data: any) {
    return this.afDB.object(path).update(data);
  }

  list(path: string, query: any = {}): FirebaseListObservable<any> {
    return this.afDB.list(path, { query });
  }

  object(path: string): FirebaseObjectObservable<any> {
    return this.afDB.object(path);
  }

  remove(path: string) {
    return this.afDB.object(path).remove();
  }
}
