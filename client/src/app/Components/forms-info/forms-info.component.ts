import {Component, OnInit} from '@angular/core';
import {Form} from "../../model/form";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Word} from "../../model/word";

@Component({
  selector: 'app-forms-info',
  templateUrl: './forms-info.component.html',
  styleUrl: './forms-info.component.css'
})
export class FormsInfoComponent implements OnInit{
  word: Word | null = null
  text_id: string | null = ''
  form_id: string | null = ''
  synonyms: string | undefined = ''
  antonyms: string | undefined = ''

  constructor(private http: HttpClient,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.text_id = this.route.snapshot.paramMap.get('id');
    this.form_id = this.route.snapshot.paramMap.get('word');
    this.http.get<Word>('http://localhost:5000/texts/' + this.text_id + '/words/' + this.form_id).subscribe(
      data=> this.word = data
    )
  }

}
