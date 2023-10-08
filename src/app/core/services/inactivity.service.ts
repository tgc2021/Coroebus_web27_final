import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {
  private inactivityTimer: any;
  constructor() { }
  startInactivityTimer() {
    // this.inactivityTimer = setTimeout(() => {
      
    //   document.body.classList.remove('dashboard-bg-image');
    //   document.body.style.backgroundImage = "url('')"
    //   localStorage.clear()
   
    //   location.reload()
    //   location.href = '#/account/login';
    //   console.log('User has been inactive for 10 minutes. Logging out...');
    // },  10*60 * 1000); // 10 minutes
  }

  // Reset the inactivity timer on user interaction
  resetInactivityTimer() {
    clearTimeout(this.inactivityTimer);
    this.startInactivityTimer();
  }
}
