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
        var firebaseConfig = {
            apiKey: "AIzaSyBpyMRrcYnvUd0jf37tEMgEdv41QynaQZI",
            authDomain: "appavenue-39fa3.firebaseapp.com",
            projectId: "appavenue-39fa3",
            storageBucket: "appavenue-39fa3.appspot.com",
            messagingSenderId: "1088043996965",
            appId: "1:1088043996965:web:277b0338d999dd0c222ccc",
            measurementId: "G-0TEL55B908"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
    }

    ngOnInit() {
        $(document).ready(() => {
            
        });
    }
}
