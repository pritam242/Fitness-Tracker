import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sideNavToggle = new EventEmitter<void>();

  isAuth = false;
  authSubscription: Subscription

  constructor(private authService: AuthService) { }

  ngOnInit(){
    this.authSubscription = this.authService.authStateChange.subscribe(authStatus =>{
      this.isAuth = authStatus;
    })
  }

  toggleSideNav(){
    this.sideNavToggle.emit();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }
}
