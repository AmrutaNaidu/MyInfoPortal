import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAssessmentComponent } from './new-assessment.component';
import { FormsModule, FormBuilder, ReactiveFormsModule, FormControlName } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DebugElement } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NewAssessmentComponent', () => {
  let component: NewAssessmentComponent;
  let fixture: ComponentFixture<NewAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // tslint:disable-next-line: max-line-length
      imports: [FormsModule, RouterTestingModule, MaterialModule, BrowserAnimationsModule, MatSnackBarModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ NewAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('new assessment required', () => {
    const crsEl = fixture.debugElement.nativeElement;
    expect(crsEl.querySelector('h1').textContent).toContain('Please update assessment here');
  });
});
