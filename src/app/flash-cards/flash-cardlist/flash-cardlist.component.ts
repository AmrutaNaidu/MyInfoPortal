import { Component, OnInit } from '@angular/core';
import { FlashcardsService, Flashcard } from '../flash-cards.service';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/accounts/services/accounts.service';
import { User } from 'src/app/accounts/models/user.model';
import { Auth } from 'src/app/accounts/models/auth.model';


@Component({
  selector: 'app-flash-cardlist',
  templateUrl: './flash-cardlist.component.html',
  styleUrls: ['./flash-cardlist.component.scss']
})
export class FlashCardlistComponent implements OnInit {
  index = 0;
  currentUser: User;
  flashcard: Flashcard;
  flashcardlist = [new Flashcard()];
  constructor(private CardSvc: FlashcardsService, private accountsService: AccountsService, private router: Router) {
  this.CardSvc.getFlashcard().subscribe(flashcard => {this.flashcard = flashcard; });

}
setlist(list) {
  console.log('in setlist');
  this.flashcardlist = list;
}
  ngOnInit(): void {
    this.CardSvc.getFlashcards().subscribe(list => {
      console.log(list);
      this.setlist(list);

      console.log(' ' + this.flashcardlist[this.index]);
      this.flashcard = this.flashcardlist[this.index];
      this.flashcard.front = false;

    });
    this.accountsService.getBehaviorSubject().subscribe((auth: Auth) => {
      // print out user info
      console.log('HOME COMP: ' + JSON.stringify(auth.currentUser, null, 2));

      // set currentUser for your component (if needed)
      this.currentUser = auth.currentUser;
    });


  }

  passcard() {
    this.flashcard = this.flashcardlist[this.index];
    this.flashcard.pass = !this.flashcard.pass;
    // this.CardSvc.getFlashcard().pipe(tap(e => this.flashcard.pass));
    this.CardSvc.pass(this.flashcard).subscribe(_ => {
      this.router.navigate(['card/cards']);
  });
}

  reset() {
    this.flashcardlist.forEach(card => {card.pass = false; card.front = false; });
    }

  addcard() {
    this.CardSvc.pass(this.flashcard).subscribe(_ => {
      this.router.navigate(['/']);


  });
}
  deletecard(flashcard: Flashcard) {
    this.CardSvc.deleteBook(flashcard).subscribe(_ => {
        this.flashcardlist = this.flashcardlist.filter(b => b.id !== this.flashcard.id);
        console.log(this.flashcardlist[0].id);
        console.log(flashcard.id);
        // this.router.navigate(['card/cards']);
        window.location.reload();
    });
  }

  leftArrow() {
    this.index--;
    if (this.index < 0) {
      this.index = this.flashcardlist.length;
       }
    while (this.flashcardlist[this.index].pass === true) {
      this.index--;
      if (this.index < 0) {
        this.index = this.flashcardlist.length;
         }
    }

  }
  rightArrow() {

    if (this.index < this.flashcardlist.length - 1) {
      this.index++;
    }
  }
}

