import {WebSocketSubject, WebSocketSubjectConfig} from 'rxjs/webSocket';
import { Observable } from 'rxjs';

export interface IWebsocketService {
    on<T>(method: string): Observable<T>;
  
    send(method: string, data: any): void;
  
    status: Observable<boolean>;
  }
  
  export interface WebSocketConfig {
    url: string;
    reconnectInterval?: number;
    reconnectAttempts?: number;
  }
  
  export interface IWsMessage<T> {
    method: string;
    data: T;
  }
  