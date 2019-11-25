import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy, ViewContainerRef, ComponentRef, destroyPlatform } from '@angular/core';

import { AdDirective } from './ad.directive';
import { AdItem }      from './ad-item';
import { AdComponent } from './ad.component';

@Component({
  selector: 'app-ad-banner',
  template: `
              <div class="ad-banner-example">
                <h3>Advertisements</h3>
                <ng-template ad-host></ng-template>

                <button (click)="getAds()">Add dynamic item</button> <button (click)="printDynamicValues()">Print Dynamic Values</button><button (click)="destroy()">Destroy 1st item</button>
              </div>
            `
})
export class AdBannerComponent implements OnInit, OnDestroy {
  @Input() ads: AdItem[];
  currentAdIndex = -1;
  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;
  interval: any;

  items:ComponentRef<any>[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
    //this.getAds();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const adItem = this.ads[this.currentAdIndex];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    const viewContainerRef = this.adHost.viewContainerRef;
    //viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
  
    (<AdComponent>componentRef.instance).data = adItem.data;

    //debug
    this.items.push(componentRef);
  }

  getAds() {
    // this.interval = setInterval(() => {
    //   this.loadComponent();
    // }, 3000);
    this.loadComponent();

  }

  printDynamicValues(){

    this.items.forEach( (element) => {
      console.log(element.instance.data.id);

      if (element.componentType.name == 'HeroJobAdComponent'){

        console.log(element.instance.data.inputVal);
      }
      
    });
  }


  destroy(){
    this.items[0].destroy();
    this.items.splice(0,1);
  };


    
  
}
