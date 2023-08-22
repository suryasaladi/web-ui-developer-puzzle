

Task 1: Code Fixes and review 

    1.ReadingListComponent ts file in  line number:11 : Specified the type of the readingList$ observable as Observable<ReadingListBook[]> for improved type safety.
    2.TotalCountComponent ts file in line number :15 : Empty ngOnInit: Since you don't have any logic in the ngOnInit method, you can consider removing it unless you plan to add initialization logic in the future.
    3.ReadingListComponent ts file in line number :15: In the method removeFromReadingList type is missing in method parameter
    4.Unsubscription: If the totalUnread$ observable is used in your template to display data, make sure to unsubscribe from it in the ngOnDestroy lifecycle hook to prevent memory leaks. This is especially important when dealing with observables to ensure proper cleanup.
private unsubscribe$ = new Subject<void>();
ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }   

3.Accessibility is an important feature of all public facing websites.
==> Buttons do not have an accessible name.
==>When a button doesn't have an accessible name, screen readers announce it as "button", making it unusable for users who rely on screen readers 
==> Initial we got 90% Accessibilty, after adding "aria-label="Search"" we got 100% Accessibility

4.Missing Accessible Name (book-search.component.html): The button doesn't have an explicit aria-label or visible text content. This means that screen reader users may hear "button" without knowing the purpose of the button. 

==>Missing Accessible Name for Badge(total-count.component.ts): The badge element (<span>) doesn't have an explicit label or text content. Screen reader users might not understand the purpose of the badge. ==>aria-label="Unread Notifications: {{ count }}"

==>Semantic HTML Element:
You're using a semantic element (<span>) for the badge, which is suitable. However, the lack of content within the <span> might not be clear to screen reader users.
