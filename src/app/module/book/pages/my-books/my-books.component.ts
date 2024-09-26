import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/services/book.service';
import { Router, RouterModule } from '@angular/router';
import { PageResponseBookResponse } from '../../../../services/models/page-response-book-response';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { CommonModule } from '@angular/common';
import { BookResponse } from '../../../../services/models';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [BookCardComponent, CommonModule, RouterModule],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent implements OnInit{
  bookResponse: PageResponseBookResponse = {};
   page = 0;
   size = 1;

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
    this.bookService.findAllBooksByOwner({
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

  archiveBook(book : BookResponse){
    this.bookService.updateArchivedStatus({
      'book-id': book.id as number
    }).subscribe({
      next: () =>{
        book.archived = !book.archived;
      }
    })
  }

  shareBook(book : BookResponse){
    this.bookService.updateShareableStatus({
      'book-id' : book.id as number
    }).subscribe({
      next: () => {
        book.shareable = !book.shareable;
      }
    });
  }

  editBook(book : BookResponse){
    this.router.navigate(['book', 'manage', book.id]);
  }

}
