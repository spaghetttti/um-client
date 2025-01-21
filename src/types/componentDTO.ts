export interface ComponentDTO {
  id: number;
  acronym: string;
  name: string;
  responsiblePerson: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exploitedBuildings: any[];
}
