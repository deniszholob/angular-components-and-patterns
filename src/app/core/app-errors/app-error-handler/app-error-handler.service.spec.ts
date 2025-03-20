import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/components';

import { AppErrorHandlerService } from './app-error-handler.service';

describe('AppErrorHandlerService', () => {
  const MOCK_ngZone: NgZone = new NgZone({});
  const MOCK_ToastService: Partial<ToastService> = {
    showToast(): Observable<void> {
      return new Observable<void>();
    },
  };
  const service: AppErrorHandlerService = new AppErrorHandlerService(
    MOCK_ngZone,
    MOCK_ToastService as ToastService,
  );

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
