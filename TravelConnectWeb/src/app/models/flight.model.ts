import { Transport} from  './transport.model';

export class Flight {
    origin!: string;
    destination!: string;
    transport!: Transport;
    price!: number;

}