import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftRegistryListComponent } from './gift-registry-list.component';

describe('GiftRegistryListComponent', () => {
  let component: GiftRegistryListComponent;
  let fixture: ComponentFixture<GiftRegistryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftRegistryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftRegistryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
