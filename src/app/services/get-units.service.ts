import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnitResponse } from '../types/unit-response.interface';
import { Location } from '../types/location.interface';

@Injectable({
  providedIn: 'root'
})
export class GetUnitsService {
  readonly url: string = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json";

  // BehaviorSubject é uma propriedade que poder ser mutavel
  private allUnitsSubject: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);

  // O allUnits$ virou um observavel de allUnitsSubject, todos componentes que estiverem observando esta propriedade também será mudado
  private allUnits$: Observable<Location[]> = this.allUnitsSubject.asObservable();
  private filteredUnits: Location[] = [];

  constructor(private http: HttpClient) {
    this.http.get<UnitResponse>(this.url).subscribe(data => {
      // Proximo valor do Subject será o "data.locations"
      this.allUnitsSubject.next(data.locations);
      this.filteredUnits = data.locations;
    });
  }

  public getAllUnits(): Observable<Location[]> {
    return this.allUnits$;
  }

  public getFilteredUnits() {
    return this.filteredUnits;
  }

  public setFilteredUnits(value: Location[]) {
    this.filteredUnits = value;
  }
}
