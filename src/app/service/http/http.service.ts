import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { StorageService } from '../storage/storage.service'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(
    private http: HttpClient,
    private storage: StorageService) {
  }

  apiUrl: string = environment.baseUrl;
  pdfDocUrl: string = environment.pdfDocUrl;

  headers(noContentType?: boolean) {
    let headers = {};
    if (this.storage.hasToken()) {
      headers = {
        "Authorization": `Bearer ${this.storage.token()}`
      }
    }

    if (noContentType) {
      return new HttpHeaders(headers);
    } else {
      return new HttpHeaders({
        "Content-Type": "application/json",
        ...headers
      });
    }

  }

  /**
   * for using get method.
   * @param url : url where request will be sent
   * @param params
   */
  get(url: string, params?: object) {
    const apiUrl = `${this.apiUrl}${url}${this.generateQueryString(params)}`;
    return this.http.get(apiUrl, {
      headers: this.headers()
    });
  }

  /**
   * for using put method
   * @param url : url where request will be send
   * @param data : body part of post data
   * @param params : Query params
   */
  put(url: string, data?: any, params?: object) {
    const apiUrl = `${this.apiUrl}${url}${this.generateQueryString(params)}`;
    return this.http.put(apiUrl, data, {
      headers: this.headers()
    });
  }

  /**
   * for using put method
   * @param url : url where request will be send
   * @param data : body part of post data
   * @param params : Query params
   */
  post(url: string, data?: any, params?: object) {
    const apiUrl = `${this.apiUrl}${url}${this.generateQueryString(params)}`;
    return this.http.post(apiUrl, data, {
      headers: this.headers()
    });
  }

  /**
   * delete method does not have any body part
   * passes object id as parameter
   * also passes token in header part
   * @param url : url where request will be send
   */
  delete(url: string) {
    const apiUrl = `${this.apiUrl}${url}`;
    return this.http.delete(apiUrl, {
      headers: this.headers()
    });
  }

  /**
   * for using get method.
   * @param url : url
   * @param params
   */
  secureGet(url: string, params?: object) {
    const apiUrl = `${this.apiUrl}${url}${this.generateQueryString(params)}`;
    return this.http.get(apiUrl, {
      headers: this.headers()
    });
  }

  /**
   * for using put method
   * @param url : url where request will be send
   * @param data : body part of post data
   * @param params : Query params
   */
  securePut(url: string, data?: any, params?: object) {
    const apiUrl = `${this.apiUrl}${url}${this.generateQueryString(params)}`;
    return this.http.put(apiUrl, data, {
      headers: this.headers()
    });
  }

  /**
 * for using patch method
 * @param url : url where request will be send
 * @param data : body part of post data
 * @param params : Query params
 */
  securePatch(url: string, data?: any, params?: object) {
    const apiUrl = `${this.apiUrl}${url}${this.generateQueryString(params)}`;
    return this.http.patch(apiUrl, data, {
      headers: this.headers()
    });
  }

  /**
   * for using put method
   * @param url : url where request will be send
   * @param data : body part of post data
   * @param params : Query params
   */
  securePost(url: string, data?: any, params?: object) {
    const apiUrl = `${this.apiUrl}${url}${this.generateQueryString(params)}`;
    return this.http.post(apiUrl, data, {
      headers: this.headers()
    });
  }

  /**
  * for using put method
  * @param url : url where request will be send
  * @param data : body part of post data
  * @param params : Query params
  */
  secureFilePost(url: string, data?: any, params?: object) {
    const apiUrl = `${this.apiUrl}${url}${this.generateQueryString(params)}`;
    return this.http.post(apiUrl, data, {
      headers: this.headers(true)
    });
  }

  /**
  * for using put method
  * @param url : url where request will be send
  * @param data : body part of post data
  * @param params : Query params
  */
  secureFilePut(url: string, data?: any, params?: object) {
    const apiUrl = `${this.apiUrl}${url}${this.generateQueryString(params)}`;
    return this.http.put(apiUrl, data, {
      headers: this.headers(true)
    });
  }

  /**
   * delete method does not have any body part
   * passes object id as parameter
   * also passes token in header part
   * @param url : url where request will be send
   */
  secureDelete(url: string) {
    const apiUrl = `${this.apiUrl}${url}`;
    return this.http.delete(apiUrl, {
      headers: this.headers()
    });
  }

  /**
   * Helper Method that will generate the queryString.
   * @param params Object to be converted into URLSearchParam.
   */
  generateQueryString(params?: any): string {
    let queryString = '',
      httpParam = new URLSearchParams();
    Object.keys(params || {}).forEach(key => httpParam.set(key, params[key]));
    queryString = httpParam.toString() ? `?${httpParam.toString()}` : '';
    return queryString;
  }

  /**
   * Helper method to call the GET api for any url.
   * @param url string url that needs to be called.
   */
  simpleGet(url: string) {
    const apiUrl = `${this.apiUrl}${url}`;
    return this.http.get(apiUrl);
  }

  /**
   * Helper method to call the POST api for any url.
   * @param url string url that needs to be called.
   */
  simplePost(url: string, body: any) {
    const apiUrl = `${this.apiUrl}${url}`;
    return this.http.post(apiUrl, body);
  }

  /**
   * Helper method to call the PUT api for any url.
   * @param url string url that needs to be called.
   */
  simplePut(url: string, body: any) {
    const apiUrl = `${this.apiUrl}${url}`;
    return this.http.put(apiUrl, body);
  }

  /**
  * File upload to file server
  * for using post method
  * @param url : url where request will be send
  * @param data : body part of post data
  * @param params : Query params
  */
  filePost(url: string, data?: any, params?: object) {
    const apiUrl = `${this.pdfDocUrl}${url}${this.generateQueryString(params)}`;
    return this.http.post(apiUrl, data);
  }

  fileGet(url: string, data?: any, params?: object) {
    const apiUrl = `${this.pdfDocUrl}${url}${this.generateQueryString(params)}`;
    return this.http.get(apiUrl, data);
  }

  fileDelete(url: string) {
    const apiUrl = `${this.pdfDocUrl}${url}`;
    return this.http.delete(apiUrl);
  }

  getVerifyToken(url: string, params?: object, token?: string) {
    const apiUrl = `${this.apiUrl}${url}${this.generateQueryString(params)}`;
    return this.http.get(apiUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  }

  getInvitationAcceptPost(url: string, data?: any, params?: object, token?: string) {
    const apiUrl = `${this.apiUrl}${url}${this.generateQueryString(params)}`;
    return this.http.post(apiUrl, data, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  }
}
