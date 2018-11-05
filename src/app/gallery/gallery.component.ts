import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  public allJoints;
  public wholeSingleVenueInfo;
  public jointsIdArray:any = [];
  public allVenuePhotosUrls:any = [];

  constructor(private _data: DataService) { }

  ngOnInit() {
    this.fetchJoints();
  }

  fetchJoints():void {

    this._data.getAllJoints()
      .subscribe((data) => {
        this.allJoints = data;
        this.allJoints = this.allJoints.response.venues;

        // 'jointsIdArray' is an array of all venues' IDs ( ['id1', 'id2', ... , 'idn'] )
        for (let joint of this.allJoints){
          this.jointsIdArray.push(joint.id);
        }

        for (let eachVenue of this.jointsIdArray){
          this._data.getPhoto(eachVenue)
            .subscribe((data)=>{
              this.wholeSingleVenueInfo = data;

                // Only response portion of the 'wholeSingleVenueInfo'
                let responseVenue = this.wholeSingleVenueInfo.response.venue;

                /* 1) Checking if a venue has 'bestPhoto' property
                   2) If it does - add the full-url of this venue to the array
                 */
                if (responseVenue.bestPhoto) {

                  /* Getting all the parts of the photo future url*/
                  let latestPhotoParts = {
                    prefix: responseVenue.bestPhoto.prefix,
                    suffix: responseVenue.bestPhoto.suffix,
                    width: responseVenue.bestPhoto.width,
                    height: responseVenue.bestPhoto.height
                  };

                  // desctructuring an object
                  let {prefix, suffix, width, height} = latestPhotoParts;

                  // Pushing whole address in format 'http://[prefix]/[width]x[height]/[suffix]'
                  this.allVenuePhotosUrls.push(`${prefix}${width}x${height}${suffix}`);

                  // If !bestPhoto get the photo from 'photos' property of the response ( IFF the photots array is !empty)
                } else if (responseVenue.photos.groups[0].items.length != 0) {

                    let imageParts = responseVenue.photos.groups[1].items;

                    // Itirating through all photos in the given array
                    for (let eachImg of imageParts) {
                      let urlComposition = `${eachImg.prefix}${eachImg.width}x${eachImg.height}${eachImg.suffix}`;

                      // Pushing whole address in format 'http://[prefix]/[width]x[height]/[suffix]'
                      this.allVenuePhotosUrls.push(urlComposition)
                    }
                }
            })
        }
      })
  }
}
