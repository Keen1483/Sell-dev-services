import { Component, OnInit } from '@angular/core';

/* FIREBASE IMPORTS */
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'app-avenue';

    constructor() {
        
    }

    ngOnInit() {
        $(document).ready(() => {
            
        });
    }
}
