import {Inject, Injectable, InjectionToken, OnDestroy} from '@angular/core';
import {interval, Observable, Observer, Subject, SubscriptionLike} from 'rxjs';
import {distinctUntilChanged, filter, map, share, takeWhile} from 'rxjs/operators';
import { IWebsocketService, IWsMessage, WebSocketConfig } from '../_models/socket';
import { WebSocketSubjectConfig, WebSocketSubject } from 'rxjs/webSocket';

// import {IWebsocketService, IWsMessage, WebSocketConfig} from './websocket.interfaces';
// import {config} from './websocket.config';




export const config: InjectionToken<string> = new InjectionToken('websocket');


@Injectable({
  providedIn: 'root'
})
export class ApiService implements IWebsocketService, OnDestroy {

  private config: WebSocketSubjectConfig<IWsMessage<any>>;

  private websocketSub: SubscriptionLike;
  private statusSub: SubscriptionLike;

  private reconnection$: Observable<number>;
  private websocket$: WebSocketSubject<IWsMessage<any>>;
  private connection$: Observer<boolean>;
  private wsMessages$: Subject<IWsMessage<any>>;

  private reconnectInterval: number;
  private reconnectAttempts: number;
  private isConnected: boolean;


  public status: Observable<boolean>;

  constructor(@Inject(config) private wsConfig: WebSocketConfig) {
    this.wsMessages$ = new Subject<IWsMessage<any>>();
    this.websocket$= new WebSocketSubject<IWsMessage<any>>('12')
    this.reconnectInterval = wsConfig.reconnectInterval || 5000; // pause between connections
    this.reconnectAttempts = wsConfig.reconnectAttempts || 10; // number of connection attempts

    this.config = {
      url: wsConfig.url,
      closeObserver: {
        next: (event: CloseEvent) => {
          this.websocket$ = null;
          this.connection$.next(false);
        }
      },
      openObserver: {
        next: (event: Event) => {
          console.log('WebSocket connected!');
          this.connection$.next(true);
        }
      }
    };

    // connection status
    this.status = new Observable<boolean>((observer) => {
      this.connection$ = observer;
    }).pipe(share(), distinctUntilChanged());

    // run reconnect if not connection
    this.statusSub = this.status
      .subscribe((isConnected) => {
        this.isConnected = isConnected;
        if (!this.reconnection$ && typeof (isConnected) === 'boolean' && !isConnected) {
          this.reconnect();
        }
      });

    this.websocketSub = this.wsMessages$.subscribe(
      null, (error: ErrorEvent) => console.error('WebSocket error!', error)
    );

    this.connect();
  }

  ngOnDestroy() {
    this.websocketSub.unsubscribe();
    this.statusSub.unsubscribe();
  }


  /*
  * connect to WebSocked
  * */
  private connect(): void {
    this.websocket$ = new WebSocketSubject(this.config);

    this.websocket$.subscribe(
      (message) => {this.wsMessages$.next(message)
           
      },
      (error: Event) => {
        if (!this.websocket$) {
          // run reconnect if errors
          this.reconnect();
        }
      });
  }


  /*
  * reconnect if not connecting or errors
  * */
  private reconnect(): void {
    this.reconnection$ = interval(this.reconnectInterval)
      .pipe(takeWhile((v, index) => index < this.reconnectAttempts && !this.websocket$));

    this.reconnection$.subscribe(
      () => this.connect(),
      null,
      () => {
        // Subject complete if reconnect attemts ending
        this.reconnection$ = null;

        if (!this.websocket$) {
          this.wsMessages$.complete();
          this.connection$.complete();
        }
      });
  }
  /*
  * on message event
  * */
  public on<T>(method: string): Observable<T> { 
    if (method) {
      // @ts-ignore
      return this.wsMessages$.pipe(
        filter((message: IWsMessage<T>) => message.method === method
        ),
        map((message: IWsMessage<T>) => message)
      );
    }
  }
  /*
  * on message to server
  * */
 public send(data: any = {}): void {
  if (this.isConnected) {
    this.websocket$.next(data);
  } else {
    console.error('Send error!');
  }
  
}

}
