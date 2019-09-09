import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftRegistryComponent } from './gift-registry.component';

describe('GiftRegistryComponent', () => {
  let component: GiftRegistryComponent;
  let fixture: ComponentFixture<GiftRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftRegistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
