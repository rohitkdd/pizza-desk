import { ToastrService } from 'ngx-toastr';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loginForm: FormGroup;
  isFormSubmitted = false;
  isUserLoggedIn = false;
  @ViewChild('close', { static: false }) closeButton: ElementRef;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.isUserLoggedIn = true;
    }

    this.authService.getLoggedInUser().subscribe((isLoggedIn) => {
      this.isUserLoggedIn = isLoggedIn;
    });
  }

  login() {
    this.isFormSubmitted = true;
    if (this.loginForm.valid) {
      if (this.loginForm.get('username').value === 'admin' && this.loginForm.get('password').value === 'admin') {
        this.toastr.success('Logged in successfully!');
        localStorage.setItem('isLoggedIn', 'true');
        this.authService.setLoggedInUser(true);
        if (this.closeButton.nativeElement) {
          this.closeButton.nativeElement.click();
          this.resetLoginForm();
        }
      } else {
        this.toastr.error('Not authenticated');
      }
    }
  }

  resetLoginForm() {
    this.isFormSubmitted = false;
    this.loginForm.reset();
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.authService.setLoggedInUser(false);
    this.router.navigate(['/']);
  }
}
