import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // User ID and Secret for 'Foursquare' API usage
  public _clientId: string = `SURVIDS5OWV4KPELO1N0G2DWTCXLNZ0XWAKNAL4F0W2IVL1H`;
  public _clientSec: string = `CM4M01RKH0X1H1JK2VXA20FDNYT5QWNDZ0Y4HQOJIJZBKLYQ`;

  // Foursquare query params
  public _searchCenter: string = `58.378025,26.728493`;                                 // Tartu city
  public _radius: string = `5000`;                                                      // Included distance of 5km from the center
  public _categoryID: string = `4bf58dd8d48988d16c941735`;                              // Burger Joints category
  public _todaysVersion: string = new Date().toJSON().slice(0, 10).replace(/-/g, '');   // Gets today data in the needed format

  constructor(private _http: HttpClient) { }

  getAllJoints() {
    return this._http.get(`https://api.foursquare.com/v2/venues/search?intent=browse&ll=${this._searchCenter}&radius=${this._radius}&categoryId=${this._categoryID}&client_id=${this._clientId}&client_secret=${this._clientSec}&v=${this._todaysVersion}`);
  }

  getPhoto(_id) {
    return this._http.get(`https://api.foursquare.com/v2/venues/${_id}?client_id=${this._clientId}&client_secret=${this._clientSec}&v=${this._todaysVersion}`);
  }

}
