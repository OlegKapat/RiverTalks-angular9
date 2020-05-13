import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WebSocketConfig} from '../_models/socket'
import {ApiService, config} from './api.service';




@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    ApiService
  ]

})
export class ApiModule {
  public static config(wsConfig: WebSocketConfig): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [{provide: config, useValue: wsConfig}]
    };
  }
}
