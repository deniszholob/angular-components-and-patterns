import { AppErrorHandlerModule } from './app-error-handler.module';

describe('AppErrorHandlerModule', () => {
  const module: AppErrorHandlerModule = new AppErrorHandlerModule();

  it('should create', () => {
    expect(module).toBeTruthy();
  });
});
