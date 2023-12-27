import { GetUnitsService } from './../../services/get-units.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '../../types/location.interface';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit {
  public results: Location[] = [];
  public filteredResults: Location[] = [];
  public formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private unitsService: GetUnitsService) { }

  public ngOnInit(): void {
    this.unitsService.getAllUnits().subscribe(data => {
      this.results = data.locations;
      this.filteredResults = data.locations;
    });



    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true,
    });
  }

  public onSubmit(): void {
    if (!this.formGroup.value.showClosed) {
      this.filteredResults = this.results.filter(location => location.opened === true);
    } else {
      this.filteredResults = this.results;
    }
  }

  public onClean(): void {
    this.formGroup.reset();
  }

}
