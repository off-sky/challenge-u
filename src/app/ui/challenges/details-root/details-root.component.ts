import { Component, OnInit } from '@angular/core';
import { clgu } from '../../../../types';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { EditRequirementsComponent } from '../edit-requirements/edit-requirements.component';
import { ChallengesActions } from 'src/app/state/challenges/_challenges.actions';

@Component({
  selector: 'y-details-root',
  templateUrl: './details-root.component.html',
  styleUrls: ['./details-root.component.scss']
})
export class DetailsRootComponent implements OnInit {

  public challenge: clgu.challenges.Challenge;
  public isMine: boolean;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private matDialogue: MatDialog
  ) { }

  ngOnInit() {
    this.challenge = this.route.snapshot.data.challenge;
    this.store.select(state => state.auth.authCheck.user)
      .pipe(
        filter(u => !!u),
        map(u => u.id)
      )
      .subscribe(userId => {
        this.isMine = userId === this.challenge.ownerId;
      });

    this.store.select(state => state.challenges.details[this.challenge.id])
       .pipe(
         filter(d => !!d),
         map(d => d.item)
       )
      .subscribe(chall => this.challenge = chall);
  }


  public openRequirements(): void {
      const ref = this.matDialogue.open(EditRequirementsComponent, { data: this.challenge.participants[0].activities });
      ref.afterClosed()
        .subscribe((res: clgu.challenges.AddRequirementsRequest)=> {
          if (!res) {
            return;
          }
          res.challengeId = this.challenge.id;
          res.userId = this.challenge.ownerId;
          this.store.dispatch(new ChallengesActions.AddRequirements(res));
        });
  }


}
