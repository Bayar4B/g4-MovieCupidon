import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService} from '../../services/user.service';
import { HomeServices } from '../../services/home.services';
import { User} from '../../models/User.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-formulaire-create',
  templateUrl: './formulaire-create.component.html'
})
export class FormulaireCreateComponent implements OnInit {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private homeServices: HomeServices,
              private router: Router){}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): any {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }

  onSubmitForm(): void {
    const formValue = this.userForm.value;
    const newUser = new User(
      formValue.username
    );
    this.userService.addUser(newUser);
    // this.homeServices.createGame(newUser.username);

    this.router.navigate(['lobby']);
  }
}
