import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = ''
  showImage = true;

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImage = !this.showImage
  }

  createUser() {
    this.usersService.create({
      name: 'victor',
      email: 'viktor@gmail.com',
      password: '12345'
    }).subscribe(rta => {
      console.log(rta);

    })
  }

  login() {
    this.authService.login('viktor@gmail.com', '12345')
    .subscribe(rta => {
      console.log(rta);

    })
  }

}
