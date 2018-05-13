import { NgModule } from '@angular/core';
import {
    MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatToolbarModule
} from '@angular/material';

@NgModule({
    exports: [
        MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatToolbarModule
    ]
})
export class MaterialModule { }
