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
  circle1Color = '#ffea00'; // Yellow
  circle2Xcoor = 500;
  circle2Ycoor = 250;
  circle2Color = '#ff0b03'; // Red
  circle3Xcoor = 750;
  circle3Ycoor = 750;
  circle3Color = '#034fff'; // Blue
  circleCenterXcoor = 750;
  circleCenterYcoor = 750;
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
      this.findCenterPointOfTriangle();
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
    this.updateColors();
  }

  ngDoCheck() {
  }

  ngOnChanges() {
    this.updateColors();
  }

  clickCircle(id: number, evt) {
  }

  clickTriangle() {
  }

  mousedown(id: number, evt) {
    this.findCenterPointOfTriangle();
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

  updateColors() {
    console.log("updating colors")
    let stop1 = document.getElementById("stop1");
    let stop2 = document.getElementById("stop2");
    let stop3 = document.getElementById("stop3");
    console.log("stop1", stop1)
    console.log("stop2", stop2)
    console.log("stop3", stop3)
    stop1.setAttribute("stop-color", this.circle1Color)
    stop2.setAttribute("stop-color", this.circle2Color)
    stop3.setAttribute("stop-color", this.circle3Color)
    console.log("stop1", stop1)
    // this.circle1.setAttribute("points", newPoints);
  }

  findCenterPointOfTriangle() {
    let circle1 = document.getElementById("circle1");
    let circle2 = document.getElementById("circle2");
    let circle3 = document.getElementById("circle3");
    // this.selectedCircle.setAttribute("cy", evt.clientY);
    // console.log("---> ", this.selectedCircle.getAttribute("cx"))
    // console.log("circle 1 attr: ", circle1.getAttribute('cx'))
    // console.log("circle 1: --> ", circle1)
    this.circleCenterXcoor = (+circle1.getAttribute('cx') + +circle2.getAttribute('cx') + +circle3.getAttribute('cx')) / 3;
    this.circleCenterYcoor = (+circle1.getAttribute('cy') + +circle2.getAttribute('cy') + +circle3.getAttribute('cy')) / 3;
    // console.log("CENTER: ", this.circleCenterXcoor + ',' + this.circleCenterYcoor)
    return this.circleCenterXcoor + ',' + this.circleCenterYcoor;
  }
}
