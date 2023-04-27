import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export class CustomValidators {
    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                // if control is empty return no error
                return null;
            }

            // test the value of the control against the regexp supplied
            const valid = regex.test(control.value);

            // if true, return no error (no error), else return error passed in the second parameter
            return valid ? null : error;
        };
    }

    static comparePassword(error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const currentPassword: string = control.get('currentPassword').value; // get password from our currentPassword form control
            const password1: string = control.get('password').value; // get password from our password form control
            if (currentPassword === password1) {
                // if control is empty return no error
               return error;
            }

            // test the value of the control against the regexp supplied

            // if true, return no error (no error), else return error passed in the second parameter
            return null;
        };
    }


    static passwordMatchValidator(control: AbstractControl) {
        const password: string = control.get('password').value; // get password from our password form control
        const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
        // compare is the password math
        if (password !== confirmPassword) {
            // if they don't match, set an error in our confirmPassword form control
            control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
        } else {
            control.get('confirmPassword').setErrors(null);
        }
    }

    static currentPassAndNewPassMatchValidator(control: AbstractControl) {
        const currentPassword: string = control.get('currentPassword').value; // get password from our currentPassword form control
        const password1: string = control.get('password').value; // get password from our password form control
        // compare is the password math
        
         
         
        if (currentPassword === password1) {
            // if they  match, set an error in our Password form control
            control.get('password').setErrors({ PassswordMatch: false });
        } else {
            control.get('password').setErrors(null);
        }
    }
}