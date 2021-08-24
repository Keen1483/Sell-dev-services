import { Component, OnInit, ViewChild } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-mails',
    templateUrl: './mails.component.html',
    styleUrls: ['./mails.component.scss']
})
export class MailsComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        this.initselector();
    }

    initselector() {
        $(document).ready(() => {
            const bot = $('textarea')
            const author = $('.chat-authoring')
            const scrollview = $('.chat-scrollview')
            const messagelist = $('.chat-messagelist')
            const bot_template = (message: any) => `
            <div class="chat-cluster">
                <div class="chat-avatar">
                    <img src="https://cdn.dribbble.com/users/37530/screenshots/2937858/drib_blink_bot.gif" alt="">
                </div>
                <section>
                    <h3>Snap Bot</h3>
                    <div class="chat-message">${message}</div>
                </section>
            </div>
            `

            const user_template = (message: any) => `
            <div mine class="chat-cluster">
                <section>
                    <div class="chat-message">${message}</div>
                </section>
            </div>
            `
            
            scrollview.scrollTop = scrollview.scrollHeight

            bot.keypress((e: any) => {
                const {keyCode} = e
                
                if (e.keyCode === 13) {
                    e.preventDefault()
                    
                    if (!$('.chat-cluster:last-child[mine]')) {
                        // $('.chat-cluster:last-child > section').innerHTML += `<div class="chat-message">${bot.value}</div>`

                        // $(`<div class="chat-message">${bot.val()}</div>`).appendTo($('.chat-cluster:last-child > section'));
                        // alert(bot.val())

                        $('.chat-cluster:last-child > section').append(`<div class="chat-message">${bot.val()}</div>`);
                    }
                    else {
                        // messagelist.innerHTML += bot_template(bot.value)

                        // $(bot_template(bot.val())).appendTo(messagelist);

                        messagelist.append(bot_template(bot.val()));
                        alert('Goooooooooooood!!');
                    }
                    
                    bot.val('') ;
                }
            })

            author.keypress((e: any) => {
                const {keyCode} = e
                
                if (e.keyCode === 13) {
                    e.preventDefault()
                    
                    if ($('.chat-cluster:last-child[mine]')) {
                        // messagelist.querySelector('.chat-cluster:last-child > section').innerHTML += `<div class="chat-message">${author.innerHTML}</div>`
                        
                        // $(`<div class="chat-message">${author.html()}</div>`).appendTo($('.chat-cluster:last-child > section'));

                        var dataHtml = $('.chat-cluster:last-child > section').html();
                        var addHtml = `<div class="chat-message">${author.text()}</div>`;
                        $('.chat-cluster:last-child > section').html(dataHtml + addHtml);

                        // $('.chat-cluster:last-child > section').append(`<div class="chat-message">${author.html()}</div>`);
                    }
                    else {
                        // messagelist.innerHTML += user_template(author.innerHTML)

                        // $(user_template(author.html())).appendTo(messagelist);

                        messagelist.append(user_template(author.html()));
                    }
                    
                    // author.innerHTML = ''

                    author.html('');
                }
            })
        });
    }
}
