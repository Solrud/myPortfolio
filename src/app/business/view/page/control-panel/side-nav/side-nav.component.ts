import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {VisitorDTO} from "../../../../data/model/dto/impl/VisitorDTO";
import {TableType} from "./table-control/table-type";
import {contactsFieldColumnList, visitorsFieldColumnList} from "../../../../../app.constant";
import {ContactDTO} from "../../../../data/model/dto/impl/ContactDTO";
import {VisitorsService} from "../../../../data/service/Visitors/visitors.service";
import {ContactsService} from "../../../../data/service/Contacts/contacts.service";
import {DeviceDetectorService} from "ngx-device-detector";
import {OpenDialogService} from "../../../../data/service/OptionalService/open-dialog.service";
import {DialogResult} from "../../../../shared/dialog-result";
import {EventsService} from "../../../../data/service/OptionalService/events.service";
import {ChartData, ChartOptions, ChartType} from "chart.js";

type ObjList = {
  [key: string]: any[]
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit{
  // contact
  contactsFieldList = contactsFieldColumnList;
  dataContactsList: ContactDTO[] | null = null;

  // visitor
  searchVisitors: VisitorDTO | null = null
  dataVisitorsList: VisitorDTO[] | null = null;
  visitorsFieldList = visitorsFieldColumnList;
  filteredVisitorIp: string;
  chosenVisitorRow: VisitorDTO;

  isMobile: boolean;

  isCheckedCheckboxForDelete: boolean;

  // chart
  dataVisitorFilterByYearObj: ObjList = {}; // по годам
  datasetsForChartBarByYears: ChartData<any>;
  optionsForChartBarByYears: ChartOptions<any>;
  typeForChartByYears: ChartType = 'bar';

  dataVisitorFilterByMonthsObj: ObjList = {}; // по месяцам в году
  datasetsForChartBarByMonths: ChartData<any>;
  optionsForChartBarByMonths: ChartOptions<any>;
  typeForChartByMonths: ChartType = 'bar';

  dataVisitorFilterByDaysObj: ObjList = {}; // по дням в месяце
  datasetsForChartBarByDays: ChartData<any>;
  optionsForChartBarByDays: any;
  typeForChartByDays: ChartType = 'bar';

  dataVisitorFilterByHoursObj: ObjList = {}; // по часам в дне
  datasetsForChartBarByHours: ChartData<any>;
  optionsForChartBarByHours: ChartOptions<any>;
  typeForChartByHours: ChartType = 'bar';

  // глобалльные настройки всех chart's
  backgroundColorChart: string = 'rgb(60,158,255)';
  borderColorChart: string = 'rgb(60,158,255)';
  borderWidthChart: number = 3;
  tensionLineChart: number = 0.4;
  fillLineChart: boolean = false;


  constructor(private contactsService: ContactsService,
              private visitorService: VisitorsService,
              private deviceDetectorService: DeviceDetectorService,
              private openDialogService: OpenDialogService,
              private eventsService: EventsService) {
  }

  @ViewChild(MatDrawer)
  private readonly drawerComponent?: MatDrawer;

  get TableType() {
    return TableType
  }

  ngOnInit(): void {
    this.initDefault();

    this.toSearchVisitors(this.searchVisitors);
    this.updateAndGetAllContacts();

    this._subscribeForCheckboxForDelete();
  }

  initDefault(): void {
    this.isMobile = this.deviceDetectorService.isMobile();

    if (!this.searchVisitors)
      this.searchVisitors = new VisitorDTO();
  }

  toSearchVisitors(searchObj: VisitorDTO): void {
    //toDo если фильтр по айпи + фильтр по наличию описания то в обьект поиска попадает последнее свойство (фильтр)

    this.chosenVisitorRow = null;
    this.filteredVisitorIp = null;
    if(searchObj != this.searchVisitors){
      this.toSetNewSearchFromPage(searchObj, this.searchVisitors)
    }

    let dataVisitorsList = [];
    this.visitorService.search(this.searchVisitors).subscribe(result => {
      dataVisitorsList = result;

      for (let i = 0; i < dataVisitorsList.length; i++) {
        const parts = (dataVisitorsList[i].date).split(' ')
        const dateParts = parts[0].split('.');
        const timeParts = parts[1].split(':');
        const utc = parseInt(parts[2].split('+')[1]);

        const date = new Date(Date.UTC(
          parseInt(dateParts[2]),
          parseInt(dateParts[1]) - 1,
          parseInt(dateParts[0]),
          parseInt(timeParts[0]) - utc,
          parseInt(timeParts[1]),
          parseInt(timeParts[2])
        ));

        dataVisitorsList[i].date = date;

        if (!this.dataVisitorFilterByYearObj[date.getFullYear()]){ // заполняем визиторами обьект по годам, для чартов
          this.dataVisitorFilterByYearObj[date.getFullYear()] = [];
        }
        this.dataVisitorFilterByYearObj[date.getFullYear()].push(dataVisitorsList[i])
      }

      this.toCreateBarChartByYears();
      this.toCreateBarChartByMonth();
      this.toCreateBarChartByDays();
      this.toCreateBarChartByHours();

      this.eventsService.allDataVisitorList$.next(dataVisitorsList); // тут ВСЕ визиторы

      if(searchObj.hasIpDesc === true){
        dataVisitorsList = dataVisitorsList.filter(visitor => {
          return visitor.ip_description !== null
        });
      }
      if(searchObj.hasIpDesc === false){
        dataVisitorsList = dataVisitorsList.filter(visitor => {
          return visitor.ip_description == null || visitor.ip_description === ''
        })
      }

      this.dataVisitorsList = dataVisitorsList; // а тут визиторы которые отображаются по фильтру
    })
  }
z
  toCreateBarChartByYears(){
    if (this.dataVisitorFilterByYearObj){
      //создание списка с данными

      const dataChart: number[] = Object.keys(this.dataVisitorFilterByYearObj)
        .map( key => this.dataVisitorFilterByYearObj[key].length);

      this.datasetsForChartBarByYears = {
        labels: Object.keys(this.dataVisitorFilterByYearObj),
        datasets: [
          {
            label: 'За все года',
            data: dataChart,
            backgroundColor: this.backgroundColorChart,
            borderColor: this.borderColorChart,
            borderWidth: this.borderWidthChart,
            fill: this.fillLineChart,
            tension: this.tensionLineChart,
          }
        ]}

      this.optionsForChartBarByYears = {
        responsive: true,

        scales: {
          x: {
            ticks: {color: 'rgba(90,143,255,0.64)'}, // Цвет подписей оси X
            stacked: true
          },
          y: {
            stacked: true
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: 'rgba(255,255,255,0.63)',
              font: {size: 13}
            }
          },
          colors: {
            enabled: true
          }
        }
      }
    }
  }

  onToggleTypeCharByYears(): void {
    this.typeForChartByYears = this.typeForChartByYears == 'bar' ? 'line' : 'bar';
  }

  toCreateBarChartByMonth(){
    let currentYear = 0;
    for (let year of Object.keys(this.dataVisitorFilterByYearObj)){
      currentYear = Number(year) > currentYear ? Number(year) : currentYear; // получили последний год с визиторами
    }

    for (let i = 1; i <= 12; i++){
      this.dataVisitorFilterByMonthsObj[i] = []; // заполняем обьект пустыми списками по месяцам
    }

    for (let i = 0; i < this.dataVisitorFilterByYearObj[currentYear].length; i++){
      const month = this.dataVisitorFilterByYearObj[currentYear][i].date.getMonth() + 1;

      // заполняем визиторами обьект по месяцам, для чартов
      this.dataVisitorFilterByMonthsObj[month].push(this.dataVisitorFilterByYearObj[currentYear][i])
    }

    // заполнение chart inputs datasets, options, labels
    const dataChart = Object.keys(this.dataVisitorFilterByMonthsObj)
      .map( key => this.dataVisitorFilterByMonthsObj[key].length)

    this.datasetsForChartBarByMonths = {
      labels: Object.keys(this.dataVisitorFilterByMonthsObj),
      datasets: [
        {
          label: 'За текущий год (по месяцам)',
          data: dataChart,
          backgroundColor: this.backgroundColorChart,
          borderColor: this.borderColorChart,
          borderWidth: this.borderWidthChart,
          fill: this.fillLineChart,
          tension: this.tensionLineChart,
        }
      ]}

    this.optionsForChartBarByMonths = {
      responsive: true,
      scales: {
        x: {
          ticks: {
            color: 'rgba(90,143,255,0.64)'  // Цвет подписей оси X
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: 'rgba(255,255,255,0.63)',
            font: {size: 13}
          }
        },
        colors: {
          enabled: true
        }
      }
    }
  }

  onToggleTypeCharByMonths(): void {
    this.typeForChartByMonths = this.typeForChartByMonths == 'bar' ? 'line' : 'bar';
  }

  toCreateBarChartByDays(){
    const currentMonth = new Date().getMonth() + 1;
    const totalDaysInCurrentMonth = new Date(new Date().getFullYear(), currentMonth, 0).getDate();

    for (let i= 1; i <= totalDaysInCurrentMonth; i++){
      this.dataVisitorFilterByDaysObj[i] = []; // заполняем обьект пустыми списками по месяцам
    }

    for (let i = 0; i < this.dataVisitorFilterByMonthsObj[currentMonth].length; i++){
      const day = this.dataVisitorFilterByMonthsObj[currentMonth][i].date.getDate();

      this.dataVisitorFilterByDaysObj[day].push(this.dataVisitorFilterByMonthsObj[currentMonth][i])
    }

    const dataChart = Object.keys(this.dataVisitorFilterByDaysObj)
      .map(key => this.dataVisitorFilterByDaysObj[key].length)

    this.datasetsForChartBarByDays = {
      labels: Object.keys(this.dataVisitorFilterByDaysObj),
      datasets: [
        {
          label: 'За текущий месяц (по дням)',
          data: dataChart,
          backgroundColor: this.backgroundColorChart,
          borderColor: this.borderColorChart,
          borderWidth: this.borderWidthChart,
          fill: this.fillLineChart,
          tension: this.tensionLineChart,
        }
      ]}

    this.optionsForChartBarByDays = {
      responsive: true,
      scales: {
        x: {
          ticks: {
            color: 'rgba(90,143,255,0.64)'  // Цвет подписей оси X
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: 'rgba(255,255,255,0.63)',
            font: {size: 13}
          }
        },
        colors: {
          enabled: true
        }
      }
    }
  }

  onToggleTypeCharByDays(): void {
    this.typeForChartByDays = this.typeForChartByDays == 'bar' ? 'line' : 'bar';
  }

  toCreateBarChartByHours(){
    const currentDay = new Date().getDate();

    for (let i= 0; i <= 23; i++){
      let j: any = i;
      if(j < 10) j = '0' + i;
      this.dataVisitorFilterByHoursObj[j] = []; // заполняем обьект пустыми списками по месяцам
    }

    for (let i = 0; i < this.dataVisitorFilterByDaysObj[currentDay].length; i++){
      let hour = this.dataVisitorFilterByDaysObj[currentDay][i].date.getHours();
      hour = hour < 10 ? '0' + hour : hour;

      this.dataVisitorFilterByHoursObj[hour].push(this.dataVisitorFilterByDaysObj[currentDay][i])
    }

    const dataChart = Object.keys(this.dataVisitorFilterByHoursObj)
      .sort()
      .map(key => this.dataVisitorFilterByHoursObj[key].length)
    this.datasetsForChartBarByHours = {
      labels: Object.keys(this.dataVisitorFilterByHoursObj).sort(),
      datasets: [
        {
          label: 'За этот день (по часам)',
          data: dataChart,
          backgroundColor: this.backgroundColorChart,
          borderColor: this.borderColorChart,
          borderWidth: this.borderWidthChart,
          fill: this.fillLineChart,
          tension: this.tensionLineChart,
        }
      ]}

    this.optionsForChartBarByHours = {
      responsive: true,
      scales: {
        x: {
          ticks: {
            color: 'rgba(90,143,255,0.64)'  // Цвет подписей оси X
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: 'rgba(255,255,255,0.63)',
            font: {size: 13}
          }
        },
        colors: {
          enabled: true
        }
      }
    }
  }

  onToggleTypeCharByHours(): void {
    this.typeForChartByHours = this.typeForChartByHours == 'bar' ? 'line' : 'bar';
  }

  updateAndGetAllContacts() {
    this.contactsService.getAll().subscribe( result => {
      this.dataContactsList = result
    })
  }

  onClickVisitorRow(row: VisitorDTO) {
    this.chosenVisitorRow = row;
  }

  _subscribeForCheckboxForDelete(): void{
    this.eventsService.isDontShowAgainForDelete$.subscribe(resultDontShow => {
      this.isCheckedCheckboxForDelete = resultDontShow;
    })
  }

  onClickDeleteVisitorRow(){
    const row = this.chosenVisitorRow;
      if(!this.isCheckedCheckboxForDelete){
        this.openDialogService.openConfirmDialog(row, 'Вы точно хотите удалить строку с id:')
          .afterClosed()
          .subscribe( dialogResult => {
            if (dialogResult === DialogResult.ACCEPT && row.id){
              this.visitorService.delete(row.id).subscribe( result => {
                if (result === true){
                  this.toSearchVisitors(this.searchVisitors);
                }
              })
            }
          })
      }
      if(this.isCheckedCheckboxForDelete){
        this.visitorService.delete(row.id).subscribe( result => {
          if (result === true){
            this.toSearchVisitors(this.searchVisitors);
          }
        })
      }
  }

  toSearchByVisitorIp() {
    this.filteredVisitorIp = this.chosenVisitorRow.ip;
  }

  toOpenModalForInfoOfVisitor() {
    this.openDialogService.openDialogVisitor(this.chosenVisitorRow)
      .afterClosed()
      .subscribe(resultDialog => {
      if (resultDialog == DialogResult.EDIT){
          this.toSearchVisitors(this.searchVisitors);
        }
    });
  }

  toggleSidenavOpened(){
    this.drawerComponent?.toggle();
  }

  // присваивает к существующему search object пагинаторные свойства
  toSetNewSearchFromPage(newSearchPage: VisitorDTO | ContactDTO, oldSearch: VisitorDTO | ContactDTO){
    Object.keys(newSearchPage).forEach(key => {
      if (oldSearch.hasOwnProperty(key)) {
        oldSearch[key] = newSearchPage[key];
      }
    })
  }
}
