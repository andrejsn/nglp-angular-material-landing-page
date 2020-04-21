import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Contact } from './contact/contact';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  /**
   * say 
   * hello to server, get csrf token
   */
  hello(ip: string) {
    return this.http.get<any>(`${environment.apiUrl}/hello/` + ip);
  }

  /**
   * get ip
   */
  ip(){
    return this.http.get<any>(`https://api6.ipify.org?format=json`);
  }

  /**
   * up contact to server
   */
  contact(contact: Contact) {
    return this.http.post<any>(`${environment.apiUrl}/contact`,
      {
        contact
      }
    );
  }

}