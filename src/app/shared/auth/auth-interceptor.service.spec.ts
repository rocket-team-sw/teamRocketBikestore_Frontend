import { AuthInterceptor } from './auth-interceptor';

import { TestBed } from '@angular/core/testing';



describe('AuthInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthInterceptor = TestBed.get(AuthInterceptor);
    expect(service).toBeTruthy();
  });
});
