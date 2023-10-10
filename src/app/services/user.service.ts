import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AllUserInfo, CreateUserPayload, UpdateUserPayload, User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  // CREATE
  createUser(user: CreateUserPayload): Observable<User> {
    return this.http.post<User>(this.apiUrl, user)
  }
  
 
  // READ
  getUsers(pageIndex: number, pageSize: number): Observable<AllUserInfo> {
    const start = pageIndex * pageSize;
    const limit = pageSize;
    const apiUrlWithPagination = `${this.apiUrl}?_start=${start}&_limit=${limit}`;
    return this.http.get<{data: User[], total: number}>(apiUrlWithPagination);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  // UPDATE
  updateUser(userId: string, user: UpdateUserPayload): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, user);
  }

  // DELETE
  deleteUser(userId: number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${userId}`);
  }
}
