import { Router } from "@angular/router";

/**
  * This method returns a database object (key-value pair) as two entries in an array.
  * We can use this in the general-data.component.html to call *ngFor and iterate over all userdata key-value pairs
  *
  * @author: Max (maxy@mail.upb.de)
  *
  */ 
export function getObjectPairs(obj: object): [string, any][] {
    return Object.entries(obj);
  }

  /**
  * This method scrolls to the top of the page.
  * This is useful when navigating to an element at the start of the page, because it prevents the header from overlapping the element.
  *
  * @author: Paul (pasch@mail.upb.de)
  *
  */ 
export function scrollToTop():void {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}

/**
  * This method calls an url with a router and scrolls to the top (see scrollToTop).
  *
  * @author: Paul (pasch@mail.upb.de)
  *
  */
export function navigateAndScroll(router: Router, url: string):void {
  router.navigateByUrl(url);
  scrollToTop();
}