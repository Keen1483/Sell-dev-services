import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthUserGuard } from '../../../guards/auth-user.guard';
import { Subscription } from 'rxjs';
import { QuestionService } from '../../../services/users/question.service';
import { Question } from '../../../models/Question.model';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {

    questionSubscription$: Subscription;

    questions: Question[] = [];
    email: string | null;
    questionsByEmail: Question[];

    constructor(private guard: AuthUserGuard,
                private questionService: QuestionService) { }

    ngOnInit(): void {
        this.questionSubscription$ = this.questionService.questionSubject$.subscribe(
            (questions: Question[]) => this.questions = questions
        );

        this.email = this.guard.email;

        this.getQuestions(this.email);
    }

    getQuestions(email: string | null) {
        for (let question of this.questions) {
            if (question.email === email) {
                this.questionsByEmail.push(question);
            }
        }
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
