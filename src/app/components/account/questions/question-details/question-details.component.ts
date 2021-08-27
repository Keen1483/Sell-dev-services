import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthUserGuard } from '../../../../guards/auth-user.guard';
import { Subscription } from 'rxjs';
import { QuestionService } from '../../../../services/users/question.service';
import { Question } from '../../../../models/Question.model';

@Component({
    selector: 'app-question-details',
    templateUrl: './question-details.component.html',
    styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit {

    questionSubscription$: Subscription;

    questions: Question[] = [];
    email: string | null;

    specificQuestion: Question | undefined;

    constructor(private route: ActivatedRoute,
                private guard: AuthUserGuard,
                private questionService: QuestionService) { }

    ngOnInit(): void {
        const email_question = this.route.snapshot.params['email_question'];

        this.questionSubscription$ = this.questionService.questionSubject$.subscribe(
            (questions: Question[]) => {
                this.questions = questions;

                this.specificQuestion = this.questions.find(
                    (quest) => this.getUrlQuestion(quest.content[0]) === email_question
                );
            }
        );

        this.email = this.guard.email;
    }

    getQuestions(email: string | null, questions: Question[]) {
        let questionsByEmail: Question[] = [];
        for (let question of questions) {
            if (question.email === email) {
                questionsByEmail?.push(question);
            }
        }

        return questionsByEmail;
    }

    getUrlQuestion(question: string): string {

        question = question.trim();
        question = question.toLowerCase();
        question = question.replace(/ /g, '-');
        question = question.replace(/[éèàêâùûîôëüïöç'"]/g, '');
        question = question.replace(/[&=,;]/g, '');
        question = question.replace(/[?+*{}\#!^$()[\].\\]/g, '');

        return this.email + '_' + question;
    }

    ngOnDestroy() {
        this.questionSubscription$.unsubscribe();
    }

}
