import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-consulta-pessoa',
  templateUrl: './consulta-pessoa.component.html',
  styleUrls: ['./consulta-pessoa.component.css']
})
export class ConsultaPessoaComponent implements OnInit {
 
  mensagemSucesso:string | undefined;
  mensagemErro:string | undefined;
  
  listagemPessoas : any;
  errosNome: any;
  errosSobreNome: any;
  errosCpf: any;
  errosNacionalidade: any;
  errosCep: any;
  errosCidade: any;
  errosEstado: any;
  errosLogradouro: any;
  errosEmail: any;
  errosTelefone: any;


  pessoaEdicao = {
    id : "",
    nome : "",
    sobreNome: "",
    cpf : "",
    nacionalidade : "",
    cep : "",
    cidade : "",
    estado : "",
    logradouro : "",
    email : "",
    telefone : "",
  }
  

  constructor(private httpClient:HttpClient) { }  

  ngOnInit(): void {
    
    this.httpClient.get('http://localhost:58258/api/Pessoa').subscribe(
      (data) => { 
                  console.log(data)     
        this.listagemPessoas = data;
      },
      e => {
        console.log(e);
      }
    )
  }

  obterPessoa(id: string): void {

    //limpando as mensagens de erro de validação
    this.errosNome = [];
    this.errosSobreNome = [];
    this.errosCpf = [];
    this.errosNacionalidade = [];
    this.errosCep = [];
    this.errosCidade = [];
    this.errosEstado = [];
    this.errosLogradouro = [];
    this.errosEmail = [];
    this.errosTelefone = [];
  
    
    //limpando as mensagens de sucesso ou erro
    this.mensagemSucesso = "";
    this.mensagemErro = "";

    //buscar os dados do produto na API através do ID
    this.httpClient.get("http://localhost:58258/api/Pessoa/" + id)
      .subscribe(
        (data: any) => {
          //armazenar os dados do produto obtido no atributo desta classe.
          this.pessoaEdicao = data;
          console.log(this.pessoaEdicao);
          

        },
        e => {
          this.mensagemErro = "Ocorreu um erro ao obter a Pessoa. Tente novamente.";
        }
      );
  }

  excluirPessoa(id: any): void{
    if(confirm('deseja realmente excluir a pessoa selecionada')){
      this.httpClient.delete('http://localhost:58258/api/Pessoa/' + id,
      {responseType : 'text'}).subscribe(
        success =>{
          this.mensagemSucesso = success;
          this.ngOnInit();
        }
      )
    }
  }

  atualizarPessoa(formEdicao: { form: { value: any; }; }): void {

    //enviando uma requisição PUT para a API..
    this.httpClient.put('http://localhost:58258/api/Pessoa', formEdicao.form.value,
      { responseType: 'text' })
      .subscribe(
        success => {
          this.mensagemSucesso = success;
          this.ngOnInit(); //recarregar a consulta
        },
        e => {

          //lendo o resultado de erro obtido na chamada para a API..
          var response = JSON.parse(e.error);

          //verificando se ocorreram erros de validação..
          if (response.status == 400) {
            this.errosNome = response.errors.Nome;
            this.errosSobreNome = response.errors.SobreNome;
            this.errosCpf = response.errors.Cpf;
            this.errosNacionalidade = response.errors.Nacionalidade;
            this.errosCep = response.errors.Cep;
            this.errosCidade = response.errors.Cidade;
            this.errosEstado = response.errors.Estado;
            this.errosLogradouro = response.errors.Logradouro;
            this.errosEmail = response.errors.Email;
            this.errosTelefone = response.errors.Telefone;
            
          }

          this.mensagemErro = "Ocorreram erros, por favor tente novamente.";
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
