import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Location } from './types/location.interface';
import { GetUnitsService } from './services/get-units.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public showList = new BehaviorSubject(false);
  public unitsList: Location[] = [];

  constructor(private unitService: GetUnitsService) { }

  onSubmit(): void {
    this.unitsList = this.unitService.getFilteredUnits();
    this.showList.next(true);
  }
}
