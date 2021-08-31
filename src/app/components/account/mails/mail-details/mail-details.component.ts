import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-mail-details',
    templateUrl: './mail-details.component.html',
    styleUrls: ['./mail-details.component.scss']
})
export class MailDetailsComponent implements OnInit {

    constructor(private renderer: Renderer2) { }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        let scrollview: any = document.querySelector('.chat-scrollview');
        scrollview = scrollview?.scrollHeight;
    }

    // SENDER & OWNER TEMPLATE
    bot_template(message: string): Node {
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
    onKeypressBot(event: any) {
        const bot = document.querySelector('textarea');
        const messagelist = document.querySelector('.chat-messagelist');

        if (event.keyCode === 13) {
            event.preventDefault();

            if (!messagelist?.querySelector('.chat-cluster:last-child')?.hasAttribute('mine')) {
                const divMessage = this.renderer.createElement('div');
                this.renderer.addClass(divMessage, 'chat-message');
                const textMessage = this.renderer.createText(bot?.value || '');
                this.renderer.appendChild(divMessage, textMessage);

                this.renderer.appendChild(messagelist?.querySelector('.chat-cluster:last-child > section'), divMessage);
            } else {
                if (bot?.value) {
                    this.renderer.appendChild(messagelist, this.bot_template(bot.value));
                }
            }

            if (bot?.value) bot.value = '';
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

}
