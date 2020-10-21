import { Component, OnInit } from '@angular/core';
import { GenerateDataService } from "../shared/generate-data.service";
import { ITimer } from "../shared/time";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  public timer = { hh: "00", mm: "00", ss: "00" };
  private intervalObj: number;
  constructor(private dataService: GenerateDataService) { }

  ngOnInit(): void {
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
  public onPause() {
    if (this.intervalObj) {
      window.clearInterval(this.intervalObj);
      this.intervalObj = undefined;
    }
    else {
      this.onStart();
    }
  }
}
