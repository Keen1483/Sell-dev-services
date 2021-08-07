import { Component, OnInit } from '@angular/core';
// import Glightbox from 'glightbox';

@Component({
    selector: 'app-intro-section',
    templateUrl: './intro-section.component.html',
    styleUrls: ['./intro-section.component.scss']
})
export class IntroSectionComponent implements OnInit {

    lightbox: any;

    constructor() { }

    ngOnInit(): void {
        // this.lightbox = Glightbox({

        // });
    }

}
