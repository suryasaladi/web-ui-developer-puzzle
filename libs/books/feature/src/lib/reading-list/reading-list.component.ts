import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { ReadingListBook, addToReadingList, getAllBooks, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { Book, ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnInit {
  readingList$ = this.store.select(getReadingList);
  readBookList: ReadingListItem[];
  books: ReadingListBook[];
  showSnackModal = false;
  // readBookList: ReadingListItem[];
  snackBarMsg = "Remove from reading List!";
  snackAction = "undo";
  bookInReadList;

  constructor(private readonly store: Store, private snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    this.showingSnackbar(item);
  }
  showingSnackbar(selectedBook: ReadingListItem) {
    this.snackBar.dismiss();
    this.showSnackModal = true;
    const snackBarRef =  this.snackBar.open(this.snackBarMsg, this.snackAction,{duration: 3000,}); 
    snackBarRef.afterDismissed().subscribe((actionType) => {
      debugger
      if (actionType.dismissedByAction) {
        this.showSnackModal = false;
        const selectedBookInList =  this.books.find((sbook) => sbook.id === selectedBook.bookId);
        this.addBookToReadingList(selectedBookInList);
      }
    });
  }
  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

 ngOnInit(): void {
  this.store.select(getAllBooks).subscribe(books => {
    this.books = books;
  });
 }

  isObjectEmpty(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }
}
