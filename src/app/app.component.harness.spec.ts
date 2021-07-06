import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {IMaskModule} from 'angular-imask';
import {MatInputHarness} from '@angular/material/input/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';

describe('[HARNESS]AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let harnessLoader: HarnessLoader;
  let inputHarness: MatInputHarness;

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

  beforeEach(async () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    harnessLoader = TestbedHarnessEnvironment.loader(fixture);
    inputHarness = await harnessLoader.getHarness(MatInputHarness);
    fixture.detectChanges();
  });

  it('test imask field with setValue(not working test)', async () => {
    await inputHarness.setValue('1234567890');

    fixture.detectChanges();

    expect(await inputHarness.getValue()).toEqual('+1(123)456-7890');
    expect(component.phoneNumberControl.value).toEqual('+1(123)456-7890');
  });

  it('patch form control value (first char error, not working test)', async () => {
    component.phoneNumberControl.patchValue('1234567890');

    fixture.detectChanges();

    expect(await inputHarness.getValue()).toEqual('+1(123)456-7890');
    expect(component.phoneNumberControl.value).toEqual('+1(123)456-7890');
  });

  it('patch form control value (working test)', async () => {
    component.phoneNumberControl.patchValue('2234567890');

    fixture.detectChanges();

    expect(await inputHarness.getValue()).toEqual('+1(223)456-7890');
    expect(component.phoneNumberControl.value).toEqual('+1(223)456-7890');
  });

  it('[async test] test imask field with setValue(not working test)', async () => {
    await inputHarness.setValue('1234567890');

    fixture.detectChanges();
    await fixture.whenStable();

    expect(await inputHarness.getValue()).toEqual('+1(123)456-7890');
    expect(component.phoneNumberControl.value).toEqual('+1(123)456-7890');
  });

});
