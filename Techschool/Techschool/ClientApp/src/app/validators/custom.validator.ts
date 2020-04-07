import { AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidator {
  static number(control: AbstractControl) {
    const value = control.value;
    if (value !== '' && Number.isInteger(+value)) {
      return null;
    } else {
      return { 'number': true };
    }
  }

  // We add a error to the required field, since it will be more convenient to work with it later
  static isBefore(firstDate: string, secondDate: string, errorName: string) {
    return (group: FormGroup): {[key: string]: any} => {
      const firstDateControl = group.controls[firstDate];
      const secondDateControl = group.controls[secondDate];
      if (new Date(firstDateControl.value) > new Date(secondDateControl.value)) {
        const obj = {};
        obj[errorName] = true;
        secondDateControl.setErrors(obj);
        return obj;
      } else {
        return null;
      }
   }
  }
}
