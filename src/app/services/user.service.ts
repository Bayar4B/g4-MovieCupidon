import { User } from '../models/User.model';
import {Subject} from 'rxjs';

export class UserService {
  private users: User[] = [
    {
      username: 'NOA18'
    },
    {
      username: 'CHLOU23'
    }
  ];
  userSubject = new Subject<User[]>();

  emitUsers(): void {
  this.userSubject.next(this.users.slice());
  }

  addUser(user: User): void {
    this.users.push(user);
    this.emitUsers();
  }
}
