import {Component, OnInit} from '@angular/core';
import {Text} from "../../model/text";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
    texts: Text[] = [];
    selectedFiles: File[] = [];

    constructor(
      private http: HttpClient
    ) {
    }

    ngOnInit() {
      this.http.get<Text[]>('http://localhost:5000/texts').subscribe(
        data =>{
          this.texts = data;
        }
      )
    }

    onFileSelected(event: any): void {
      this.selectedFiles = event.target.files;
    }

    reload():void{
      window.location.reload();
    }

    uploadFiles(event: Event): void {
    event.preventDefault();
    if (this.selectedFiles.length > 0) {
      const formData = new FormData();
      for (const file of this.selectedFiles) {
        formData.append('files', file);
      }

      this.http.post('http://localhost:5000/texts', formData).subscribe(
        data => {
          console.log(data)
        }
      );
      this.http.get<Text[]>('http://localhost:5000/texts').subscribe(
        data =>{
          this.texts = data;
        }
      )
    }
  }
}
