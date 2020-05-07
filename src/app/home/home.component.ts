import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from '../services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  msg: string;
  posts: Post[];

  constructor(private postService: PostService) {
    this.msg = "Posts for the home"
  }

  ngOnInit(): void {

    this.postService.getPosts()
    .subscribe((resData) => {
      this.posts = resData
    });

  }

  ngOnDestroy(){
  }
}
