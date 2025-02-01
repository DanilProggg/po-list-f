import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { AuthGuardService, authGuard } from './core/services/auth.guard.service';
import { SigninComponent } from './core/auth/signin/signin.component';

export const routes: Routes = [
    {   
        path: '',
        component:UserComponent,
        loadChildren: () => import('./user/user.routes').then(mod => mod.user)
    },
    {
        path: "signin",
        component: SigninComponent,
    },
    {   
        path: 'admin', 
        component:AdminComponent,
        canActivate:[authGuard],
        loadChildren: () => import('./admin/admin.routes').then(mod => mod.admin)
    },
    { 
        path: '**', 
        component: redirectTo: '/' }
];
