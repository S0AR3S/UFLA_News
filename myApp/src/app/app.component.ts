import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public authService: AuthService,
    public router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authState.subscribe(state => {
        if (state) {
          this.router.navigate(['/tabs/news']);
        } else {
          this.router.navigate(['/login']);
        }
      });
    });
  }
}
