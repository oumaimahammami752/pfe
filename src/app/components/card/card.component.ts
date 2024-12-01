import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card-wrap"
      (mousemove)="handleMouseMove($event)"
      (mouseenter)="handleMouseEnter()"
      (mouseleave)="handleMouseLeave()"
      #card>
      <div class="card"
        [ngStyle]="cardStyle">
        <div class="card-bg" [ngStyle]="[cardBgTransform, cardBgImage]"></div>
        <div class="card-info">
          <ng-content select="[header]"></ng-content>
          <ng-content select="[content]"></ng-content>
        </div>
      </div>
    </div>`,
  styleUrls: ['./card.component.scss'],
  imports: [CommonModule]
})
export class CardComponent implements OnInit {
  @Input() dataImage!: string;

  @ViewChild('card') card!: ElementRef;

  width = 0;
  height = 0;
  mouseX = 0;
  mouseY = 0;
  mouseLeaveDelay: any;

  ngOnInit() {
    this.width = this.card.nativeElement.offsetWidth;
    this.height = this.card.nativeElement.offsetHeight;
  }

  get mousePX() {
    return this.mouseX / this.width;
  }

  get mousePY() {
    return this.mouseY / this.height;
  }

  get cardStyle() {
    const rX = this.mousePX * 30;
    const rY = this.mousePY * -30;
    return {
      transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
    };
  }

  get cardBgTransform() {
    const tX = this.mousePX * -40;
    const tY = this.mousePY * -40;
    return {
      transform: `translateX(${tX}px) translateY(${tY}px)`
    };
  }

  get cardBgImage() {
    return {
      backgroundImage: `url(${this.dataImage})`
    };
  }

  @HostListener('mousemove', ['$event'])
  handleMouseMove(event: MouseEvent) {
    const rect = this.card.nativeElement.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left - this.width / 2;
    this.mouseY = event.clientY - rect.top - this.height / 2;
  }

  handleMouseEnter() {
    clearTimeout(this.mouseLeaveDelay);
  }

  handleMouseLeave() {
    this.mouseLeaveDelay = setTimeout(() => {
      this.mouseX = 0;
      this.mouseY = 0;
    }, 1000);
  }
}
