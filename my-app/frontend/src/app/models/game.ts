import {Player} from './player';

export class Game {
    id: number;
    title: string;
    players: Player[];
    dealer: string;
    sbPlayer: Player;
    bbPlayer: Player;
    currentTurn: string;
    board: any;
    pot: number;
    activePlayer: Player;
    lastBet: number;
    creator: string;
    mode: string;
    buyIn: number;
    maxPlayer: number;
    cashPrice: number;
    initialStack: number;
    bigBlind: number;
    smallBlind: number;
    deck: any;
}
