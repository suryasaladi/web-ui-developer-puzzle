import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  getReadingList,
  ReadingListBook,
  removeFromReadingList,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];
  readBookList: ReadingListItem[];
  snackBarMsg = "want to read!";
  snackAction = "undo";
  showSnackModal = false;
  bookInReadList;

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
      this.store.select(getReadingList).subscribe(readBook => {
        this.readBookList = readBook;
       });
    });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
    this.showingSnack(book);
  }

  showingSnack(selectedBook: Book) {
    this.snackBar.dismiss();
    this.showSnackModal = true;
    const snackBarRef =  this.snackBar.open(this.snackBarMsg, this.snackAction,{duration: 3000,});
    snackBarRef.afterDismissed().subscribe((actionType) => {
      if (actionType.dismissedByAction) {
      this.showSnackModal = false;
        if (this.readBookList.length) {
          const bookInReadList = this.readBookList.find((b: ReadingListItem) => b.bookId === selectedBook.id);
          if (bookInReadList !== undefined) {
            this.removeFromReadingList(bookInReadList);
          }
        }
      }
    });
  }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  onSearch(term:string):void{
    this.store.dispatch(searchBooks({term}));
  }
}
