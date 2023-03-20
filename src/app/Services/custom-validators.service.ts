import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor() { }

  isMajor() : ValidatorFn {
    return (control : AbstractControl): ValidationErrors | null => {
      const value = control.value;
      console.log(value);
      if(!value) return null;
      const valueInMillisecond : number = new Date(value).getTime();
      const today : number = new Date().getTime();
      const diff : number = today - valueInMillisecond;
      const yearBetween : number = new Date(diff).getFullYear()-1970;
      if(yearBetween < 18) return {isMajor : true};
      return null;
    };
  }

  phoneNumber() : ValidatorFn {
    return (control : AbstractControl) : ValidationErrors | null =>{
      const value : string = control.value;
      if(!value) return null;
      const onlyNumber :string = value.replace('+','00')
                                      .replace('-','')
                                      .replace('.','')
                                      .replace('/','');
      console.log(onlyNumber);
      if(isNaN(Number(onlyNumber))) return {phoneNumber : true};
      return null;
    }
  }
}
