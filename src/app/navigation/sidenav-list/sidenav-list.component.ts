import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() sidenavclose = new EventEmitter<void>();

  isAuth = false;
  authSubscription: Subscription

  constructor(private authService: AuthService) { }

  ngOnInit(){
    this.authSubscription = this.authService.authStateChange.subscribe(authStatus =>{
      this.isAuth = authStatus;
    })
  }

  onLogout(){
    this.authService.logout();
    this.onClose();
  }


  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

  onClose(){
    this.sidenavclose.emit();
  }
}
