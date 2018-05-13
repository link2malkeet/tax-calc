import { ValidatorFn, AbstractControl } from '@angular/forms';

/**
 * This validates the negative value on a control.
 */
export function negativeCheck(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const input = control.value;
        const isValid = input <= 0;
        if (isValid) {
            return { 'NO_NEGATIVE': {} };
        } else {
            return null;
        }
    };
}

/**
 * This validates whether value lies in the provided range.
 * @param min
 * @param max
 */
export function rangeValidation(min, max): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const input = control.value;
        const isValid = input > max || input < min;
        if (isValid) {
            return { 'RANGE_ERROR': { min, max } };
        } else {
            return null;
        }
    };
}
