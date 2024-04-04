import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export class SearchPageComponent implements OnInit{
  autocompleteOptions!: WordDTO[];
  inputValue: string = '';
  dict:{ [key: string]: any } = {}
  set: string[] = []

  public checkboxForm!: FormGroup;
  part_of_speech_values = [
    'Существительное',
    'Прилагательное (полное)',
    'Прилагательное (краткое)',
    'Компаратив',
    'Глагол',
    'Инфинитив',
    'Причастие (полное)',
    'Причастие (краткое)',
    'Деепричастие',
    'Числительное',
    'Наречие',
    'Местоимение-существительное',
    'Предикатив',
    'Предлог',
    'Союз',
    'Частица',
    'Междометие'
  ];

  animation_values = [
    'одушевленность',
    'неодушевленность'
  ];

  gender_values = [
      'мужской род',
      'женский род',
      'средний род'
  ];

  number_values = [
      'единственное число',
      'множественное число'
  ];

  case_values = [
      'именительный падеж',
      'родительный падеж',
      'дательный падеж',
      'винительный падеж',
      'творительный падеж',
      'предложный падеж',
      'звательный падеж',
      'первый родительный падеж',
      'второй родительный падеж',
      'второй винительный падеж',
      'первый предложный падеж',
      'второй предложный падеж',
      'второй творительный падеж'
  ];

  degree_values = [
      'превосходная степень',
      'сравнительная степень'
  ];

  mest_values = [
      'качественное',
      'местоименное',
      'порядковое',
      'притяжательное'
  ];

  time_values = [
      'прошедшее',
      'настоящее',
      'будущее'
  ];

  type_values = [
      'несовершенный вид',
      'совершенный вид'
  ];

  inclination_values = [
      'Изъявительное наклонение',
      'Повелительное наклонение',
      'Условное наклонение',
      'Сослагательное наклонение'
  ];

  constructor(private http : HttpClient,
              private fb: FormBuilder) {

  }

getSelectedCheckboxes() {
  let res = ''
  for (const elem of this.set){
    res = res+elem +","
  }
  return res;
}

  search() {
    let chars = this.getSelectedCheckboxes()
    this.http.get<WordDTO[]>(`http://localhost:5000/search?value=${this.inputValue}&chars=${chars}`).subscribe(
      data=>{
        this.autocompleteOptions = data
        if(this.autocompleteOptions.length>100){
          this.autocompleteOptions = this.autocompleteOptions.slice(0, 100);
        }
      }
    )
  }



  createLoginForm(): FormGroup {
    for (let i =0; i<this.part_of_speech_values.length; i++){
      this.dict[this.part_of_speech_values[i]] = new FormControl();
    }
    for (let i =0; i<this.animation_values.length; i++){
      this.dict[this.animation_values[i]] = new FormControl();
    }
    for (let i =0; i<this.case_values.length; i++){
      this.dict[this.case_values[i]] = new FormControl();
    }
    for (let i =0; i<this.degree_values.length; i++){
      this.dict[this.degree_values[i]] = new FormControl();
    }
    for (let i =0; i<this.gender_values.length; i++){
      this.dict[this.gender_values[i]] = new FormControl();
    }
    for (let i =0; i<this.inclination_values.length; i++){
      this.dict[this.inclination_values[i]] = new FormControl();
    }
    for (let i =0; i<this.number_values.length; i++){
      this.dict[this.number_values[i]] = new FormControl();
    }
    for (let i =0; i<this.time_values.length; i++){
      this.dict[this.time_values[i]] = new FormControl();
    }
    for (let i =0; i<this.type_values.length; i++){
      this.dict[this.type_values[i]] = new FormControl();
    }
    for (let i =0; i<this.mest_values.length; i++){
      this.dict[this.mest_values[i]] = new FormControl();
    }
    return this.fb.group(this.dict);
  }

  ngOnInit(): void {
    this.checkboxForm = this.createLoginForm();
    this.http.get<WordDTO[]>(`http://localhost:5000/search?value=&chars=`).subscribe(
      data=>{
        this.autocompleteOptions = data;
        this.autocompleteOptions = this.autocompleteOptions.slice(0, 100);
        console.log(this.autocompleteOptions)
      }
    )

  }

  change(value: string) {
    if (this.set.includes(value)){
      this.set = this.set.filter(str => str!== value);
    }else {
     this.set.push(value);
    }
    this.search();
  }
}

interface WordDTO{
  id: number;
  normal_form: string;
  number: number;
  text_id: number;
}
