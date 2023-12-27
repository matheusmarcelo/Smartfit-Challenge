import { GetUnitsService } from './../../services/get-units.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit {
  public results = [];
  public formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private unitsService: GetUnitsService) { }

  public ngOnInit(): void {
    this.unitsService.getAllUnits().subscribe(data => console.log(data));
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: false
    });
  }

  public onSubmit(): void {
    console.log(this.formGroup.value);
  }

  public onClean(): void {
    this.formGroup.reset();
  }

}
