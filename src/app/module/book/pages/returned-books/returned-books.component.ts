import { Component, OnInit } from '@angular/core';
import { BorrowedBookResponse, PageResponseBorrowedBookResponse } from '../../../../services/models';
import { BookService } from '../../../../services/services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-returned-books',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './returned-books.component.html',
  styleUrl: './returned-books.component.scss'
})
export class ReturnedBooksComponent implements OnInit{


  returnedBooks : PageResponseBorrowedBookResponse = {};
  page = 0;
  size = 5;
  message : string = '';
  level : string = 'success';

  constructor(
    private bookService: BookService
    ){

  }

  ngOnInit(): void {
    this.findAllReturnedBooks();
  }
  findAllReturnedBooks() {
    this.bookService.findAllReturnedBooks({
      page : this.page,
      size : this.size
    }).subscribe({
      next : (resp) => {
        this.returnedBooks = resp;
      }
    })
  }
  approveBookReturn(book: BorrowedBookResponse) {
    if (!book.returned){
      this.level = 'error';
      this.message = 'The book is not yet returned';
      return;
    }
    this.bookService.approveReturnBorrowBook({
      "book-id": book.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Book return was approuved';
        this.findAllReturnedBooks();
      }
    })
    }

  goToFirstPage(){
    this.page = 0;
    this.findAllReturnedBooks();
  }

  goToPreviousPage(){
    this.page--;
    this.findAllReturnedBooks();
  }

  goToPage(page : number){
    this.page = page;
    this.findAllReturnedBooks();
  }

  goToNextPage(){
    this.page++;
    this.findAllReturnedBooks();
  }

  goToLastPage(){
    this.page = this.returnedBooks.totalPages as number - 1;
    this.findAllReturnedBooks();
  }

  get isLastPage() : boolean{
    return this.page == this.returnedBooks.totalPages as number - 1;
  }

}
