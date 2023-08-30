import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { finishFromReadingList, getReadingList, markAsFinished, removeFromReadingList } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';
// import * as ReadingListActions from '';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnInit {
  readingList$ = this.store.select(getReadingList);
  item:any
  showDateTime: any;

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

 markAsFinished(book: ReadingListItem) {
  this.store.dispatch(markAsFinished({ bookId: book.bookId }));
  
}
}
