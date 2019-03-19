export interface RoomParams {
  userId: string;
  sig: string;
  roomId: string;
}

export interface RoomProps {

}

class Room implements RoomProps {
  private roomParams;

  constructor(params) {
    this.roomParams = params;
  }
}

export { Room };
