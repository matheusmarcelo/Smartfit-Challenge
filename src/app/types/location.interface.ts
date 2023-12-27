// Interface para pegar os atributos de cada unidade smartfit
export interface Location {
    id: number;
    title: string;
    content: string;
    opened: boolean;
    mask: string;
    towel: string;
    fountain: string;
    locker_room: string;
    schedules: Schedule[];
}

// Dias e horairos da semana
interface Schedule {
    weekdays: string;
    hour: string;
}