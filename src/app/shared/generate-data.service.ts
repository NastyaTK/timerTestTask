import { Injectable } from '@angular/core';
import { ITimer } from "./time";

@Injectable({
  providedIn: 'root'
})
export class GenerateDataService {

  public hh: number = 0;
  public mm: number = 0;
  public ss: number = 0;


  constructor() { }

  public createTimer(): ITimer {
    if (this.ss + 1 >= 60) {
      if (this.mm + 1 >= 60) {
        this.hh++;
        this.mm = -1;
      }
      this.mm++
      this.ss = -1;
    }
    this.ss++;
    return { hh: this.hh, mm: this.mm, ss: this.ss };
  }

  public clearTimer(): void {
    this.hh = 0;
    this.mm = 0;
    this.ss = 0;
  }
}
