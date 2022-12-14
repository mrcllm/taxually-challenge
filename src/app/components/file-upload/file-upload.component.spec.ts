import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileuploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
  let component: FileuploadComponent;
  let fixture: ComponentFixture<FileuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileuploadComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
