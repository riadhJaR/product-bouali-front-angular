import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';

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
    }
];
