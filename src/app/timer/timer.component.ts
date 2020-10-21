import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, buffer, debounce, debounceTime, filter, tap } from 'rxjs/operators';
import { GenerateDataService } from "../shared/generate-data.service";
import { ITimer } from "../shared/time";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  public timer = { hh: "00", mm: "00", ss: "00" };
  private intervalObj: number;
  @ViewChild('timerElement')
  public timerDomElement: ElementRef<HTMLDivElement>;

  constructor(private dataService: GenerateDataService) { }

  public ngAfterViewInit(): void {
    const click$: Observable<Event> = fromEvent(this.timerDomElement.nativeElement, 'click');
    const doubleclick$: Observable<Array<Event>> = click$.pipe(
      buffer(click$.pipe(debounceTime(150))),
      filter((list: Array<Event>) => list.length === 2)
    )

    doubleclick$.subscribe(() => {
      this.onPause();
    })
  }

  public onStart() {
    if (!this.intervalObj) {
      this.intervalObj = window.setInterval(() => {
        let timerobj: ITimer = this.dataService.createTimer();
        this.timer.hh = timerobj.hh.toString().length > 1 ? `${timerobj.hh}` : `0${timerobj.hh}`;
        this.timer.mm = timerobj.mm.toString().length > 1 ? `${timerobj.mm}` : `0${timerobj.mm}`;
        this.timer.ss = timerobj.ss.toString().length > 1 ? `${timerobj.ss}` : `0${timerobj.ss}`;
      }, 1000)
    }
  }
  public onStop() {
    window.clearInterval(this.intervalObj);
    this.intervalObj = undefined;
    this.timer = { hh: "00", mm: "00", ss: "00" };
    this.dataService.clearTimer();
  }
  public onReset() {
    if (this.intervalObj) {
      this.onStop();
      this.onStart();
    }
  }
  private onPause() {
    if (this.intervalObj) {
      window.clearInterval(this.intervalObj);
      this.intervalObj = undefined;
    }
    else {
      this.onStart();
    }
  }
}
