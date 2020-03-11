import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import {
    NbAuthComponent,
    NbLoginComponent,
    NbLogoutComponent,
    NbRegisterComponent,
    NbRequestPasswordComponent,
    NbResetPasswordComponent,
} from '@nebular/auth';
import { AuthGuard } from './_helpers/auth.guard';
import { RegisterComponent, LoginComponent } from './pages/common';

const routes: Routes = [
    {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
        // canActivate: [AuthGuard]
    },
    {
        path: 'auth',
        component: NbAuthComponent,
        children: [
            { path: '', component: LoginComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'register-1', component: NbRegisterComponent },
            { path: 'logout', component: NbLogoutComponent },
            { path: 'request-password', component: NbRequestPasswordComponent },
            { path: 'reset-password', component: NbResetPasswordComponent },
        ],
    },
    { path: '', redirectTo: 'pages', pathMatch: 'full' },
    { path: '**', redirectTo: 'pages' },
];
const config: ExtraOptions = {
    useHash: false,
};
@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
