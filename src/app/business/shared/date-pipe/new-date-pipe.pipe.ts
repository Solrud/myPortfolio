import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'newDatePipe'
})
export class NewDatePipePipe implements PipeTransform {

  transform(date: Date | string, format: string = 'dd.MM.yyyy HH:mm:ss'): unknown {
    if(!date)
      return 'Нет даты'
    date = new Date(date);
    const currentDate = new Date().getDate();

    if(date.getDate() === currentDate){
      return `Сегодня ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }
    if(date.getDate() === currentDate - 1){
      return `Вчера ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }
    if(date.getDate() === currentDate - 2){
      return `Позавчера ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }

    return new DatePipe('en-US').transform(date, format)
  }
}
