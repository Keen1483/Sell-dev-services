import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mail } from '../../models/Mail.model';
import { MailService } from '../../services/users/mail.service';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

    contactForm: FormGroup;
    mailSubscription$: Subscription;

    mails: Mail[];

    constructor(private formBuilder: FormBuilder,
                private mailService: MailService) { }

    ngOnInit(): void {
        this.initForm();

        this.mailSubscription$ = this.mailService.mailSubject$.subscribe(
            (mails: Mail[]) => this.mails = mails
        );
    }

    initForm() {
        this.contactForm = this.formBuilder.group({
            message: ['', Validators.required, Validators.min(10)]
        });
    }

    onSubmit() {
        const message = this.contactForm.get('message')?.value;
        const date = new Date();
        const id = this.mails.length + 1;

        // const mail: Mail = {
        //     id: id,
        //     firstName: firstName,
        //     lastName: lastName,
        //     email: email,
        //     message: message,
        //     date: date
        // };
        // this.mailService.createMail(mail);
        console.log(this.contactForm.value);
    }

    ngOnDestroy() {
        this.mailSubscription$.unsubscribe();
    }
}
