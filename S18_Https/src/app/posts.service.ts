import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { environment } from '../environments/environment.prod'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {

  }

  async createPost(postData: Post) {
    this.http.post(environment.url + 'posts.json', postData,{observe : 'response'}).subscribe(res => console.log(res));
  }

  fetchPost() {

    let form = new FormData();
    form.append('hii','swapnil')

    return this.http
      .get<{ [key: string]: Post }>(environment.url + 'posts.json',{
        headers : new HttpHeaders({"custom-header" : "hello"}),  
        // params : new HttpParams().set('name','swapnil')
      })
      .pipe(map((responseData) => {
        const arrayResult: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            arrayResult.push({ ...responseData[key], id: key });
          }
        }
        return arrayResult;
      }
      ));

  }

  deletePost() {
    return this.http.delete(environment.url + 'posts.json');
  }

}
