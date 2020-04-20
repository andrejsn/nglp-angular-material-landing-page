import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  /**
   * say 
   * hello to server, get csrf token
   */
  hello() {
    return this.http.get<any>(`${environment.apiUrl}/hello`);
  }

  /**
   * get ip
   */
  ip(){
    this.http.get<any>(`https://api6.ipify.org?format=json`);
  }

  /**
   * up contact to server
   */
  contact() {
    return this.http.post<any>(`${environment.apiUrl}/contact`,
      {

      }
    );
  }

}