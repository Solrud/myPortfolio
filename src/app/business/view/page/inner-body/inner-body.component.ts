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
    console.log()
  }

  onContactMe(){
    this.openDialogService.openDialogContactMe();
  }
}

// СДЕЛАТЬ ПО БОКАМ У НАВЫКОВ ПОЛОСКИ ВНИЗ И ОТ "МОЕ РЕЗЮМЕ" ТОЖЕ ПОЛОСКИ ВНИЗ
//ToDo ЛИЦЕВАЯ ЧАСТЬ - ДИЗАЙН
// Сделать фотографии, фотку обтеать текстом , т.е. basis не подходит
// Сделать первую страницу красивой
// Сделать на первой странице на заднем фоне типа матрицы или чето такое, чтоб не пусто было
// Убрать бордеры с эсайдов
// Написать текст(рерайт од AI) второй страницы( и сделать красиво)
// футер дурацкий, нужен красивый
//  сделать лого solrud
//  ну и конечно адаптировать

//ToDo ТЕХНИЧЕСКАЯ ЧАСТЬ
// почистить css
// переопределить шрифт Перевести все в словарь(транслита) сделать перевод
// в html -> head настроить название, заставку, и прочее


// Кто я ?
// Привет, меня зовут Матвей Ильин
// и я начинающий веб-разработчик.
// Раньше я разрабатывал телеграм ботов на фрилансе
// но решил пойти в веб и мне понравилось!
// Я каждый день учу что нибудь новое..
// На данный момент я пиу на фрейморке Angular с помощью языка TypeScript..
// В дизайне я предпочитаю минималистичность и практичность
// Напишите мне, либо оставьте свои контакты и мы создадим с вами сайт,
// который будет вдохновлять людей вашей идеей!
