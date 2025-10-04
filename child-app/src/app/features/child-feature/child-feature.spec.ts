import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildFeature } from './child-feature';

describe('ChildFeature', () => {
  let component: ChildFeature;
  let fixture: ComponentFixture<ChildFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildFeature]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
