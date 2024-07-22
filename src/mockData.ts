export interface Attendance {
  id: number;
  email: string;
  timestamp: number;
  types: string;
}

export const attendances: Attendance[] = [
  {
    id: 1,
    email: 'budjiangelo@gmail.com',
    timestamp: Math.floor(Date.now() / 1000), // current Unix timestamp
    types: 'In',
  },
  {
    id: 2,
    email: 'theblokc@gmail.com',
    timestamp: Math.floor(Date.now() / 1000), // current Unix timestamp
    types: 'In',
  },
  {
    id: 3,
    email: 'angelobudji.solano2@cvsu.edu.ph',
    timestamp: Math.floor(Date.now() / 1000), // current Unix timestamp
    types: 'In',
  },
];
