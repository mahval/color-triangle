import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-triangle-display',
  templateUrl: './triangle-display.component.html',
  styleUrls: ['./triangle-display.component.scss']
})
export class TriangleDisplayComponent implements OnInit {
  mouseIsDown: boolean = false;
  selectedCircle;
  selectedCircleId: number;
  triangle;
  resizableMinWidth = 10;

  dragging = false;

  circle1Xcoor = 250;
  circle1Ycoor = 750;
  circle2Xcoor = 500;
  circle2Ycoor = 250;
  circle3Xcoor = 750;
  circle3Ycoor = 750;
  circleRadius = 15;

  trianglePoints = this.circle1Xcoor + ',' + this.circle1Ycoor + ',' + this.circle2Xcoor + ',' + this.circle2Ycoor + ',' + this.circle3Xcoor + ',' + this.circle3Ycoor


  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {

    const mouseDrag = (evt) => {
      if (!this.dragging) {
        return;
      }

      this.selectedCircle.setAttribute("cx", evt.clientX);
      this.selectedCircle.setAttribute("cy", evt.clientY);
      let pointsArray = this.triangle.getAttribute("points").split(' ');
      pointsArray[this.selectedCircleId - 1] = evt.clientX + ',' + evt.clientY;
      let newPoints = pointsArray.join(" ");
      this.triangle.setAttribute("points", newPoints);
    };

    const mouseUp = (evt) => {
      if (!this.dragging) {
        return;
      }
      this.dragging = false;
      evt.preventDefault();
    };

    const mouseDown = (evt) => {
      this.dragging = true;
      evt.preventDefault();
    };

    this.renderer.listen('window', 'mousemove', mouseDrag);
    this.renderer.listen('window', 'mouseup', mouseUp);

    this.renderer.listen('window', 'touchmove',
      (evt: TouchEvent) => mouseDrag(Object.assign(evt, {
        clientX: evt.targetTouches[0].clientX,
        clientY: evt.targetTouches[0].clientY
      }))
    );
    this.renderer.listen('window', 'touchend', mouseUp);
    el.nativeElement.addEventListener('touchstart',
      (evt: TouchEvent) => mouseDown(Object.assign(evt, {
        clientX: evt.targetTouches[0].clientX,
        clientY: evt.targetTouches[0].clientY
      }))
    );
  }



  ngOnInit() {
  }

  ngDoCheck() {
  }

  ngOnChanges() {

  }

  clickCircle(id: number, evt) {
  }

  clickTriangle() {
  }

  mousedown(id: number, evt) {
    this.mouseIsDown = true;
    this.dragging = true;
    this.selectedCircle = evt.target;
    this.selectedCircleId = id;
    if (id < 1) this.triangle = evt.target;
  }

  mouseup(id: number) {
    this.mouseIsDown = false;
    this.selectedCircle = null;
  }
}
