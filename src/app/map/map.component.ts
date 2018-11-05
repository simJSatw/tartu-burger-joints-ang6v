import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public allJointsInfo;
  public nameAndLocationsArray = [];
  public sortedNandLocAr = [];

  public tartuCenter = {
    lat: 58.378025,
    lng: 26.728493,
    zoom: 13
  };

  // center point for 'NO-BURGER' zone
  public noBurgerRadius = {
    lat: 58.3781492,
    lng: 26.7310792,
    color: '#3F9D85',
    radius: 1000
  };

  constructor(private _data: DataService) { }

  ngOnInit() {
    this.getAllVenues()
  }

  clickedMarker() {
    // function for handling clicked marker info
  }

  getAllVenues():void {

    this._data.getAllJoints()
      .subscribe((data) => {

        // full info on each burger venue
        this.allJointsInfo = data;

        // needed portion of the venues' info
        this.allJointsInfo = this.allJointsInfo.response.venues;

        // iterating through each venue and getting 'name', 'lat', 'lng' and 'distance' for sorting
        for (let eachJoint of this.allJointsInfo) {
          let venueBasicInfo = {
            name: eachJoint.name,
            lat: eachJoint.location.lat,
            lng: eachJoint.location.lng,
            distance: eachJoint.location.distance
          };

          // pushing all venues' object to the array
          this.nameAndLocationsArray.push(venueBasicInfo)
        }
        // sorting the array above by excluding venues with 'distance' property less than 1 kilometer
        this.sortedNandLocAr = this.nameAndLocationsArray.filter( venue => venue.distance >= 1000);

      })
  }
}
