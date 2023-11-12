import { Component, Input, OnInit } from '@angular/core';
import { Bike } from 'src/app/models/bike';

@Component({
  selector: 'bike-card',
  templateUrl: './bike-card.component.html',
  styleUrls: ['./bike-card.component.scss']
})
export class BikeCardComponent implements OnInit {
  @Input() bike: Bike | undefined;

  constructor(){}

  ngOnInit(): void {
  }
}
