import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/posts.service';
import { PostFilter } from '../models/post-filter.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  msg: string;
  homePosts: PostFilter[];

  constructor(private postService: PostService) {
    this.msg = "Posts for the home"
  }

  ngOnInit(): void {

    this.postService.getPosts()
    .subscribe((resData) => {
      this.homePosts = resData
    });

  }

  ngOnDestroy(){
  }
}
