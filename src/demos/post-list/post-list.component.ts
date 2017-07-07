import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as httpStuff from '@angular/http';
import { Http } from '@angular/http';
import { PostService, Post } from './post.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export function createStrategy() {
  return {
    configureRequest(req: any) { return req;}
  }
}

@Component({
    selector: 'post-list',
    template: `
<div id="posts-block">
    <div class="post-block" *ngFor="let post of posts | push">
        <div class="post-image" style="background-image: url('https://fluin.io/assets/images/imgpostholder.png')"></div>
        <div class="post-image"  [style.background-image]="'url('+post.image+')'"></div>
        <!--
        *ngIf="!post.image"
        *ngIf="post.image"
        -->
        <div class="post-title">

            <h2>{{post.title}}</h2>
        </div>
        <div class="post-date">
            <h3 class="date">{{post.date}}</h3>
        </div>
    </div>

</div>
`,
  providers: [
      {provide: httpStuff.Http, useFactory: httpStuff.ɵc, deps: [httpStuff.XHRBackend, httpStuff.RequestOptions]},
    httpStuff.BrowserXhr,
    {provide: httpStuff.RequestOptions, useClass: httpStuff.BaseRequestOptions},
    {provide: httpStuff.ResponseOptions, useClass: httpStuff.BaseResponseOptions},
    httpStuff.XHRBackend,
    {provide: httpStuff.XSRFStrategy, useFactory: createStrategy},
      PostService,
      ]
})
export class PostListComponent {
    @Input() set limit(val: number) {
      this.currentLimit.next(val);
    };

    posts: Observable<any[]>;
    currentLimit = new BehaviorSubject(12);

    constructor(http: Http, public postService: PostService) {
    }
    ngOnInit() {

        // Have to do this via a setter behaviorsubject because lifecycle hooks won't recognize the @input change
        this.posts = this.currentLimit.switchMap(limit =>
          this.postService.postList.map(list => list.slice(0, limit))
        );
    }

    ngOnChanges() {
      // console.log('ng on changes');
      //   this.posts = this.postService.postList.map(list => list.slice(0, this.limit));
    }
}
