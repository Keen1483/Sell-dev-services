import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  

    constructor() { }

    ngOnInit(): void {
        $(document).ready(() => {
            let width = parseInt($('body').css('width'));
            if (width <= 768) {
                $('.services__img').addClass('shadow');
            }
        });
    }

}
