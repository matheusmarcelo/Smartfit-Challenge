import { Location } from "./location.interface";

// Interface com a resposta da API
export interface UnitResponse {
    current_country_id: number;
    locations: Location[];
}