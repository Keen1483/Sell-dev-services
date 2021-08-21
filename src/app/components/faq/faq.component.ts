import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Question } from '../../models/Question.model';
import { Subscription } from 'rxjs';
import { QuestionService } from '../../services/users/question.service';

declare var $: any;

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

    faqForm: FormGroup;

    questionSubscription$: Subscription;

    questions: Question[] = [];

    constructor(private fb: FormBuilder,
                private questionService: QuestionService) { }

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

        this.questionSubscription$ = this.questionService.questionSubject$.subscribe(
            (questions: Question[]) => this.questions = questions
        );

        this.initForm();
    }

    initForm() {
        this.faqForm = this.fb.group({
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
        const questions = this.faqForm.get('questions')?.value;
        console.log(questions);

        // this.questionService.createQuestion();
    }

}
