import { Injectable } from '@angular/core';
import { Location } from '../types/location.interface';


const OPENING_HOURS = {
  morning: {
    first: '06',
    last: '12'
  },

  afternoon: {
    first: '12',
    last: '18'
  },

  night: {
    first: '18',
    last: '23'
  }
}

type HOUR_INDEXES = 'morning' | 'afternoon' | 'night';

@Injectable({
  providedIn: 'root'
})
export class FilterUnitsService {

  constructor() { }

  // Pegar o numero da semana e retornar um dos textos
  public transformWeeday(weekday: number) {
    switch (weekday) {
      case 0:
        return 'Dom.';

      case 6:
        return 'Sab.';

      default:
        return 'Seg. à Sex.';
    }
  }

  public filterUnits(unit: Location, open_hour: string, close_hour: string) {
    if (!unit.schedules) return true;

    // Transformando em inteniro
    let open_hour_filter = parseInt(open_hour, 10);
    let close_hour_filter = parseInt(close_hour, 10);

    // 'new Date().getDate()' retorna o numero do dia da semana. seg a sab = 1 a 6, e dom = 0
    let today_weekday = this.transformWeeday(new Date().getDate());

    // Loop entre os dias da unidade
    for (let i = 0; i < unit.schedules.length; i++) {
      let schedule_hour = unit.schedules[i].hour;
      let schedule_weekday = unit.schedules[i].weekdays;

      if (today_weekday === schedule_weekday) {
        if (schedule_hour !== 'Fechada') {

          // Pega o texto que fica entre o "às" neste texto = "06h às 23h"
          let [unit_open_hour, unit_close_hour] = schedule_hour.split(' às ');

          // Transformando o resultado em inteiro e tirando o "h" pois não nos importa
          let unit_open_hour_int = parseInt(unit_open_hour.replace('h', ''), 10);
          let unit_close_hour_int = parseInt(unit_close_hour.replace('h', ''), 10);



          /**
           * Se a hora de abertura for menor que a de abertura do filtro
           * E
           * A hora de fechamento for maior que a hora de fechamento do filtro
           * Quer dizer que está dentro do horário e assim retorna True
           */
          if (unit_open_hour_int <= open_hour_filter && unit_close_hour_int >= close_hour_filter) {
            return true;
          } else {
            return false;
          }
        }
      }
    }

    return false;
  }

  public filter(results: Location[], showClosed: boolean, hour: string) {
    let intermediateResults = results;

    if (!showClosed) {
      intermediateResults = results.filter(location => location.opened === true);
    }

    if (hour) {
      // Filtro por periodo do dia (manhã, tarde e noite)
      const OPEN_HOUR = OPENING_HOURS[hour as HOUR_INDEXES].first;
      const CLOSE_HOUR = OPENING_HOURS[hour as HOUR_INDEXES].last;
      return intermediateResults.filter(location => this.filterUnits(location, OPEN_HOUR, CLOSE_HOUR));
    } else {
      return intermediateResults;
    }
  }
}
