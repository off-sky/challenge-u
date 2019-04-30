import { Component, OnInit } from '@angular/core';
import { clgu } from '../../../../types';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'y-details-root',
  templateUrl: './details-root.component.html',
  styleUrls: ['./details-root.component.scss']
})
export class DetailsRootComponent implements OnInit {

  public challenge: clgu.challenges.Challenge;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.challenge = this.route.snapshot.data.challenge;
  }


}
