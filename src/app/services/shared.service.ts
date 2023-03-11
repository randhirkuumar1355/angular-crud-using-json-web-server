import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  public get(url: string, reqInput?: any): Observable<any> {
    const paramInputs = { params: reqInput ? reqInput : undefined };
    return this.http.get<Observable<any>>(url, paramInputs);
  }

  public post(url: string, body: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Observable<any>>(url, body, httpOptions);
  }

  public put(apiURL: string, body: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(apiURL, body, httpOptions);
  }

  public delete(apiURL: string, body:any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete(apiURL + body, httpOptions);
  }
}
