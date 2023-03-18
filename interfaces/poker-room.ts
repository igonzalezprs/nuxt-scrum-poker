export interface User {
  id: string;
  name: string;
  storyPoints: number | null;
}

export interface Room {
  id: string;
  name: string;
  users: User[];
  showEstimates: boolean;
}