import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Item } from '../modules/module';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;

  constructor(private afs: AngularFirestore) {
    //this.items = afs.collection('items').valuechanges();
    this.itemCollection = afs.collection('items', ref => ref.orderBy('title', 'asc'));
    this.items = this.itemCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      });
    })
    );
  }
  getItem() {
    return this.items;
  }
  addItem(item: Item) {
    this.itemCollection.add(item);
  }
  deleteItem(item: Item) {
    this.itemDoc = this.afs.doc(`titles/${item.id}`)
    this.itemDoc.delete();
  }
}


