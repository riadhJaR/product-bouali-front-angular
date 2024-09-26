import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { BooksComponent } from './modules/books/books.component';
import { ListComponent} from './modules/books/list/list.component';

export const routes: Routes = [
    {
        path : 'login',
        component: LoginComponent,
        title: 'Login Page'
    },
    {
        path : 'register',
        component: RegisterComponent,
        title: 'Login Page'
    },
    {
        path : 'activate-account',
        component: ActivateAccountComponent,
        title: 'Activate Account'
    },
    { 
        path: 'book', 
        loadChildren: () => import('./module/book/book.module').then(m => m.BookModule) 
      },
    {
        path: 'books',
        component: BooksComponent,
        children: [
         // { path: 'add', component: AddComponent },
          { path: 'list', component: ListComponent },
         // { path: 'details/:id', component: DetailsComponent },
        ]
      },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
];
