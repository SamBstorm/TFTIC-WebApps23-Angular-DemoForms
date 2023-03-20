import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.scss']
})
export class DemoFormComponent implements OnInit {

  inscriptionForm! : FormGroup;

  constructor(private _fb : FormBuilder){}

  ngOnInit(): void {
    this.inscriptionForm = this._fb.group({
      last_name : [null,[Validators.required]],
      first_name : [null,[Validators.required]],
      birth_date : [null,[Validators.required]],
      game_array : this._fb.array([])
    });
  }

  onSubmit():void{
    console.dir(this.inscriptionForm);
    console.log(this.inscriptionForm.value['last_name']);
    console.log(this.inscriptionForm.value['first_name']);
    console.log(this.inscriptionForm.value['birth_date']);
  }

  getGameArray() : FormArray{
    return this.inscriptionForm.get('game_array') as FormArray;
  }

  addGame():void {
    this.getGameArray().push(this._fb.group({
      game_name : [null, [Validators.required]],
      game_price : [null, []]
    }));
  }
}
