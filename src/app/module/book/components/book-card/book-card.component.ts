import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookResponse } from '../../../../services/models/book-response';
import { CommonModule } from '@angular/common';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [ CommonModule, RatingComponent],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
})
export class BookCardComponent {
  private _book: BookResponse = {};
  private _bookCover: string | undefined;
  private _manage = false;

  public get book(): BookResponse {
    return this._book;
  }

  @Input()
  public set book(value: BookResponse) {
    this._book = value;
  }

  public get bookCover(): string | undefined{
    if (this._book.cover){
      return 'data:image/jpg;base64, '+this._book.cover;
    }
    return 'assets/books-cover-default.jpg';
  }

  public get manage(): boolean {
    return this._manage;
  }

  @Input()
  public set manage(value: boolean) {
    this._manage = value;
  }

  @Output() private share :EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private archive :EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private addToWaitingList :EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private borrow :EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private edit :EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private details :EventEmitter<BookResponse> = new EventEmitter<BookResponse>();


  onShowDetails(){
    this.details.emit(this.book);
  }

  onBorrow(){
    this.borrow.emit(this.book);
  }

  onAddToWaitingList(){
    this.addToWaitingList.emit(this.book);
  }

  onEdit(){
    this.edit.emit(this.book);
  }

  onShare(){
    this.share.emit(this.book);
  }

  onArchive(){
    this.archive.emit(this.book);
  }
}
