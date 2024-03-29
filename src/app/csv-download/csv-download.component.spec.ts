import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvDownloadComponent } from './csv-download.component';

describe('CsvDownloadComponent', () => {
  let component: CsvDownloadComponent;
  let fixture: ComponentFixture<CsvDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
