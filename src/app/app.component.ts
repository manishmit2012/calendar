import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

const colors: any = {
  LIGHT_BLUE: {
	primary: '#4d71fe36',
	secondary: '#4d71fe36',
  },
  GREEN: {
	primary: '#a5c54978',
	secondary: '#a5c54978',
  },
  yellow: {
	primary: '#e3bc08',
	secondary: '#FDF1BA',
  },
};

import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [CurrencyPipe],
})
export class AppComponent implements OnInit {
	
	@ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
	CalendarView = CalendarView;
	view: CalendarView = CalendarView.Week;
	viewDate: Date = new Date();
	modalData: {
		action: string;
		event: CalendarEvent;
	};
	CALENDAR_ACTIONS: any = {
		CLICKED: 'Clicked',
		DELETED: 'Deleted',
		EDITED: 'Edited',
		ADD: 'Add'
	}

	actions: CalendarEventAction[] = [
		{
			label: '<i class="fas fa-fw fa-trash-alt mr-2"></i>',
			a11yLabel: 'Delete',
			onClick: ({ event }: { event: CalendarEvent }): void => {
				this.itineraryList = this.itineraryList.filter((iEvent) => iEvent !== event);
				this.deleteEvent(event);
			},
		},
		{
			label: '<i class="fas fa-fw fa-pencil-alt mr-1"></i>',
			a11yLabel: 'Edit',
			onClick: ({ event }: { event: CalendarEvent }): void => {
				this.handleEvent(this.CALENDAR_ACTIONS.EDITED, event);
			},
		},
	];
	refresh: Subject<any> = new Subject();

	tourData: any = {
		"tourId": 1801,
		"tourName": "Visit Vancouver",
		"startdate": "2020-09-29T07:00:00.000+0000",
		"enddate": "2020-10-03T06:59:00.000+0000",
		"durationDays": 4,
		"amount": 500,
		"surplus": 0,
		"totalseats": 10,
		"minseats": 5,
		"currency": "usd",
		"itemDetail": [
			{
				"eventMonth": "Thu Oct 01 07:00:00 UTC 2020",
				"events": [
					{
						"eventDate": "Thu Oct 01 07:00:00 UTC 2020",
						"eventData": []
					},
					{
						"eventDate": "Fri Oct 02 07:00:00 UTC 2020",
						"eventData": []
					}
				]
			},
			{
				"eventMonth": "Tue Sep 01 07:00:00 UTC 2020",
				"events": [
					{
						"eventDate": "Tue Sep 29 07:00:00 UTC 2020",
						"eventData": [
							{
								"id": 8628,
								"tourId": 1801,
								"itemId": 11,
								"dayNumber": null,
								"startdate": "2020-09-29T16:00:00.000+0000",
								"enddate": "2020-09-29T17:00:00.000+0000",
								"starttime": null,
								"duration": 60,
								"itemName": "Space Needle",
								"categoryId": 1,
								"subcatgoryId": 1,
								"categoryName": "Workshop",
								"categoryIcon": "event_category_1.png",
								"eventPic": "event_11.jpg",
								"description": "event 1"
							},
							{
								"id": 8629,
								"tourId": 1801,
								"itemId": 12,
								"dayNumber": null,
								"startdate": "2020-09-29T17:00:00.000+0000",
								"enddate": "2020-09-29T18:00:00.000+0000",
								"starttime": null,
								"duration": 60,
								"itemName": "Day Trip to Mount Rainier",
								"categoryId": 3,
								"subcatgoryId": 1,
								"categoryName": "Optional Activity",
								"categoryIcon": "event_category_3.png",
								"eventPic": null,
								"description": "event 2"
							},
							{
								"id": 8630,
								"tourId": 1801,
								"itemId": 12,
								"dayNumber": null,
								"startdate": "2020-09-29T17:00:00.000+0000",
								"enddate": "2020-09-29T18:00:00.000+0000",
								"starttime": null,
								"duration": 60,
								"itemName": "Day Trip to Mount Rainier",
								"categoryId": 3,
								"subcatgoryId": 1,
								"categoryName": "Optional Activity",
								"categoryIcon": "event_category_3.png",
								"eventPic": null,
								"description": "event 3"
							},
							{
								"id": 8631,
								"tourId": 1801,
								"itemId": 6,
								"dayNumber": null,
								"startdate": "2020-09-29T18:00:00.000+0000",
								"enddate": "2020-09-29T19:00:00.000+0000",
								"starttime": null,
								"duration": 60,
								"itemName": "Huskies Tailgate Party",
								"categoryId": 2,
								"subcatgoryId": 1,
								"categoryName": "Activity",
								"categoryIcon": "event_category_2.png",
								"eventPic": "event_6.png",
								"description": "event 4"
							},
							{
								"id": 8632,
								"tourId": 1801,
								"itemId": 6,
								"dayNumber": null,
								"startdate": "2020-09-29T18:00:00.000+0000",
								"enddate": "2020-09-29T19:00:00.000+0000",
								"starttime": null,
								"duration": 60,
								"itemName": "Huskies Tailgate Party",
								"categoryId": 2,
								"subcatgoryId": 1,
								"categoryName": "Activity",
								"categoryIcon": "event_category_2.png",
								"eventPic": "event_6.png",
								"description": "event 5"
							}
						]
					},
					{
						"eventDate": "Wed Sep 30 07:00:00 UTC 2020",
						"eventData": []
					}
				]
			}
		]
  	};

