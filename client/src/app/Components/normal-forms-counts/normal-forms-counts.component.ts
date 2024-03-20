import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Word} from "../../model/word";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-normal-forms-counts',
  templateUrl: './normal-forms-counts.component.html',
  styleUrl: './normal-forms-counts.component.css'
})
export class NormalFormsCountsComponent implements OnInit{
  normalForms: Word[] = [];
  id: string | null = '';

  constructor(private http : HttpClient,
              private route : ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.http.get<Word[]>('http://localhost:5000/texts/' + this.id + '/words').subscribe(data=>{this.normalForms = data})
  }
}
