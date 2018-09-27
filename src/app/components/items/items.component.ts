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
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItem().subscribe(item => {
      this.items = item;
    });
  }
  deleteItem(event, item) {
    this.itemService.deleteItem(item);
  }

}
