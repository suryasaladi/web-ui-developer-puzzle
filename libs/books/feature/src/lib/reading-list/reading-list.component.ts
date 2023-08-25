import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { finishFromReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnInit {
  readingList$ = this.store.select(getReadingList);
  item:any

  constructor(private readonly store: Store) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  ngOnInit(): void {
    //this.finishFromReadingList(this.item); // Call the method here
  }

  isObjectEmpty(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }

  finishFromReadingList(item) {
  //  location.reload();
    this.store.dispatch(finishFromReadingList({item}));    
  }
}
