import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ListComponent } from './list/list.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';

@NgModule({
    imports: [FormsModule, HttpModule, CommonModule, NgZorroAntdModule],
    declarations: [ListComponent],
    exports: [ListComponent]
})
export class RoutesModule {}
