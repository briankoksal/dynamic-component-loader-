import { Component, Input } from '@angular/core';

import { AdComponent }      from './ad.component';

@Component({
  template: `
    <div class="job-ad">
      <h4>{{data.headline}}</h4>
      {{data.body}}
      <input #box (keyup)="onKey(box.value)">
    </div>
  `
})
export class HeroJobAdComponent implements AdComponent {
  @Input() data: any;

  ngOnInit() {
    console.log('HeroJobAdComponent init');
  }

  onKey(value: string) {
    this.data.inputVal = value;
  }

}

