import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Filters } from 'src/app/interface/ec-template.interface';

@Component({
  selector: 'app-filters-sidebar',
  templateUrl: './filters-sidebar.component.html',
  styleUrls: ['./filters-sidebar.component.scss']
})
export class FiltersSidebarComponent implements OnInit {
  filtersList: Filters[];

  constructor(public dataService: DataService) {}

  ngOnInit() {
    this.filtersList = ["Brand", "Color", "Size"];
  }
}
