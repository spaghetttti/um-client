// types.ts
export interface BuildingDTO {
  id: number;
  code: string;
  yearOfConstruction?: number;
  campusId: number;
  latitude?: number;
  longitude?: number;
}
