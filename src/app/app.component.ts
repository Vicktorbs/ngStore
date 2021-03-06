import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  imgParent = '';
  showImage = true;
  toke = '';
  imgRta = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private filesService: FilesService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    const toke = this.tokenService.getToken();
    if (toke) {
      this.authService.getProfile().subscribe();
    }
  }

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
      password: '12345',
      role: 'customer'
    }).subscribe(rta => {
      console.log(rta);

    })
  }

  login() {
    this.authService.login('viktor@gmail.com', '12345')
    .subscribe(rta => {
      console.log(rta);
      this.toke = rta.access_token
    })
  }

  getProfile() {
    this.authService.getProfile()
    .subscribe(profile => {
      console.log(profile);

    })
  }

  downloadPdf() {
    this.filesService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe();
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file)
      .subscribe(rta => {
        this.imgRta = rta.location;
      });
    }

  }

}
