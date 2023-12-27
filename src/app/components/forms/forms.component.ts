import { GetUnitsService } from './../../services/get-units.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '../../types/location.interface';
import { FilterUnitsService } from '../../services/filter-units.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit {
  public results: Location[] = [];
  public filteredResults: Location[] = [];
  public formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private unitsService: GetUnitsService,
    private filterUnitsService: FilterUnitsService
  ) { }

  public ngOnInit(): void {
    this.unitsService.getAllUnits().subscribe(data => {
      this.results = data;
      this.filteredResults = data;
    });



    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true,
    });
  }

  public onSubmit(): void {
    let { showClosed, hour } = this.formGroup.value
    this.filteredResults = this.filterUnitsService.filter(this.results, showClosed, hour);
    this.unitsService.setFilteredUnits(this.filteredResults);
  }

  public onClean(): void {
    this.formGroup.reset();
  }

}
