import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $: any;

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    contactForm: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.contactForm = this.formBuilder.group({
            firstName: ['', Validators.required, Validators.max(32), Validators.min(2)],
            lastName: ['', Validators.required, Validators.max(32), Validators.min(2)],
            email: ['', Validators.required, Validators.email, Validators.max(32)],
            message: ['', Validators.required, Validators.min(10)]
        });
    }

    onSubmit() {
        const firstName = this.contactForm.get('firstName')?.value;
        const lastName = this.contactForm.get('lastName')?.value;
        const email = this.contactForm.get('email')?.value;
        const message = this.contactForm.get('message')?.value;
        console.log(this.contactForm.value);
    }
}
