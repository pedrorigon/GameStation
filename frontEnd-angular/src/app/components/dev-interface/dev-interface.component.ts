import { Component } from '@angular/core';
import { FormBuilder , FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dev-interface',
  templateUrl: './dev-interface.component.html',
  styleUrls: ['./dev-interface.component.css']
})
export class DevInterfaceComponent {

  gameForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.gameForm = fb.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      preco: ['', [Validators.required]],
      link_imagens: ['', [Validators.required]],
      tags: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }


  addGame(): boolean {
    const nome = this.gameForm.value.nome
    const descricao = this.gameForm.value.descricao
    const preco = this.gameForm.value.preco
    const link_imagens = this.gameForm.value.link_imagens
    const tags = this.gameForm.value.tags.split(";")
    let success = false;

    // Enviar dados para o servidor para verificar o login
    fetch("http://127.0.0.1:8000/jogo/", {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      body: JSON.stringify({
        avaliacao:  10.5 ,nome: "El jueguito", descricao: "fasfasf afafsasf a", preco: 500.54, link_imagens: 'image.png', tags : ['FPS'], link_trailer: ""
        // avaliacao:  10.5 ,nome: nome, descricao: descricao, preco: 500.54, link_imagens: link_imagens, tags : JSON.stringify(tags), link_trailer: ""
      })
    }).then((response) => (
      response.ok ? (
        response.json()
          .then((data: [boolean, string | null]) =>
            data[0] ? (success = true) :
              console.log(`Login falhou, motivo: ${data[1]}`)
          )
      ) : console.log(response)
    )).catch(
      (err) => console.log('Erro na requisição')
    );

    this.gameForm.reset();

    return success;
  }


}
