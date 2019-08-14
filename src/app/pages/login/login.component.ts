import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from './../../services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  
  constructor(
    private fb: FormBuilder, 
    private toastrService: ToastrService,
    private loadingService: LoadingService
    ) {
    this.createForm();
    console.log("OK!");
  }

  ngOnInit() {
    this.loginForm.valueChanges.subscribe(console.log);
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  };

  public submit(): void {
    this.loadingService.isLoading.next(true);

    if (this.loginForm.valid) {
    // TODO call the auth service
    const {email, password} = this.loginForm.value;
    console.log(`Email: ${email}, Password: ${password}`);
    this.loadingService.isLoading.next(false);
    } else { 
      setTimeout(() => {
        this.loadingService.isLoading.next(false);
        this.toastrService.error("Please try again.", "Your email or password were invalid.");
      }, 2000);
     
    }

  }
}
