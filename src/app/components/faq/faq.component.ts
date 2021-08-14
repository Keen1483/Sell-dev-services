import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

declare var $: any;

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

    faqForm: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        $(document).ready(() => {
            $('.question').hide();

            if (parseInt($('body').css('width')) <= 768) {
                $('.ask-question').show();
            }

            $('.ask-question').click(function() {
                $(".question").fadeOut("slow",function(){
                    $(".question").fadeIn("slow");
                });
            });
        });

        this.initForm();
    }

    initForm() {
        this.faqForm = this.fb.group({
            email: ['', [Validators.required, Validators.email, Validators.maxLength(32)]],
            questions: this.fb.array([this.questForm()])
        });
    }

    questForm() {
        return this.fb.group({
            question: ['', [Validators.required, Validators.minLength(4)]]
        });
    }

    getQuests() {
        return this.faqForm.controls.questions as FormArray;
    }

    onAddQuests() {
        this.getQuests().push(this.questForm());
    }

    onDeleteQuests(index: number) {
        this.getQuests().removeAt(index);
    }

    onSubmit() {
        const email = this.faqForm.get('email')?.value;
        const questions = this.faqForm.get('questions')?.value;
        console.log(email, questions);
    }

}
