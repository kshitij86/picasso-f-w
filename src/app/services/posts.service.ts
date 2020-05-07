import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostService {

    currentUserEmail: string;

    constructor(private http: HttpClient) {}

    // Go to this endpoint and fetch home posts data
    getPosts(): Observable<Post[]>{
        return this.http.get<Post[]>('https://picasso-backend.herokuapp.com/api/posts');
    }

    // Get only posts for a specific user
    getSpecificPosts(currentUser: string): Observable<Post[]>{
        return this.http.get<Post[]>('https://picasso-backend.herokuapp.com/api/posts/' + currentUser);
    }

    // Delete a specific post
    onDeletePost(postTitle: string){
        this.http.delete('https://picasso-backend.herokuapp.com/api/posts/' + postTitle)
        .subscribe((resData) => {
          console.log('Post deleted');
        });
    }

    // Add a post
    sendPost(post: Post){
        // Send data to server
        this.http.post<any>('https://picasso-backend.herokuapp.com/api/posts', post)
        .subscribe((resData) => {
            console.log(resData);
        });
    }

    // Methods for admins
    getAdminPosts(): Observable<Post[]>{
        return this.http.get<Post[]>('https://picasso-backend.herokuapp.com/api/admin/posts');
    }

    onApprovePost(title: string){
        console.log(title);
        this.http.get('https://picasso-backend.herokuapp.com/api/admin/posts/approve/' + title)
        .subscribe((resData) => {
            console.log(resData);
        });
    }
}
