import { Routes } from '@angular/router';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { ViewComponent } from './components/view/view.component';
import { ListComponent } from './components/list/list.component';
export const user: Routes = [
    {
        path:"",
        component:ScheduleComponent,
        children:[
            {
                path:"",
                component:ListComponent,
            },
            {
                path:"view/:id",
                component:ViewComponent,
            }
        ]
    }  
];