	itineraryList: any[] = [];

	activeDayIsOpen: boolean = true;

	constructor(private modal: NgbModal) {}

	ngOnInit() {
		this.setCalanderData();
	}

	setCalanderData() {
		this.itineraryList = [];
		let events: Array <any> = [];
		this.tourData.itemDetail.map( event => {
			event.events.map(evnt => { 
				events = events.concat(evnt.eventData)
			});
		});
		if(events.length > 0) {
			events.map( (event, index) => {
				this.itineraryList.push(
					{
						start: new Date(event.startdate.split('.')[0]),
						end: new Date(event.enddate.split('.')[0]),
						title: event.itemName,
						color: index %2 === 0 ? colors.LIGHT_BLUE : colors.GREEN,
						actions: this.actions,
						resizable: {
							beforeStart: true,
							afterEnd: true,
						},
						draggable: true,
						description: event.description
					}
				)
			});
		}
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

	eventTimesChanged({ event, newStart, newEnd,}: CalendarEventTimesChangedEvent): void {
		this.itineraryList = this.itineraryList.map((iEvent) => {
			if (iEvent === event) {
				return {
					...event,
					start: newStart,
					end: newEnd,
				};
			}
			return iEvent;
		});
		console.log("after drag or resize: ", this.itineraryList);
	}

	handleEvent(action: string, event: any): void {
		if(action == this.CALENDAR_ACTIONS.CLICKED || action == this.CALENDAR_ACTIONS.EDITED || action === this.CALENDAR_ACTIONS.ADD) {
			this.modalData = { event, action };
			this.modal.open(this.modalContent, { size: 'lg' });
		}
	}

	deleteEvent(eventToDelete: CalendarEvent) {
		this.itineraryList = this.itineraryList.filter((event) => event !== eventToDelete);
		console.log("after delete: ", this.itineraryList);
	}

	closeOpenMonthViewDay() {
		this.activeDayIsOpen = false;
	}

	addItem(slot: any) {
		const event = {
			start: new Date(slot),
			end: new Date(slot),
			title: '',
			color: colors.LIGHT_BLUE,
			actions: this.actions,
			resizable: {
				beforeStart: true,
				afterEnd: true,
			},
			draggable: true,
			description: ''
		}
		this.handleEvent(this.CALENDAR_ACTIONS.ADD, event);
	}

	addEvent(event: any, close: any) {
		this.itineraryList.push(event);
		this.refresh.next();
		console.log("After add event: ", this.itineraryList);
		close();
	}

}
