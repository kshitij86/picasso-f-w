import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';
import { Post } from '../models/post.model';
import { PostService } from '../services/posts.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  greeting: string;
  currentUser: string;
  currentUserID: string;
  currentUserPosts: Post[];
  allUsers: User[];
  adminText: string;
  adminStatus = false;
  verifiedStatus = false;

  constructor(private authService: AuthenticationService,
    private postService: PostService,
    private router: Router) { }

  getCurrentUserPosts(){
    // Return posts for the user.
    this.postService.getSpecificPosts(this.currentUserID)
    .subscribe((resData) => {
      this.currentUserPosts = resData;
    });
  }

  deletePost(postTitle: string){
    this.postService.onDeletePost(postTitle);
  }
  getAdminPosts() {
    this.postService.getAdminPosts()
    .subscribe((resData) => {
      this.currentUserPosts = resData;
    });
  }

  getAdminUsers() {
    this.authService.getAllUsers()
    .subscribe((resData) => {
      this.allUsers = resData;
    });
  }

  unapproveAdminPost(postTitle: string){
    // Post is now removed from the feed
    this.postService.onUnapprovePost(postTitle);
    this.router.navigate(['']);
  }

  approveAdminPost(postTitle: string) {
    this.postService.onApprovePost(postTitle);
    this.router.navigate(['']);
  }

  adminKickUser(id: string){
    this.authService.kickUser(id);
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.authService.getVerifiedStatus().subscribe((resData) => {
      this.verifiedStatus = resData.isVerified;
    });
    this.currentUserID = this.authService.getCurrentUserID();
    this.currentUser = this.authService.getCurrentUserName();
    this.adminStatus = this.authService.adminStatusListener;
    if(this.currentUser === undefined){
      this.greeting = "Please login first before accessing this page.";
    }
    else {
      this.greeting = `Hi ${this.currentUser} !`;
    }

    // Show posts
    if(this.adminStatus === true){
      this.getAdminPosts();
    } else {
      this.getCurrentUserPosts();
    }
    this.getAdminUsers();
  }
}
