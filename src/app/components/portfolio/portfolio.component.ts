import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Portfolio } from 'src/app/models/Portfolio.model';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

    portfolioSubscription$: Subscription;

    portfolios: Portfolio[];

    constructor(private portfolioService: PortfolioService) { }

    ngOnInit(): void {
        this.portfolioSubscription$ = this.portfolioService.portfolioSubject$.subscribe(
            (portfolios: Portfolio[]) => this.portfolios = portfolios
        );
        this.portfolioService.emitPortfolioSubject();
    }

}
