import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../../services/services';
import { Router } from '@angular/router';
import { BookResponse, PageResponseBookResponse } from '../../../../services/models';
import { BookCardComponent } from '../../components/book-card/book-card.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit{

  bookResponse: PageResponseBookResponse = {};
   page = 0;
   size = 1;
   message : string = '';
   level : string = 'success';

  constructor(
    private bookService: BookService,
    private router: Router
  ){

  }
  ngOnInit(): void {
    this.findAllBooks();
      }
  findAllBooks() {
    //debugger;
    this.bookService.findAllBooks({
      page : this.page,
      size: this.size
    }).subscribe({
      next: (books) => {
        this.bookResponse = books;
      }
    });
  }

  goToFirstPage(){
    this.page = 0;
    this.findAllBooks();
  }

  goToPreviousPage(){
    this.page--;
    this.findAllBooks();
  }

  goToPage(page : number){
    this.page = page;
    this.findAllBooks();
  }

  goToNextPage(){
    this.page++;
    this.findAllBooks();
  }

  goToLastPage(){
    this.page = this.bookResponse.totalPages as number - 1;
    this.findAllBooks();
  }

  get isLastPage() : boolean{
    return this.page == this.bookResponse.totalPages as number - 1;
  }

  borrowBook(book: BookResponse){
    this.message = '';
    this.bookService.borrowBook({
      'book-id' : book.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Book successfully addes to your list';
      },
      error : (err) => {
        console.log(err);
        this.level='error';
        this.message = err.error.error;
      }

    })
  }
}
