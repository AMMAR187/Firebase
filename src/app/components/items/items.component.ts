import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../modules/module';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[];
  editState: boolean = false;
  itemToEdit: Item;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItem().subscribe(item => {
      this.items = item;
    });
  }
  deleteItem(event, item: Item) {
    this.clear();
    this.itemService.deleteItem(item);
  }
  updateItem(item: Item) {
    this.itemService.updateItem(item);
    this.clear();
  }
  editItem(event, item: Item) {
    this.editState = true;
    this.itemToEdit = item;
  }
  clear() {
    this.editState = false;
    this.itemToEdit = null;
  }

}
