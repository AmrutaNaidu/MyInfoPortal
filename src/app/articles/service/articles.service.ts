import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Article } from '../model/article';
import { Observable, BehaviorSubject } from 'rxjs';
import { AccountsService } from 'src/app/accounts/services/accounts.service';
import { Auth } from 'src/app/accounts/models/auth.model';
import { User } from 'src/app/accounts/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  articleSubject: BehaviorSubject<Article>;

  constructor(
    private http: HttpClient,
    private accountsService: AccountsService
  ) {
    this.articleSubject = new BehaviorSubject(null);
    this.accountsService.getBehaviorSubject().subscribe((auth: Auth) => {
      console.log(auth)
      if (auth.currentUser != undefined) {
        this.currentUser = auth.currentUser;
      }
    });
  }
  private currentUser: User;

  get(url: string, options?): Observable<any> {
    return this.http.get<Article[]>(url, options);
  }

  put(url: string, body: Article, options?): Observable<HttpEvent<Article>> {
    return this.http.put<Article>(url, body, options);
  }

  post(url: string, body: Article, options?): Observable<HttpEvent<Article>> {
    return this.http.post<Article>(url, body, options);
  }

  delete(url: string, options?): Observable<any> {
    return this.http.delete<Article>(url, options);
  }

  setArticle(article: Article) {
    this.articleSubject.next(article);
  }

  getCurrentUser() {
    return this.currentUser;
  }
}
