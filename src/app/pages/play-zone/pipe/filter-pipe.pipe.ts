import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(list: any[], value: string){
    return value ? list.filter(item => item.spot_type === value) : list;
  }

}
