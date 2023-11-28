import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
export interface ApiResponse<T> {
  status: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000';
  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> =
    this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${id}/`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/`, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/user/${id}/`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/user/${id}/`);
  }

  login(email: string, password: string): Observable<any> {
    const formData = { email, password };
    return this.http
      .post<any>(`${this.apiUrl}/user/`, formData)
      .pipe(tap(() => this.isLoggedInSubject.next(true)));
  }

  agendarReserva(reservaData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reserva/`, reservaData);
  }

  getFeriados(): Observable<any> {
    const feriadosUrl = 'https://api.victorsanmartin.com/feriados/en.json';
    return this.http.get<any>(feriadosUrl);
  }

  getHoras(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/reserva/`)
      .pipe(catchError(this.handleError));
  }

  borrarHora(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/reserva/${id}/`)
      .pipe(catchError(this.handleError));
  }

  logout() {
    this.isLoggedInSubject.next(false);
  }

  private handleError(error: any) {
    console.error('Error in the service', error);
    return throwError(error);
  }
}
