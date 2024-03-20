import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Text} from "../../model/text";

@Component({
  selector: 'app-syntax',
  templateUrl: './syntax.component.html',
  styleUrl: './syntax.component.css'
})
export class SyntaxComponent implements OnInit{
  texts: Text[] = []

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<Text[]>('http://localhost:5000/syntax').subscribe(
      data => {this.texts = data})
  }

}
