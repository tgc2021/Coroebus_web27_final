import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EventService } from '@app/services/event.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notification-popup',
  templateUrl: './notification-popup.component.html',
  styleUrls: ['./notification-popup.component.scss']
})
export class NotificationPopupComponent implements OnInit {

  @Input() notoficationData: any
  videoURL: SafeResourceUrl
  constructor(public activeModal: NgbActiveModal, private domSanitizer: DomSanitizer,
    private eventService: EventService) { }

  ngOnInit(): void {
  
    
    
    if (this.notoficationData?.video_path) {
      this.videoURL = this.domSanitizer?.bypassSecurityTrustResourceUrl(this.notoficationData?.video_path)
      
      
    }
  }
  close() {
    this.activeModal.close();
    this.eventService.broadcast('callNotificationAPIAfterRead', this.notoficationData)

  }

}
