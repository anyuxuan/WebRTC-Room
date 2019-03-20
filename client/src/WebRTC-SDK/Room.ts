export interface RoomParams {
  userId: string;
  sig: string;
  roomId: string;
}

export interface RoomProps {
  connect(): void;
  disconnect(): void;
}

class Room implements RoomProps {
  private roomParams;

  constructor(params) {
    this.roomParams = params;
  }

  connect(): void {

  }

  disconnect(): void {

  }
}

export { Room };
