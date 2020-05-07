import { Component} from '@angular/core';
import { Post } from '../models/post.model';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';  // To route to homepage after add post
import { AuthenticationService } from '../services/auth.service';
import { PostService } from '../services/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {

  constructor(private http: HttpClient,
    private router: Router,
    private authService: AuthenticationService,
    private postService: PostService) { }

  // On addin a post and clicking submit, check for profanity
  onAddPost(form: NgForm){
    if(form.invalid){
      return;
    }
    // Post object to send to backend
    const post: Post = {
      title: form.value.title,
      imgUrl: form.value.imgUrl,
      author: this.authService.getEmail(),
      isApproved: false
    }
    this.postService.sendPost(post);
    // Reset the form after submit
    form.resetForm();
    // Go to home and see the newly added post
    this.router.navigate(['']);
  }
}
