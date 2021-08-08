import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatData',
})
export class FormatDataPipe implements PipeTransform {
  // value: là giá trị cần format
  // args: là chỉ số của thằng pipe. VD: formatData: 10
  transform(value: any, ...args: any[]): any {
    return value.substr(0, args) + '...';
  }
}
