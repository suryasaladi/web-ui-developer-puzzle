import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, getTotalUnread } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-total-count',
  templateUrl: './total-count.component.html',
  styleUrls: ['./total-count.component.scss']
})
export class TotalCountComponent implements OnInit {
  totalUnread$ = this.store.select(getTotalUnread);
  readBookList: ReadingListItem[];

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.select(getReadingList).subscribe(readBook => {
      this.readBookList = readBook;
     });
  }

  getCount(count: number) {
    if (this.readBookList.length
     && Object.keys(this.readBookList[0]).length === 0) {
     return count - 1;
    } else {
     return count;
    }
   }
}
