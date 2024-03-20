import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-dependency-of-text',
  templateUrl: './dependency-of-text.component.html',
  styleUrl: './dependency-of-text.component.css'
})
export class DependencyOfTextComponent implements OnInit{
  id: string | null = ''
  svg: SafeHtml[] = [];

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.http.get<any>('http://localhost:5000/syntax/' + this.id).subscribe(response => {
      console.log(response.svg[0]);
      const svgCodeList = response.svg;
      this.svg = [];
      svgCodeList.forEach((svgCodeItem: any) => {
        this.svg.push(this.sanitizer.bypassSecurityTrustHtml(svgCodeItem));
      });
      console.log(this.svg)
    });
  }
}
