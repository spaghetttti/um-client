export interface RoomDTO {
  id: number;
  roomNumber: string;
  capacity: number;
  type: string;
  accessible: boolean;
  floor: number;
  buildingId: number;
}
