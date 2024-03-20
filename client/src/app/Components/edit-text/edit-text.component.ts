import {Component, OnInit} from '@angular/core';
import {Text} from "../../model/text";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-text',
  templateUrl: './edit-text.component.html',
  styleUrl: './edit-text.component.css'
})
export class EditTextComponent implements OnInit{
  texts: Text[] = []
  id: string | null = ''
  constructor(private http: HttpClient,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.http.get<Text[]>('http://localhost:5000/texts').subscribe(
        data =>{ this.texts = data; }
    )
    this.id = this.route.snapshot.paramMap.get('id')
  }

  saveTextChanges():void{
    if(this.texts)
    {
      if(this.id && this.texts)
      {
        for (const text of this.texts)
        {
          if(text.id == this.id)
          {
            this.http.put('http://localhost:5000/texts/' + this.id, {'content': text.content}).subscribe()
          }
        }
      }
    }
  }
}
