import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dollarToInr'
})
export class DollarToInrPipe implements PipeTransform {

  transform(value: number,): number {
    return Number((value*81.99).toFixed(2))
  }

}
