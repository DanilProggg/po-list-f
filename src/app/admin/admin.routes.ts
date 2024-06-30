import { Routes } from '@angular/router';
import { DisciplinesComponent } from './pages/disciplines/disciplines.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { ListEditorComponent } from './pages/list-editor/list-editor.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { StatsComponent } from './pages/stats/stats.component';
import { HoursTrackingComponent } from './pages/hours-tracking/hours-tracking.component';
import { HoursTrackingByMonthComponent } from './pages/hours-tracking-by-month/hours-tracking-by-month.component';

export const admin: Routes = [

    {
        path: "",
        component: ListEditorComponent,
    },
    {
        path: "disciplines",
        component: DisciplinesComponent,
    },
    {
        path: "teachers",
        component: TeachersComponent,
    },
    {
        path: "classes",
        component: ClassesComponent,
    },
    {
        path: "groups",
        component: GroupsComponent,
    },
    {
        path: "stats",
        component: StatsComponent,
        children:[
            {
                path: "hours-tracking",
                component: HoursTrackingComponent,
            },
            {
                path: "hours-tracking-by-month",
                component: HoursTrackingByMonthComponent,
            },
        ]
    }

];
