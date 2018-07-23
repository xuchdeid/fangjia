import { RouterModule, Routes, ActivatedRoute, Params } from '@angular/router';
import { ModuleWithProviders, Component } from '@angular/core';
import { ListComponent } from './list/list.component';

const appRoutes = [
    {
        path: '',
        component: ListComponent
    }
];

export const AppRoute: ModuleWithProviders = RouterModule.forRoot(appRoutes);
