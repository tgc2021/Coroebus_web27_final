import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectFilter'
})
export class SelectFilterPipe implements PipeTransform {
  transform(list: any[], value: string){
    return value ? list.filter(item => item.reward_source === value) : list;
  }

}
