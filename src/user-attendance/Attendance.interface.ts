export interface Attendance {
  id: number;
  email: string;
  timestamp: number;
  types: string;

  [key: string]: any;
}
