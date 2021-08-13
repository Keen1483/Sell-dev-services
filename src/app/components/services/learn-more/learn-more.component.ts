import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { Service } from 'src/app/models/Service.model';

@Component({
    selector: 'app-learn-more',
    templateUrl: './learn-more.component.html',
    styleUrls: ['./learn-more.component.scss']
})
export class LearnMoreComponent implements OnInit {

    service: any;

    constructor(private route: ActivatedRoute,
                private serviceService: ServiceService) { }

    ngOnInit(): void {
        const name = this.route.snapshot.params['name'];
        this.service = this.serviceService.getServiceByName(name);
    }

}
