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
import {BaseChartDirective} from "ng2-charts";
import { draw, generate } from 'patternomaly';

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
  isFirstTimeLoaded: boolean = true;

  typeForChartByYears: ChartType = 'bar';
  dataVisitorFilterByYearObj: ObjList = {}; // по годам
  datasetsForChartBarByYears: ChartData<any>;
  optionsForChartBarByYears: ChartOptions<any>;
  labelsForChartBarByYears: any[] = [];
  backgroundColorListForChartByYears = {ip: [], noIp: []};
  selectedChartByYearKey: number;
  selectedChartByYearIndex: number = -1;

  typeForChartByMonths: ChartType = 'bar';
  dataVisitorFilterByMonthsObj: ObjList = {}; // по месяцам в году
  datasetsForChartBarByMonths: ChartData<any>;
  optionsForChartBarByMonths: ChartOptions<any>;
  labelsForChartBarByMonths: any[] = [];
  backgroundColorListForChartByMonths = {ip: [], noIp: []};
  selectedChartByMonthKey: number;
  selectedChartByMonthIndex: number = -1;

  typeForChartByDays: ChartType = 'bar';
  dataVisitorFilterByDaysObj: ObjList = {}; // по дням в месяце
  datasetsForChartBarByDays: ChartData<any>;
  optionsForChartBarByDays: any;
  labelsForChartBarByDays: any[] = [];
  backgroundColorListForChartByDays = {ip: [], noIp: []};
  selectedChartByDayKey: number;
  selectedChartByDayIndex: number = -1;

  typeForChartByHours: ChartType = 'bar';
  dataVisitorFilterByHoursObj: ObjList = {}; // по часам в дне
  datasetsForChartBarByHours: ChartData<any>;
  optionsForChartBarByHours: ChartOptions<any>;


  // глобалльные настройки всех chart's
  backgroundColorSelectedChart: any = draw('diagonal-right-left', 'rgba(155,255,178,0.85)');
  backgroundColorChartWithIpDesc: string = 'rgb(60,158,255)';
  borderColorChartWithIpDesc: string = 'rgb(60,158,255)';
  backgroundColorChartNoIpDesc: string = 'rgba(255, 99, 132, 0.8)';
  borderColorChartNoIpDesc: string = 'rgba(255, 99, 132, 1)';
  borderWidthChart: number = 6;
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

  @ViewChild('chartByYears', { read: BaseChartDirective })
  private chartByYear: BaseChartDirective;

  @ViewChild('chartByMonths', { read: BaseChartDirective })
  private chartByMonths: BaseChartDirective;

  @ViewChild('chartByDays', { read: BaseChartDirective })
  private chartByDays: BaseChartDirective;

  @ViewChild('chartByHours', { read: BaseChartDirective })
  private chartByHours: BaseChartDirective;

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

    if (this.isMobile) this.borderWidthChart = 3;

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

      // ПО УМОЛЧАНИЮ ставится последний год
      if (!this.selectedChartByYearKey){
        this.selectedChartByYearKey = 0;
        for (let year of Object.keys(this.dataVisitorFilterByYearObj)){
          this.selectedChartByYearKey = Number(year) > this.selectedChartByYearKey ?
            Number(year) :
            this.selectedChartByYearKey; // получили последний год с визиторами
        }
      }

      this.toCreateBarChartByYears();
      // this.toCreateBarChartByMonth();
      // this.toCreateBarChartByDays();
      this.toCreateBarChartByHours();
      this.isFirstTimeLoaded = false;

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
  //toDo 1) defaultChartSetting, где инициализируются переменные по-умолчанию,
  // ISmOBILE BORDERcHART в другой метод
  // по нажатиюна лейбл выбирать столбец
  // менять значок при изменить тип диаграммы

  toCreateBarChartByYears(){
    if (this.dataVisitorFilterByYearObj){
      let dataChartNoIpDesc: number[] = []; //создание datasets для составных столбцов
      let dataChartWithIpDesc: number[] = [];

      this.labelsForChartBarByYears = [];
      this.backgroundColorListForChartByYears = {ip: [], noIp: []}
      Object.keys(this.dataVisitorFilterByYearObj)
        .forEach( key => {
          this.labelsForChartBarByYears.push(key);

          let tempCountWithIpDesc = 0;
          let tempCountNoIpDesc = 0;
          for (let i = 0; i < this.dataVisitorFilterByYearObj[key].length; i++){
            if (this.dataVisitorFilterByYearObj[key][i].ip_description){
              tempCountWithIpDesc ++;
            } else {
              tempCountNoIpDesc ++;
            }
          }
          dataChartWithIpDesc.push(tempCountWithIpDesc);
          dataChartNoIpDesc.push(tempCountNoIpDesc);

          this.backgroundColorListForChartByYears.ip.push(this.backgroundColorChartWithIpDesc);
          this.backgroundColorListForChartByYears.noIp.push(this.backgroundColorChartNoIpDesc);
        });

      if (this.isFirstTimeLoaded){
        const lastIndexBG = this.backgroundColorListForChartByYears.ip.length - 1;
        this.selectDataChartByYear(lastIndexBG);
      }


      this.datasetsForChartBarByYears = {
        labels: this.labelsForChartBarByYears,
        datasets: [
          {
            label: 'Знакомые IP',
            data: dataChartWithIpDesc,
            backgroundColor: this.backgroundColorListForChartByYears.ip,
            borderColor: this.borderColorChartWithIpDesc,
            borderWidth: this.borderWidthChart,
            fill: this.fillLineChart,
            tension: this.tensionLineChart,
          },
          {
            label: 'Незнакомые IP',
            data: dataChartNoIpDesc,
            borderWidth: this.borderWidthChart,
            fill: this.fillLineChart,
            tension: this.tensionLineChart,
            backgroundColor: this.backgroundColorListForChartByYears.noIp,
            borderColor: this.borderColorChartNoIpDesc
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
          title: {
            display: true,
            text: 'За все года',
            font: {
              size: 15
            },
            color: 'rgba(255,255,255,0.8)',
            padding: { top: 1, bottom: 7 }
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: 'rgba(255,255,255,0.63)',
              font: {size: 11}
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

  onClickChartByYears(event: any){
   if (event.active && event.active.length > 0) {
     const index = event.active[0].index;
     const datasetIndex = event.active[0].datasetIndex;

     if (index !== this.selectedChartByYearIndex){
       this.toResetDataChartByDays();
       this.toResetDataChartByHours();
       this.selectDataChartByYear(index);
     }
    }
  }

  selectDataChartByYear(index: number){
    if (this.selectedChartByYearIndex !== -1){
      this.backgroundColorListForChartByYears.ip[this.selectedChartByYearIndex] = this.borderColorChartWithIpDesc;
      this.backgroundColorListForChartByYears.noIp[this.selectedChartByYearIndex] = this.borderColorChartNoIpDesc;
    }
    this.backgroundColorListForChartByYears.ip[index] = draw('diagonal-right-left', this.backgroundColorChartWithIpDesc);
    this.backgroundColorListForChartByYears.noIp[index] = draw('diagonal-right-left', this.backgroundColorChartNoIpDesc);

    this.selectedChartByYearIndex = index;
    this.chartByYear.update();

    this.selectedChartByYearKey = Number(Object.keys(this.dataVisitorFilterByYearObj)[index]);
    this.toCreateBarChartByMonth();
  }

  toCreateBarChartByMonth(){
    const currentYear = this.selectedChartByYearKey;
    for (let i = 1; i <= 12; i++){
      this.dataVisitorFilterByMonthsObj[i] = []; // заполняем обьект пустыми списками по месяцам
    }

    for (let i = 0; i < this.dataVisitorFilterByYearObj[currentYear].length; i++){
      const month = this.dataVisitorFilterByYearObj[currentYear][i].date.getMonth() + 1;

      // заполняем визиторами обьект по месяцам, для чартов
      this.dataVisitorFilterByMonthsObj[month].push(this.dataVisitorFilterByYearObj[currentYear][i])
    }

    //создание списков для составных столбцов
    let dataChartWithIpDesc: number[] = [];
    let dataChartNoIpDesc: number[] = [];

    this.labelsForChartBarByMonths = [];
    this.backgroundColorListForChartByMonths = {ip: [], noIp: []}
    Object.keys(this.dataVisitorFilterByMonthsObj)
      .forEach( key => {
        this.labelsForChartBarByMonths.push(key);

        let tempCountWithIpDesc = 0;
        let tempCountNoIpDesc = 0;
        for (let i = 0; i < this.dataVisitorFilterByMonthsObj[key].length; i++){
          if (this.dataVisitorFilterByMonthsObj[key][i].ip_description){
            tempCountWithIpDesc ++;
          } else {
            tempCountNoIpDesc ++;
          }
        }
        dataChartWithIpDesc.push(tempCountWithIpDesc);
        dataChartNoIpDesc.push(tempCountNoIpDesc);

        this.backgroundColorListForChartByMonths.ip.push(this.backgroundColorChartWithIpDesc);
        this.backgroundColorListForChartByMonths.noIp.push(this.backgroundColorChartNoIpDesc);
      });

    if (this.isFirstTimeLoaded){
      let lastIndexBG = 0;

      if (!this.selectedChartByMonthKey){

        for (let month of Object.keys(this.dataVisitorFilterByMonthsObj)){
          if (this.dataVisitorFilterByMonthsObj[month].length > 0){
            lastIndexBG = Number(month) > lastIndexBG ?
              Number(month) :
              lastIndexBG;
          }
        }
      }

      this.selectDataChartByMonth(lastIndexBG - 1);
    }

    this.datasetsForChartBarByMonths = {
      labels: this.labelsForChartBarByMonths,
      datasets: [
        {
          label: 'Знакомые IP',
          data: dataChartWithIpDesc,
          backgroundColor: this.backgroundColorListForChartByMonths.ip,
          borderColor: this.borderColorChartWithIpDesc,
          borderWidth: this.borderWidthChart,
          fill: this.fillLineChart,
          tension: this.tensionLineChart,
        },
        {
          label: 'Незнакомые IP',
          data: dataChartNoIpDesc,
          borderWidth: this.borderWidthChart,
          fill: this.fillLineChart,
          tension: this.tensionLineChart,
          backgroundColor: this.backgroundColorListForChartByMonths.noIp,
          borderColor: this.borderColorChartNoIpDesc
        }
      ]}

    this.optionsForChartBarByMonths = {
      responsive: true,
      scales: {
        x: {
          ticks: {
            color: 'rgba(90,143,255,0.64)',  // Цвет подписей оси X
          },
          stacked: true
        },
        y: {
          stacked: true
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'За этот год (по месяцам)',
          font: {
            size: 15
          },
          color: 'rgba(255,255,255,0.8)',
          padding: { top: 1, bottom: 7 }
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: 'rgba(255,255,255,0.63)',
            font: {size: 11}
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

  onClickChartByMonths(event: any){
    if (event.active && event.active.length > 0) {
      const index = event.active[0].index;
      const datasetIndex = event.active[0].datasetIndex;

      if (index !== this.selectedChartByMonthIndex){
        this.toResetDataChartByHours();
        this.selectDataChartByMonth(index);
      }
    }
  }

  selectDataChartByMonth(index: number){
    if (this.selectedChartByMonthIndex !== -1){
      this.backgroundColorListForChartByMonths.ip[this.selectedChartByMonthIndex] = this.borderColorChartWithIpDesc;
      this.backgroundColorListForChartByMonths.noIp[this.selectedChartByMonthIndex] = this.borderColorChartNoIpDesc;
    }
    this.backgroundColorListForChartByMonths.ip[index] = draw('diagonal-right-left', this.backgroundColorChartWithIpDesc);
    this.backgroundColorListForChartByMonths.noIp[index] = draw('diagonal-right-left', this.backgroundColorChartNoIpDesc);

    this.selectedChartByMonthIndex = index;
    this.chartByMonths.update();

    this.selectedChartByMonthKey = Number(Object.keys(this.dataVisitorFilterByMonthsObj)[index]);
    this.toCreateBarChartByDays();
  }

  toCreateBarChartByDays(){
    const currentMonth = this.selectedChartByMonthKey;
    const totalDaysInCurrentMonth = new Date(new Date().getFullYear(), currentMonth, 0).getDate();

    for (let i= 1; i <= totalDaysInCurrentMonth; i++){
      this.dataVisitorFilterByDaysObj[i] = []; // заполняем обьект пустыми списками по месяцам
    }

    for (let i = 0; i < this.dataVisitorFilterByMonthsObj[currentMonth].length; i++){
      const day = this.dataVisitorFilterByMonthsObj[currentMonth][i].date.getDate();

      this.dataVisitorFilterByDaysObj[day].push(this.dataVisitorFilterByMonthsObj[currentMonth][i])
    }

    //создание списков для составных столбцов
    let dataChartWithIpDesc: number[] = [];
    let dataChartNoIpDesc: number[] = [];
    this.labelsForChartBarByDays = [];
    this.backgroundColorListForChartByDays = {ip: [], noIp: []}
    Object.keys(this.dataVisitorFilterByDaysObj)
      .forEach( key => {
        this.labelsForChartBarByDays.push(key);
        let tempCountWithIpDesc = 0;
        let tempCountNoIpDesc = 0;
        for (let i = 0; i < this.dataVisitorFilterByDaysObj[key].length; i++){
          if (this.dataVisitorFilterByDaysObj[key][i].ip_description){
            tempCountWithIpDesc ++;
          } else {
            tempCountNoIpDesc ++;
          }
        }
        dataChartWithIpDesc.push(tempCountWithIpDesc);
        dataChartNoIpDesc.push(tempCountNoIpDesc);

        this.backgroundColorListForChartByDays.ip.push(this.backgroundColorChartWithIpDesc);
        this.backgroundColorListForChartByDays.noIp.push(this.backgroundColorChartNoIpDesc);
      });


    if (this.isFirstTimeLoaded){
      let lastIndexBG = 0;

      if (!this.selectedChartByDayKey){

        for (let day of Object.keys(this.dataVisitorFilterByDaysObj)){
          if (this.dataVisitorFilterByDaysObj[day].length > 0){
            lastIndexBG = Number(day) > lastIndexBG ?
              Number(day) :
              lastIndexBG;
          }
        }
      }

      this.selectDataChartByDays(lastIndexBG - 1);
    }

    this.datasetsForChartBarByDays = {
      labels: Object.keys(this.dataVisitorFilterByDaysObj),
      datasets: [
        {
          label: 'Знакомые IP',
          data: dataChartWithIpDesc,
          backgroundColor: this.backgroundColorListForChartByDays.ip,
          borderColor: this.borderColorChartWithIpDesc,
          borderWidth: this.borderWidthChart,
          fill: this.fillLineChart,
          tension: this.tensionLineChart,
        },
        {
          label: 'Незнакомые IP',
          data: dataChartNoIpDesc,
          borderWidth: this.borderWidthChart,
          fill: this.fillLineChart,
          tension: this.tensionLineChart,
          backgroundColor: this.backgroundColorListForChartByDays.noIp,
          borderColor: this.borderColorChartNoIpDesc
        }
      ]}

    this.optionsForChartBarByDays = {
      responsive: true,
      scales: {
        x: {
          ticks: {
            color: 'rgba(90,143,255,0.64)'  // Цвет подписей оси X
          },
          stacked: true
        },
        y: {
          stacked: true
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'За этот месяц (по дням)',
          font: {
            size: 15
          },
          color: 'rgba(255,255,255,0.8)',
          padding: { top: 1, bottom: 7 }
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: 'rgba(255,255,255,0.63)',
            font: {size: 11}
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

  onClickChartByDays(event: any){
    if (event.active && event.active.length > 0) {
      const index = event.active[0].index;
      const datasetIndex = event.active[0].datasetIndex;

      if (index !== this.selectedChartByDayIndex)
        this.selectDataChartByDays(index);
    }
  }

  selectDataChartByDays(index: number){
    if (this.selectedChartByDayIndex !== -1){
      this.backgroundColorListForChartByDays.ip[this.selectedChartByDayIndex] = this.borderColorChartWithIpDesc;
      this.backgroundColorListForChartByDays.noIp[this.selectedChartByDayIndex] = this.borderColorChartNoIpDesc;
    }
    this.backgroundColorListForChartByDays.ip[index] = draw('diagonal-right-left', this.backgroundColorChartWithIpDesc);
    this.backgroundColorListForChartByDays.noIp[index] = draw('diagonal-right-left', this.backgroundColorChartNoIpDesc);

    this.selectedChartByDayIndex = index;
    this.chartByDays.update();

    this.selectedChartByDayKey = Number(Object.keys(this.dataVisitorFilterByDaysObj)[index]);
    this.toCreateBarChartByHours();
  }

  toResetDataChartByDays(): void {
    this.dataVisitorFilterByDaysObj = {}; // по дням в месяце
    this.datasetsForChartBarByDays = null;
    this.optionsForChartBarByDays = [];
    this.labelsForChartBarByDays = [];
    this.backgroundColorListForChartByDays = {ip: [], noIp: []};
    this.selectedChartByDayKey = null;
    this.selectedChartByDayIndex = -1;
  }

  toCreateBarChartByHours(){
    const currentDay = this.selectedChartByDayKey;

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

//создание списков для составных столбцов
    let dataChartWithIpDesc: number[] = [];
    let dataChartNoIpDesc: number[] = [];

    Object.keys(this.dataVisitorFilterByHoursObj)
      .sort()
      .forEach( key => {
        let tempCountWithIpDesc = 0;
        let tempCountNoIpDesc = 0;
        for (let i = 0; i < this.dataVisitorFilterByHoursObj[key].length; i++){
          if (this.dataVisitorFilterByHoursObj[key][i].ip_description){
            tempCountWithIpDesc ++;
          } else {
            tempCountNoIpDesc ++;
          }
        }
        dataChartWithIpDesc.push(tempCountWithIpDesc);
        dataChartNoIpDesc.push(tempCountNoIpDesc);
      });

    this.datasetsForChartBarByHours = {
      labels: Object.keys(this.dataVisitorFilterByHoursObj).sort(),
      datasets: [
        {
          label: 'Знакомые IP',
          data: dataChartWithIpDesc,
          backgroundColor: this.backgroundColorChartWithIpDesc,
          borderColor: this.borderColorChartWithIpDesc,
          borderWidth: this.borderWidthChart,
          fill: this.fillLineChart,
          tension: this.tensionLineChart,
        },
        {
          label: 'Незнакомые IP',
          data: dataChartNoIpDesc,
          borderWidth: this.borderWidthChart,
          fill: this.fillLineChart,
          tension: this.tensionLineChart,
          backgroundColor: this.backgroundColorChartNoIpDesc,
          borderColor: this.borderColorChartNoIpDesc
        }
      ]}

    this.optionsForChartBarByHours = {
      responsive: true,
      scales: {
        x: {
          ticks: {
            color: 'rgba(90,143,255,0.64)'  // Цвет подписей оси X
          },
          stacked: true
        },
        y: {
          stacked: true,
          ticks: {
            stepSize: 1,
            callback: (value) => {
              // Если число целое - возвращаем без десятичной части
              return Number.isInteger(value) ? value.toString() : value;
            }
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'За этот день (по часам)',
          font: {
            size: 15
          },
          color: 'rgba(255,255,255,0.8)',
          padding: { top: 1, bottom: 7 }
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: 'rgba(255,255,255,0.63)',
            font: {size: 11}
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

  toResetDataChartByHours(): void {
    this.dataVisitorFilterByHoursObj = {}; // по дням в месяце
    this.datasetsForChartBarByHours = null;
    this.optionsForChartBarByHours = [];
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
