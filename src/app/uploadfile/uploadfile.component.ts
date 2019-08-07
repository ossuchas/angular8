import { Component, OnInit } from '@angular/core';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { MatSnackBar } from '@angular/material';

const URL = 'http://localhost:4000/api/upload';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {

  title = 'ng8fileupload';
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });

  constructor(
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      // alert('File uploaded successfully');
      this.snackBar.open('File Uploaded Successful..!!' , '', {
        duration: 4000,
        verticalPosition: 'top'
      });
    };
  }

}
