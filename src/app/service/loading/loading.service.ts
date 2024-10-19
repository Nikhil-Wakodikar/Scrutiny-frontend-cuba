import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable(); // Expose the loading state as an observable

  show() {
    this.loadingSubject.next(true); // Show the loader
  }

  hide() {
    this.loadingSubject.next(false); // Hide the loader
  }
}
