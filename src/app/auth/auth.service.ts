import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({providedIn: 'root'})
export class AuthService{
    // private user: User;
    
    authStateChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(private router: Router, private afauth: AngularFireAuth, private snackBar: MatSnackBar){}

    registerUser(authData: AuthData){
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random() * 10000).toString()
        // }; 
       this.afauth.createUserWithEmailAndPassword(
           authData.email,
           authData.password
       ).then(result =>{
        //    console.log(result);
           this.authSuccessfully();
       }).catch(error =>{
           this.snackBar.open(error.message, null, {
               duration: 3000
           })
       });
    }

    login(authData: AuthData){
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random() * 10000).toString()
        // };
        
        this.afauth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result =>{
            console.log(result);
            this.authSuccessfully();
        }).catch(error =>{
            this.snackBar.open(error.message, null, {
                duration: 3000
            })
        });
    }

    logout(){
        this.authStateChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
    }

    private authSuccessfully(){
        this.isAuthenticated = true;
        this.authStateChange.next(true);
        this.router.navigate(['/training']);
    }


    isAuth(){
        return this.isAuthenticated;
    }
}