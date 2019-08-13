import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;

  constructor(private fb: FormBuilder, private toastrService: ToastrService) {
    this.createForm();
  }

  ngOnInit() {
    this.signupForm.valueChanges.subscribe(console.log);
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
      // TODO call the auth service
      const {firstName, lastName, email, password} = this.signupForm.value;
      console.log(`First Name: ${firstName}, Last Name: ${lastName}, Email: ${email}, Password: ${password}`);
    } else {
      this.toastrService.error("Please try again.", "Enter a valid name, email and password.");
    }

  }
}
