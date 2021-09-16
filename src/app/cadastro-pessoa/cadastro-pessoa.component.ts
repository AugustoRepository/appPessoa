import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.css']
})
export class CadastroPessoaComponent implements OnInit {

  mensagemSucesso: String | undefined;
  mensagemErro: String | undefined;
  constructor(private httpClient : HttpClient) { }

  ngOnInit(): void {   
  }

  cadastrarPessoa(formCadastro: { form: { value: any; }; }) : void{

    this.mensagemSucesso = "";
    this.mensagemErro = "";

    console.log(formCadastro.form.value);   

    this.httpClient.post('http://localhost:58258/api/Pessoa', formCadastro.form.value, { responseType : "text"})
      .subscribe(
        success =>{
          this.mensagemSucesso = success;
        },
        e => {
          this.mensagemErro = "Ocorreram erros, tente novamento";
        }
      );
   }

   fecharMensagemSucesso() : void {
     this.mensagemSucesso = "";
   }
   fecharMensagemErro() : void {
    this.mensagemErro = "";
  }
  

}
