import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../auths/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', []); // Crear espía para la propiedad isLogged

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard); // Inyectar el guard
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if user is logged in', () => {
    Object.defineProperty(authService, 'isLogged', { get: () => true }); // Simular que el usuario está autenticado

    const route = {} as ActivatedRouteSnapshot; // Simular route
    const state = {} as RouterStateSnapshot; // Simular state

    expect(guard.canActivate(route, state)).toBeTrue(); // Pasar los parámetros simulados
  });

  it('should navigate to login if user is not logged in', () => {
    const navigateSpy = spyOn(router, 'navigate');
    Object.defineProperty(authService, 'isLogged', { get: () => false }); // Simular que el usuario NO está autenticado

    const route = {} as ActivatedRouteSnapshot; // Simular route
    const state = {} as RouterStateSnapshot; // Simular state

    expect(guard.canActivate(route, state)).toBeFalse(); // Pasar los parámetros simulados
    expect(navigateSpy).toHaveBeenCalledWith(['login']);
  });
});
