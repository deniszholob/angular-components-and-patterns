import { AppErrorsModule } from './app-errors.module';

describe('AppErrorsModule', () => {
  const module: AppErrorsModule = new AppErrorsModule();

  it('should create', () => {
    expect(module).toBeTruthy();
  });
});
