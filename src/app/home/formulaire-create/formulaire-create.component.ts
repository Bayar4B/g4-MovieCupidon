import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService} from '../../services/user.service';
import { HomeServices } from '../../services/home.services';
import { User} from '../../models/User.model';


@Component({
  selector: 'app-formulaire-create',
  templateUrl: './formulaire-create.component.html'
})
export class FormulaireCreateComponent implements OnInit {

  userForm: FormControl;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private homeServices: HomeServices) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): any {
    this.userForm = this.formBuilder.control({
      username: ['', Validators.required]
    });
  }

  onSubmitForm(): void {
    const formValue = this.userForm.value;
    const newUser = new User(
      formValue.username
    );
    this.userService.addUser(newUser);
    this.homeServices.createGame(newUser.username);
  }
}
