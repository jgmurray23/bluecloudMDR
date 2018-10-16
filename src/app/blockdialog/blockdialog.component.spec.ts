import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockdialogComponent } from './blockdialog.component';

describe('BlockdialogComponent', () => {
  let component: BlockdialogComponent;
  let fixture: ComponentFixture<BlockdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
