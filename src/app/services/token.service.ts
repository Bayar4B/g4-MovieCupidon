import { Token } from '../models/Token.model';
import {Subject} from 'rxjs';

export class TokenService {
  private token: Token;
  tokenSubject = new Subject<Token>();

  emitToken(): void {
    this.tokenSubject.next(this.token);
  }

}
