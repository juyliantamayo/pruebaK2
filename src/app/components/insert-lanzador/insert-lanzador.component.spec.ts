import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertLanzadorComponent } from './insert-lanzador.component';

describe('InsertLanzadorComponent', () => {
  let component: InsertLanzadorComponent;
  let fixture: ComponentFixture<InsertLanzadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertLanzadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertLanzadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
