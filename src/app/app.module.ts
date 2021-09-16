import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroPessoaComponent } from './cadastro-pessoa/cadastro-pessoa.component';
import { ConsultaPessoaComponent } from './consulta-pessoa/consulta-pessoa.component';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


const appRoutes : Routes =[
 { path : 'cadastro-pessoa', component : CadastroPessoaComponent },
 { path : 'consulta-pessoa', component : ConsultaPessoaComponent } 
];

@NgModule({
  declarations: [
    AppComponent,
    CadastroPessoaComponent,
    ConsultaPessoaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
