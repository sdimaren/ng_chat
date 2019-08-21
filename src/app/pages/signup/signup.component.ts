import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from './../../services/loading.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnDestroy {

  public signupForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder, 
    private toastrService: ToastrService,
    private auth: AuthService,
    private loadingService: LoadingService,
    private router: Router
    ) {
    this.createForm();
  }

  private createForm(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  };

  public submit(): void {
    if (this.signupForm.valid) {
      const {firstName, lastName, email, password} = this.signupForm.value;
      
      // TODO call the auth service
      this.subscriptions.push(
        this.auth.signup(firstName, lastName, email, password).subscribe(success => {
          if (success) {
            this.toastrService.success("Welcome!", "User name created!");
            this.router.navigate(['/chat']);
          } else {
            this.toastrService.error("Please try again.", "There was a problem signing up.");
          }

          this.loadingService.isLoading.next(false);
        })
      )
    } else {
      this.toastrService.error("Please try again.", "Enter a valid name, email and password.");
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

}
