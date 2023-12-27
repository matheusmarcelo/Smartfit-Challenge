import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnitResponse } from '../types/unit-response.interface';

@Injectable({
  providedIn: 'root'
})
export class GetUnitsService {
  readonly url: string = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json";

  constructor(private http: HttpClient) { }

  public getAllUnits(): Observable<UnitResponse> {
    return this.http.get<UnitResponse>(this.url);
  }
}
