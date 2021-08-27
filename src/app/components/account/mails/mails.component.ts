import { Component, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-mails',
    templateUrl: './mails.component.html',
    styleUrls: ['./mails.component.scss']
})
export class MailsComponent implements OnInit, AfterViewInit {

    @ViewChild('bot') bot: ElementRef;
    @ViewChild('author') author: ElementRef;
    @ViewChild('chat-list') chatList: ElementRef;

    constructor(private renderer: Renderer2) { }

    ngOnInit(): void {
        // this.initselector();
    }

    ngAfterViewInit() {
        document.querySelector('.chat-message')?.setAttribute('title', 'chat UI');
    }

    // SENDER & OWNER TEMPLATE
    bot_template(message: string) {
        const divMessage = this.renderer.createElement('div');
        this.renderer.addClass(divMessage, 'chat-message');
        const textMessage = this.renderer.createText(message);
        this.renderer.appendChild(divMessage, textMessage);

        const h3Name = this.renderer.createElement('h3');
        const textName = this.renderer.createText('Snap Bot');
        this.renderer.appendChild(h3Name, textName);

        // SECTION MESSAGE
        const sectionMessage = this.renderer.createElement('section');
        this.renderer.appendChild(sectionMessage, h3Name);
        this.renderer.appendChild(sectionMessage, divMessage);

        const imgAvatar = this.renderer.createElement('img');
        const srcAvatar = this.renderer.createText('https://cdn.dribbble.com/users/37530/screenshots/2937858/drib_blink_bot.gif')
        this.renderer.setAttribute(imgAvatar, 'src', srcAvatar);

        // AVATAR
        const divAvatar = this.renderer.createText('div');
        this.renderer.addClass(divAvatar, 'chat-avatar');
        this.renderer.appendChild(divAvatar, imgAvatar);

        const divWrap = this.renderer.createElement('div');
        this.renderer.addClass(divWrap, 'chat-cluster');
        this.renderer.appendChild(divWrap, divAvatar);
        this.renderer.appendChild(divWrap, sectionMessage);
    }

    // AUTHOR TEMPLATE
    user_template(message: string) {
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
    }

    chatGenerator() {
        const bot = document.getElementsByTagName('textarea');
        const author = document.querySelector('.chat-authoring');
        let scrollview: any = document.querySelector('.chat-scrollview');
        const messagelist = document.querySelector('.chat-messagelist')

        scrollview = scrollview?.scrollHeight;
    }

    onKeypressBot(event: any) {
        const bot = document.querySelector('textarea');
        let scrollview: any = document.querySelector('.chat-scrollview');
        const messagelist = document.querySelector('.chat-messagelist');

        scrollview = scrollview?.scrollHeight;

        if (event.keyCode === 13) {
            event.preventDefault();

            if (!messagelist?.querySelector('.chat-cluster:last-child')?.hasAttribute('mine')) {
                const divMessage = this.renderer.createElement('div');
                this.renderer.addClass(divMessage, 'chat-message');
                const textMessage = this.renderer.createText(bot?.value || '');
                this.renderer.appendChild(divMessage, textMessage);

                this.renderer.appendChild(messagelist?.querySelector('.chat-cluster:last-child > section'), divMessage);
            } else {
                this.renderer.appendChild(messagelist, this.bot_template(bot?.value||''));
            }
        }
    }

    onKeypressAuthor(event: any) {
        const author = document.querySelector('.chat-authoring');
        let scrollview: any = document.querySelector('.chat-scrollview');
        const messagelist = document.querySelector('.chat-messagelist');

        scrollview = scrollview?.scrollHeight;

        if (event.keyCode === 13) {
            event.preventDefault();
            
            if (messagelist?.querySelector('.chat-cluster:last-child')?.hasAttribute('mine')) {
                const divMessage = this.renderer.createElement('div');
                this.renderer.addClass(divMessage, 'chat-message');
                const textMessage = this.renderer.createText(author?.innerHTML || '');
                this.renderer.appendChild(divMessage, textMessage);

                this.renderer.appendChild(messagelist?.querySelector('.chat-cluster:last-child > section'), divMessage);
            } else {
                this.renderer.appendChild(messagelist, this.user_template(author?.innerHTML||''));
            }
        }
    }
}
