import { Component, OnInit, Renderer2, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthUserGuard } from '../../../../guards/auth-user.guard';
import { Subscription } from 'rxjs';
import { QuestionService } from '../../../../services/users/question.service';
import { Question } from '../../../../models/Question.model';

declare var $: any;

@Component({
    selector: 'app-question-details',
    templateUrl: './question-details.component.html',
    styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit, AfterViewInit {

    // @ViewChild("messagelist") messagelist: ElementRef;

    questionSubscription$: Subscription;
    filterSubscription$: Subscription;

    questions: Question[] = [];
    email: string | null;

    specificQuestion: Question | undefined;

    constructor(private route: ActivatedRoute,
                private guard: AuthUserGuard,
                private questionService: QuestionService,
                private renderer: Renderer2) { }

    ngOnInit(): void {
        this.email = this.guard.email;
        const email_question = this.route.snapshot.params['email_question'];

        this.questionSubscription$ = this.questionService.questionSubject$.subscribe(
            (questions: Question[]) => {
                for (let question of questions) {
                    if (question.email === this.email) {
                        this.questions.push(question);
                    }
                }

                for (let quest of this.questions) {
                    for (let str of quest.content) {
                        if (this.getUrlQuestion(str) === email_question) {
                            this.specificQuestion = quest;
                            if (str.slice(0, 14) !== 'From_appavenue') {
                                this.userDisplayMail(str);
                            } else {
                                this.appavenueDisplayMail(str);
                            }
                            break;
                        }
                    }
                }
            }
        );
    }

    ngAfterViewInit() {
        let scrollview: any = document.querySelector('.chat-scrollview');
        scrollview = scrollview?.scrollHeight;
        
        // this.filterQuestions();
    }

    
    async filterQuestions() {

        let questions: Question[] = [];
        this.filterSubscription$ = this.questionService.questionSubject$.subscribe(
            (data: Question[]) => {
                for (let quest of data) {
                    if (quest.email === this.email) {
                        questions.push(quest);
                    }
                }
                const lastIndex = questions.length - 1;

                for (let str of questions[lastIndex].content) {
                    if (str.slice(0, 14) !== 'From_appavenue') {
                        this.userDisplayMail(str);
                    } else {
                        this.appavenueDisplayMail(str);
                    }
                }
            }
        );
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

    // SENDER & OWNER TEMPLATE
    bot_template(message: string): Node {
        const divMessage = this.renderer.createElement('div');
        this.renderer.addClass(divMessage, 'chat-message');
        const textMessage = this.renderer.createText(message);
        this.renderer.appendChild(divMessage, textMessage);

        // SECTION MESSAGE
        const sectionMessage = this.renderer.createElement('section');
        this.renderer.appendChild(sectionMessage, divMessage);

        const imgAvatar = this.renderer.createElement('img');
        this.renderer.setAttribute(imgAvatar, 'src', 'https://cdn.dribbble.com/users/37530/screenshots/2937858/drib_blink_bot.gif');

        // AVATAR
        const divAvatar = this.renderer.createElement('div');
        this.renderer.addClass(divAvatar, 'chat-avatar');
        this.renderer.appendChild(divAvatar, imgAvatar);

        const divWrap = this.renderer.createElement('div');
        this.renderer.addClass(divWrap, 'chat-cluster');
        this.renderer.appendChild(divWrap, divAvatar);
        this.renderer.appendChild(divWrap, sectionMessage);

        return divWrap;
    }

    // AUTHOR TEMPLATE
    user_template(message: string): Node {
        const divMessage = this.renderer.createElement('div');
        this.renderer.addClass(divMessage, 'chat-message');
        const textMessage = this.renderer.createText(message);
        this.renderer.appendChild(divMessage, textMessage);

        // SECTION MESSAGE
        const sectionMessage = this.renderer.createElement('section');
        this.renderer.appendChild(sectionMessage, divMessage);

        const divWrap = this.renderer.createElement('div');
        this.renderer.addClass(divWrap, 'chat-cluster');
        this.renderer.setAttribute(divWrap, 'mine', '');
        this.renderer.appendChild(divWrap, sectionMessage);

        return divWrap;
    }

    // DISPLAY Mail USER FROM SCREEN
    onKeypressUser(event: any) {
        const author = document.querySelector('.chat-authoring');
        const messagelist = document.querySelector('.chat-messagelist');
        
        if (event.keyCode === 13) {
            event.preventDefault();

            // this.specificQuestion?.content.push(author?.innerHTML || '');
            // if (this.specificQuestion) {
            //     this.questionService.updateQuestions(this.specificQuestion)
            // }
            
            if (!messagelist?.querySelector('.chat-cluster:last-child')?.hasAttribute('mine')) {
                const divMessage = this.renderer.createElement('div');
                this.renderer.addClass(divMessage, 'chat-message');
                const textMessage = this.renderer.createText(author?.innerHTML || '');
                this.renderer.appendChild(divMessage, textMessage);

                this.renderer.appendChild(messagelist?.querySelector('.chat-cluster:last-child > section'), divMessage);
            } else {
                if (author?.innerHTML) {
                    this.renderer.appendChild(messagelist, this.bot_template(author.innerHTML));
                }
            }

            if (author?.innerHTML) author.innerHTML = '';
        }
    }

    // DISPLAY Mail USER FROM SCREEN
    onKeypressAuthor(event: any) {
        const author = document.querySelector('.chat-authoring');
        const messagelist = document.querySelector('.chat-messagelist');

        if (event.keyCode === 13) {
            event.preventDefault();
            
            if (messagelist?.querySelector('.chat-cluster:last-child')?.hasAttribute('mine')) {
                const divMessage = this.renderer.createElement('div');
                this.renderer.addClass(divMessage, 'chat-message');
                const textMessage = this.renderer.createText(author?.innerHTML || '');
                this.renderer.appendChild(divMessage, textMessage);

                this.renderer.appendChild(messagelist?.querySelector('.chat-cluster:last-child > section'), divMessage);
            } else {
                if (author?.innerHTML) {
                    this.renderer.appendChild(messagelist, this.user_template(author.innerHTML));
                }
                
            }

            if (author?.innerHTML) author.innerHTML = '';
        }
    }

    // DISPLAY Mail USER FROM SERVER
    userDisplayMail(message: string) {
        const messagelist = document.querySelector('.chat-messagelist');
       
        if (!messagelist?.querySelector('.chat-cluster:last-child')?.hasAttribute('mine')) {
            const divMessage = this.renderer.createElement('div');
            this.renderer.addClass(divMessage, 'chat-message');
            const textMessage = this.renderer.createText(message);
            this.renderer.appendChild(divMessage, textMessage);

            this.renderer.appendChild(messagelist?.querySelector('.chat-cluster:last-child > section'), divMessage);
        } else {
            if (message) {
                this.renderer.appendChild(messagelist, this.bot_template(message));
            }
        }
    }

    // DISPLAY Mail appavenue FROM SERVER
    appavenueDisplayMail(message: string) {
        const messagelist = document.querySelector('.chat-messagelist');

        if (messagelist?.querySelector('.chat-cluster:last-child')?.hasAttribute('mine')) {
            const divMessage = this.renderer.createElement('div');
            this.renderer.addClass(divMessage, 'chat-message');
            const textMessage = this.renderer.createText(message);
            this.renderer.appendChild(divMessage, textMessage);

            this.renderer.appendChild(messagelist?.querySelector('.chat-cluster:last-child > section'), divMessage);
        } else {
            if (message) {
                this.renderer.appendChild(messagelist, this.user_template(message));
            }
            
        }
    }


    ngOnDestroy() {
        this.questionSubscription$.unsubscribe();
        this.filterSubscription$.unsubscribe();
    }

}
