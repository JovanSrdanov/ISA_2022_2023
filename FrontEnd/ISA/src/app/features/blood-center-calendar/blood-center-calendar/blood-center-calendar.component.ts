import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit,} from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours,addMinutes} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { BloodCenterService } from 'src/app/http-services/blood-center.service';
import { BloodCenterRoundedWorkingHours } from 'src/app/model/blood-center/blood-center-rounded-working-hours';
import { BloodCenterCalendarAppointment } from 'src/app/model/blood-center/blood-center-calendar-appointment';

const colors: Record<string, EventColor> = {
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  }
};


@Component({
  selector: 'app-blood-center-calendar',
  templateUrl: './blood-center-calendar.component.html',
  styleUrls: ['./blood-center-calendar.component.css'],
})
export class BloodCenterCalendarComponent implements OnInit{
@ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | null =  null;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = true;
  refresh = new Subject<void>();

  modalData: {
    action: string;
    event: CalendarEvent;
  } | null = null;


  weekStartsOn: number = 1; //Monday

  events: CalendarEvent[] = [];
  dayStartHour : number = 0;
  dayEndHour : number = 0;

  // {
  //   start: this.startDate,
  //   end: this.endDate,
  //   title: this.parseDate(this.startDate) + "  Duration:" + this.duration + "min,   " + this.name + " " + this.surname,
  //   color: { ...colors['blue'] },
  // }

  // parseDate = (date:Date) : string => {
  //    const hours : string = date.getHours() < 10 ? '0' + date.getHours() : '' + date.getHours();
  //    const minutes : string = date.getMinutes() < 10 ? '0' + date.getMinutes() : '' + date.getMinutes();
  //    return hours + ":" + minutes;
  // }

  appointmentToEvent = (appointment : BloodCenterCalendarAppointment): CalendarEvent => {
      return {
        start : appointment.start,
        end : appointment.end,
        title : appointment.info,
        color: { ...colors['blue'] }
      }
  }


  constructor(private readonly modal: NgbModal, private readonly bloodCenterService : BloodCenterService) {}
  ngOnInit(): void {
      this.bloodCenterService.getWorkingHoursRounded().subscribe({
        next: (response: BloodCenterRoundedWorkingHours) =>{
            this.dayStartHour = response.startHours;
            this.dayEndHour = response.endHours;

            //Getting all appointments
            this.bloodCenterService.getAppointments().subscribe({
              next: (response: BloodCenterCalendarAppointment[]) =>
              {
                  response.forEach(appointment => this.events.push(this.appointmentToEvent(appointment)));
              }
            })
        }
      })
  }





  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }


  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
