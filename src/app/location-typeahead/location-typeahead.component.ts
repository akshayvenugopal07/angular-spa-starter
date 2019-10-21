import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';
import { GlobalService } from '../services/global.service';

@Component({
	selector: 'app-location-typeahead',
	templateUrl: './location-typeahead.component.html',
	styleUrls: ['./location-typeahead.component.scss']
})

export class LocationTypeaheadComponent implements OnInit {

	resultsPresent = false;
	noRecords = false;
	searchText = '';
	selectedLocation = '';
	savedList = [];
	locationList = [];

	constructor(
		private dataService: DataService,
		public globalService: GlobalService) { }

	ngOnInit() {
		this.getSavedLoacations();
	}

	getSavedLoacations() {
		const params = {
			id: 1
		};

		this.dataService.getSavedLocations(params).subscribe(
			response => {
				this.savedList = response.data.data.locations;
				this.conditionSavedData(this.savedList);
			},
			error => {
				console.log('error', error);
			}
		);
	}

	searchForLocations() {
		if (this.searchText.length > 2) {
			this.resultsPresent = true;
			this.searchForLocationsAPI(this.searchText);
		}
	}

	searchForLocationsAPI(searchText: string) {
		const params = {
			location: searchText
		};

		this.dataService.getLocationList(params).subscribe(
			response => {
				if (response.predictions) {
					this.locationList = response.predictions;
					this.conditionLocationData(this.locationList);
				} else {
					this.noRecords = true;
				}
			},
			error => {
				console.log('error', error);
			}
		);
	}

	selectItem(location) {
		this.resultsPresent = false;
		this.searchText = location.name;
		this.selectedLocation = location;
	}

	conditionSavedData(locations) {
		const savedConditioned = locations.map(location => {
			return {
				latitude: location.latitude,
				location_name: location.location_name,
				longitude: location.longitude,
				name: location.location_name
			};
		});
		this.savedList = savedConditioned;
	}

	conditionLocationData(locations) {
		const locationsConditioned = locations.map(location => {
			return {
				reference: location.reference,
				location_name: location.structured_formatting.main_text,
				placeId: location.place_id,
				name: location.structured_formatting.main_text
			};
		});
		this.locationList = locationsConditioned;
	}

}
