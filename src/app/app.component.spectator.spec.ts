import {AppComponent} from './app.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {IMaskModule} from 'angular-imask';
import {createComponentFactory, Spectator} from '@ngneat/spectator';

describe('[SPECTATOR]AppComponent', () => {
  let inputDebugElement: HTMLInputElement;
  const inputSelector = '#imask-phonenumber';
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    disableAnimations: true,
    detectChanges: true,
    component: AppComponent,
    imports: [
      MatFormFieldModule,
      MatInputModule,
      ReactiveFormsModule,
      IMaskModule,
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    inputDebugElement = spectator.query<HTMLInputElement>(
      inputSelector
    ) as HTMLInputElement;
  });

  it('test imask field with input event(not working test)', () => {
    spectator.triggerEventHandler(inputSelector, 'input', {
      target: { value: '1234567890' },
    });

    spectator.detectChanges();

    expect(inputDebugElement.value).toEqual('+1(123)456-7890');
    expect(spectator.component.phoneNumberControl.value).toEqual(
      '+1(123)456-7890'
    );
  });

  it('test imask field with input value property change(not working test)', () => {
    inputDebugElement.value = '1234567890';

    spectator.detectChanges();

    expect(inputDebugElement.value).toEqual('+1(123)456-7890');
    expect(spectator.component.phoneNumberControl.value).toEqual(
      '+1(123)456-7890'
    );
  });

  it('patch form control value (first char error, not working test)', () => {
    spectator.component.phoneNumberControl.patchValue('1234567890');

    spectator.detectChanges();

    expect(inputDebugElement.value).toEqual('+1(123)456-7890');
    expect(spectator.component.phoneNumberControl.value).toEqual(
      '+1(123)456-7890'
    );
  });

  it('patch form control value (working test)', () => {
    spectator.component.phoneNumberControl.patchValue('2234567890');

    spectator.detectChanges();

    expect(inputDebugElement.value).toEqual('+1(223)456-7890');
    expect(spectator.component.phoneNumberControl.value).toEqual(
      '+1(223)456-7890'
    );
  });

  it('[async test] test imask field with input event(not working test)', async () => {
    spectator.triggerEventHandler(inputSelector, 'input', {
      target: { value: '1234567890' },
    });

    spectator.detectChanges();
    await spectator.fixture.whenStable();

    expect(inputDebugElement.value).toEqual('+1(123)456-7890');
    expect(spectator.component.phoneNumberControl.value).toEqual(
      '+1(123)456-7890'
    );
  });

  it('[async test] test imask field with input value property change(not working test)', async () => {
    inputDebugElement.value = '1234567890';

    spectator.detectChanges();
    await spectator.fixture.whenStable();

    expect(inputDebugElement.value).toEqual('+1(123)456-7890');
    expect(spectator.component.phoneNumberControl.value).toEqual(
      '+1(123)456-7890'
    );
  });
});
