import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly phoneNumberControl = new FormControl();
  readonly telephoneMask = { mask: '{+1(}000{)}000{-}0000', lazy: false };
}
