import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  fileUploadURL = "http://localhost:9090/jobs/product/upload"
  csvdownLoadURL = "http://localhost:9090/jobs/product"
  file: any
  constructor(
    private _http:HttpClient
  ) { }

  ngOnInit(): void {
  }

  selectFile = event =>{
    //console.log(event)
    this.file = event.target.files[0];
    console.log(this.file);
  };

  uploadFile() {
    let formData = new FormData();
    formData.append("file",this.file);
    this._http.post(this.fileUploadURL,formData).subscribe(
      (data)=>{
        console.log(data);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  downLoadFie() {
    this._http.get(this.csvdownLoadURL).subscribe(
      (data)=>{
        console.log(data);
        var options = { 
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalseparator: '.',
          showLabels: true, 
          showTitle: false,
          title: 'Your title',
          useBom: true,
          noDownload: false,
          headers: ["productId", "productName", "productDesc", "productPrice"]
        };
       
        new ngxCsv(data, "filename", options);
      },
      (error)=>{
        console.log(error);
      }
    );
  }
}
