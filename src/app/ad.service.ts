import { Injectable }           from '@angular/core';

import { HeroJobAdComponent }   from './hero-job-ad.component';
import { HeroProfileComponent } from './hero-profile.component';
import { AdItem }               from './ad-item';

@Injectable()
export class AdService {
  getAds() {
    return [
      new AdItem(HeroProfileComponent, {id: 1, name: 'Bombasto', bio: 'Brave as they come'}),

      new AdItem(HeroProfileComponent, {id: 2, name: 'Dr IQ', bio: 'Smart as they come'}),

      new AdItem(HeroJobAdComponent,   {id:3 ,headline: 'Hiring for several positions',
                                        body: 'Submit your resume today!'}),

      new AdItem(HeroJobAdComponent,   {id:4, headline: 'Openings in all departments',
                                        body: 'Apply today'}),
    ];
  }
}
