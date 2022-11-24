import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';  
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  loadedPosts: Post[] = [];
  isFetching : boolean = false;
  error = null;

  constructor(private http: HttpClient,
              private postService: PostsService) {

  }

  ngOnInit() {
    this.onGetPost();
  }

  onCreatePost(postData: Post)  {
   this.postService.createPost(postData);
  }

  onFetchPosts() {
    this.onGetPost();
  }

  onClearPosts() {
    this.postService.deletePost().subscribe(res => {
      this.loadedPosts = [];
    }, error => {
      this.error = error.message;
    });
  }

  onGetPost() {
    this.isFetching = true
    this.postService.fetchPost().subscribe(res => {
      this.loadedPosts = res;
      this.isFetching = false;
    }, error => {
      this.error = error.message;
    })
  }
}
