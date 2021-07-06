import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';

describe('[NATIVE]AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let inputDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        IMaskModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    inputDebugElement = fixture.debugElement.query(
      By.css('#imask-phonenumber')
    );
  });

  it('test imask field with input event(not working test)', () => {
    inputDebugElement.triggerEventHandler('input', {
      target: { value: '1234567890' },
    });

    fixture.detectChanges();

    expect(inputDebugElement.nativeElement.value).toEqual('+1(123)456-7890');
    expect(component.phoneNumberControl.value).toEqual('+1(123)456-7890');
  });

  it('test imask field with input value property change(not working test)', () => {
    inputDebugElement.nativeElement.value = '1234567890';

    fixture.detectChanges();

    expect(inputDebugElement.nativeElement.value).toEqual('+1(123)456-7890');
    expect(component.phoneNumberControl.value).toEqual('+1(123)456-7890');
  });

  it('patch form control value (first char error, not working test)', () => {
    component.phoneNumberControl.patchValue('1234567890');

    fixture.detectChanges();

    expect(inputDebugElement.nativeElement.value).toEqual('+1(123)456-7890');
    expect(component.phoneNumberControl.value).toEqual('+1(123)456-7890');
  });

  it('patch form control value (working test)', () => {
    component.phoneNumberControl.patchValue('2234567890');

    fixture.detectChanges();

    expect(inputDebugElement.nativeElement.value).toEqual('+1(223)456-7890');
    expect(component.phoneNumberControl.value).toEqual('+1(223)456-7890');
  });

  it('[async test] test imask field with input event(not working test)', async () => {
    inputDebugElement.triggerEventHandler('input', {
      target: { value: '1234567890' },
    });

    fixture.detectChanges();
    await fixture.whenStable();

    expect(inputDebugElement.nativeElement.value).toEqual('+1(123)456-7890');
    expect(component.phoneNumberControl.value).toEqual('+1(123)456-7890');
  });

  it('[async test] test imask field with input value property change(not working test)', async () => {
    inputDebugElement.nativeElement.value = '1234567890';

    fixture.detectChanges();
    await fixture.whenStable();

    expect(inputDebugElement.nativeElement.value).toEqual('+1(123)456-7890');
    expect(component.phoneNumberControl.value).toEqual('+1(123)456-7890');
  });
});
