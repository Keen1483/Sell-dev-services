import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../models/User.model';
import { UserService } from '../../../services/users/user.service';
import { Subscription } from 'rxjs';
import { AuthUserService } from '../../../services/auths/auth-user.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

    userForm: FormGroup;
    
    imageUploading = false;
    imageUrl: any;
    imageUploaded = false;

    users: User[] = [];
    userSubscription$: Subscription;


    constructor(private fb: FormBuilder,
                private userService: UserService,
                private authUserService: AuthUserService) { }

    ngOnInit(): void {
        this.initForm();

        this.userSubscription$ = this.userService.userSubject$.subscribe(
            (users: User[]) => this.users = users
        );
    }

    initForm() {
        this.userForm = this.fb.group({
            email: ['', [Validators.required, Validators.email, Validators.max(32)]],
            password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
            firstName: ['', [Validators.maxLength(20), Validators.min(2)]],
            lastName: ['', [Validators.maxLength(20), Validators.min(2)]],
            photo: [null]
        });
    }

    async onSubmit() {
        console.log(this.users);
        const email = this.userForm.get('email')?.value;
        const password = this.userForm.get('password')?.value;
        const firstName = this.userForm.get('firstName')?.value;
        const lastName = this.userForm.get('lastName')?.value;
        const photo = this.userForm.get('photo')?.value;
        const date = new Date();
        const id = this.users.length + 1;

        await this.authUserService.createUserWithEmailAndPassword(email, password);
        
        const newUser: User = {
            id: id,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            photo: photo,
            date: date
        };

        await this.userService.createUser(newUser);
        console.log(this.userForm.value);
    }

    onDetectImage(event: any) {
        this.imageUrl = event.target.files[0];
        console.log(this.imageUrl);
    }
    
    onUploadImage(image: File) {
        this.imageUploading = true;
        this.userService.uploadPhoto(image).then(
            (url: any) => {
                this.imageUrl = url;
                this.imageUploading = false;
                this.imageUploaded = true;
            }
        );
    }

    ngOnDestroy() {
        this.userSubscription$.unsubscribe();
    }

}
