import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OnExit } from "./../../../guard/exit.guard";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit {

  constructor() { }

  // ngOnInit(): void {
  // }

  onExit() {
    const rta = confirm('Logica desde el componente, estas seguro de salir?')
    return rta
  }

}
