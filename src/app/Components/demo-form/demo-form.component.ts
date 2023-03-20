import { CustomValidatorsService } from './../../Services/custom-validators.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.scss']
})
export class DemoFormComponent implements OnInit {

  inscriptionForm! : FormGroup;

  constructor(private _fb : FormBuilder, private _validators : CustomValidatorsService){}

  ngOnInit(): void {
    this.inscriptionForm = this._fb.group({
      last_name : [null,[Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      first_name : [null,[Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      birth_date : [null,[Validators.required, this._validators.isMajor()]],
      phone : [null,[Validators.required, this._validators.phoneNumber()]],
      game_array : this._fb.array([])
    });
  }

  onSubmit():void{
    console.dir(this.inscriptionForm);
    if(!this.inscriptionForm.valid) console.error("Le formulaire n'est pas valide...");
    else{
      console.log(this.inscriptionForm.value['last_name']);
      console.log(this.inscriptionForm.value['first_name']);
      console.log(this.inscriptionForm.value['birth_date']);
    }
  }

  getGameArray() : FormArray{
    return this.inscriptionForm.get('game_array') as FormArray;
  }

  addGame():void {
    this.getGameArray().push(this._fb.group({
      game_name : [null, [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      game_price : [null, [Validators.min(0)]]
    }));
  }
}
