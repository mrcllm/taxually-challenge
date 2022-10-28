import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { finalize } from 'rxjs/operators';
import { FileMetaData } from 'src/app/models/file-upload.model';
import { FileService } from 'src/app/shared/services/file.service';

FileMetaData;

@Component({
  selector: 'app-fileupload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileuploadComponent implements OnInit {
  selectedFiles!: FileList;
  currentFileUpload!: FileMetaData;
  percentage = 0;
  showMsg!: boolean;

  listOfFiles: FileMetaData[] = [];

  constructor(
    private fileService: FileService,
    private fireStorage: AngularFireStorage,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllFiles();
  }

  UploadForm = this.fb.group({
    upload: ['', Validators.required],
  });

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  uploadFile() {
    this.currentFileUpload = new FileMetaData(this.selectedFiles[0]);
    const path = 'Uploads/' + this.currentFileUpload.file.name;

    const storageRef = this.fireStorage.ref(path);
    const uploadTask = storageRef.put(this.selectedFiles[0]);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadLink) => {
            this.currentFileUpload.id = '';
            this.currentFileUpload.url = downloadLink;
            this.currentFileUpload.size = this.currentFileUpload.file.size;
            this.currentFileUpload.name = this.currentFileUpload.file.name;

            this.fileService.saveMetaDataOfFile(this.currentFileUpload);
          });
          this.ngOnInit();
        })
      )
      .subscribe((res: any) => {
        this.percentage = (res.bytesTransferred * 100) / res.totalBytes;
        if (this.percentage === 100) {
          this.showMsg = true;
          setTimeout(
            () => (
              (this.showMsg = false),
              this.UploadForm.reset(),
              (this.percentage = 0)
            ),
            3000
          );
        }
      });
  }

  getAllFiles() {
    this.fileService.getAllFiles().subscribe((res) => {
      console.log(res);
      this.listOfFiles = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });
    });
  }

  deleteFile(file: FileMetaData) {
    this.fileService.deleteFile(file);
  }
  showDeleteModal(modalRef: HTMLDivElement) {
    const modal = new Modal(modalRef);
    modal.show();
  }
}
