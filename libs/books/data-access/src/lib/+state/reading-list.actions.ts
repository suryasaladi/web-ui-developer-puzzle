import { createAction, props } from '@ngrx/store';
import { Book, ReadingListItem } from '@tmo/shared/models';

export const init = createAction('[Reading List] Initialize');

export const loadReadingListSuccess = createAction(
  '[Reading List API] Load list success',
  props<{ list: ReadingListItem[] }>()
);
export const loadReadingListError = createAction(
  '[Reading List API] Load list error',
  props<{ error: string }>()
);

export const addToReadingList = createAction(
  '[Books Search Results] Add to list',
  props<{ book: Book }>()
);

export const failedAddToReadingList = createAction(
  '[Reading List API] Failed add to list',
  props<{ book: Book }>()
);

export const confirmedAddToReadingList = createAction(
  '[Reading List API] Confirmed add to list',
  props<{ book: Book }>()
);

export const removeFromReadingList = createAction(
  '[Books Search Results] Remove from list',
  props<{ item: ReadingListItem }>()
);

export const failedRemoveFromReadingList = createAction(
  '[Reading List API] Failed remove from list',
  props<{ item: ReadingListItem }>()
);

export const confirmedRemoveFromReadingList = createAction(
  '[Reading List API] Confirmed remove from list',
  props<{ item: ReadingListItem }>()
);

export const finishFromReadingList = createAction(
  '[Books Search Results] Finish from list',
  props<{item: ReadingListItem}>()
);

export const failedToFinishFromReadingList = createAction(
  '[Reading List API] Failed To Finish from list',
  props<{ item: ReadingListItem }>()
);

export const confirmedFinishFromReadingList = createAction(
  '[Reading List API] Confirmed To finish from list',
  props<{ item: ReadingListItem}>()
);

// export const updateReadingListItem = createAction(
//   '[Reading List] Update Item',
//   props<{ index: number; updatedItem: ReadingListItem }>()
// );


export const markAsFinished = createAction(
  '[Reading List] Mark as Finished',
  props<{ bookId: string }>()
);