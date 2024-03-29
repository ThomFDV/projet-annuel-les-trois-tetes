export class User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    type: string;
    statistics: Statistics;
}

class Statistics {
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  coursesRead: number;
}
