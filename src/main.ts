import 'zone.js';
import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, noop, tap } from 'rxjs';
import { users } from './data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <h1 class="text-3xl font-bold mb-10">
      Visualizing Observables with Angular Pipes
    </h1>
    <div class='flex flex-col gap-10'>
      @for (user of (users$ | async); track user.fullName) {
        <div class="card flex flex-row gap-4 p-3 max-w-lg bg-gradient-to-r from-slate-900 to-slate-700 shadow-xl">
          <div class="avatar">
            <div class="w-16 rounded-full"> 
              <img [src]="user.profilePicture" />
            </div>
          </div> 
          <div>
            <p class="font-bold text-lg">{{ user.fullName }}</p>
            <p class="font-italic text-sm">{{ user.bio }}</p>
          </div>
      </div>
      } @empty {
        <small>No users</small>
      }

      <pre>{{ users$ | async | json }}</pre>
    </div>
  `,
})
export class App implements OnInit {
  // This could be an HTTP request
  readonly users$ = new BehaviorSubject(users);

  ngOnInit() {
    // Ways to visualize an observable stream in the console
    this.users$.subscribe(console.log);
    this.users$.pipe(tap(console.log)).subscribe(noop);
  }
}

bootstrapApplication(App);
