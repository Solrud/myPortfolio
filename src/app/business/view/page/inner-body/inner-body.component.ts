import {Component, OnInit} from '@angular/core';
import {ViewportScroller} from "@angular/common";
import {
  EDUCATION_NAMES,
  EDUCATION_SPECIALIZATION,
  EDUCATION_TITLE,
  EDUCATION_YEARS, EXPERIENCE_NAME, EXPERIENCE_TITLE, EXPERIENCE_YEARS,
  RESUME_CARDS, SKILLS_NAMES, SKILLS_TITLE
} from "../../../../app.constant";
import {OpenDialogService} from "../../../data/service/OptionalService/open-dialog.service";

@Component({
  selector: 'app-inner-body',
  templateUrl: './inner-body.component.html',
  styleUrls: ['./inner-body.component.css']
})
export class InnerBodyComponent implements OnInit{
  //Навыки
  skills_title = SKILLS_TITLE;
  skills_names = SKILLS_NAMES;
  resumeCards = RESUME_CARDS;


  //Обучение
  education_title = EDUCATION_TITLE;
  education_names = EDUCATION_NAMES;
  education_years = EDUCATION_YEARS;
  education_specialization = EDUCATION_SPECIALIZATION;

  //Опыт работы
  experience_title = EXPERIENCE_TITLE;
  experience_names = EXPERIENCE_NAME;
  experience_years = EXPERIENCE_YEARS;

  constructor(private openDialogService: OpenDialogService) {
  }

  ngOnInit(): void {
    console.log(this.resumeCards[0])
  }

  onContactMe(){
    this.openDialogService.openDialogContactMe();
  }
}


//ToDo СДЕЛАТЬ ПО БОКАМ У НАВЫКОВ ПОЛОСКИ ВНИЗ И ОТ "МОЕ РЕЗЮМЕ" ТОЖЕ ПОЛОСКИ ВНИЗ
// Сделать фотографии
// Сделать первую страницу красивой
// Сделать на первой странице на заднем фоне типа матрицы или чето такое, чтоб не пусто было
// Убрать бордеры с эсайдов
// Написать текст второй страницы( и сделать красиво)
// почистить css
// футер дурацкий, нужен красивый
// переопределить шрифт
