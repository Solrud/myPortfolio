import {Component, OnInit} from '@angular/core';
import {ViewportScroller} from "@angular/common";
import {
  EDUCATION_NAMES,
  EDUCATION_SPECIALIZATION,
  EDUCATION_TITLE,
  EDUCATION_YEARS, EXPERIENCE_NAME, EXPERIENCE_TITLE,
  EXPERIENCE_YEARS, SKILLS_NAMES, SKILLS_TITLE
} from "../../../../app.constant";
import {OpenDialogService} from "../../../data/service/OptionalService/open-dialog.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-inner-body',
  templateUrl: './inner-body.component.html',
  styleUrls: ['./inner-body.component.css']
})
export class InnerBodyComponent implements OnInit{
  //Навыки
  skills_title = SKILLS_TITLE;
  skills_names = SKILLS_NAMES;


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
  }

  onContactMe(){
    this.openDialogService.openDialogContactMe();
  }
}

// СДЕЛАТЬ ПО БОКАМ У НАВЫКОВ ПОЛОСКИ ВНИЗ И ОТ "МОЕ РЕЗЮМЕ" ТОЖЕ ПОЛОСКИ ВНИЗ
// Написать текст(рерайт од AI) второй страницы( и сделать красиво)
// Сделать на первой странице на заднем фоне типа матрицы или чето такое, чтоб не пусто было (пнгшка векторная)
// Убрать бордеры с эсайдов
// Сделать фотографии, фотку обтеать текстом , т.е. basis не подходит
// Сделать первую страницу красивой - адаптив для нав бара и чтобы картинка исчезала
// сделать в секциях vh-100 по другому
//  ну и конечно адаптировать
// футер дурацкий, нужен красивый
// в html -> head настроить название, заставку, и прочее
// карточки пустые не расстягиваются медиазапросах (тяп ляп чето сделелал)
// 1 секция height (хрен пойм как то сделал, проблема в модалке осталась)

//ToDo ЛИЦЕВАЯ ЧАСТЬ - ДИЗАЙН
// сделать лого solrud
// модалка неподдается , может gpt поможет




//ToDo ТЕХНИЧЕСКАЯ ЧАСТЬ
// почистить css
// переопределить шрифт Перевести все в словарь(транслита) сделать перевод



//текст в вк
