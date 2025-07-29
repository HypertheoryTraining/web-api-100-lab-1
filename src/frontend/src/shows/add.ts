import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ShowsStore } from './shows.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <div class="max-w-2xl mx-auto p-6">
      <h2 class="text-3xl font-bold mb-6">Add a New Show</h2>
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="form-control">
              <label class="label" for="title">
                <span class="label-text font-medium">Title</span>
              </label>
              <input
                id="title"
                type="text"
                formControlName="name"
                class="input input-bordered w-full"
                placeholder="Enter the show title"
                required
                aria-describedby="title-help"
              />
              <div class="label">
                <span class="label-text-alt" id="title-help"
                  >The name of the TV show</span
                >
              </div>
            </div>

            <div class="form-control">
              <label class="label" for="description">
                <span class="label-text font-medium">Description</span>
              </label>
              <textarea
                id="description"
                formControlName="description"
                class="textarea textarea-bordered w-full min-h-24"
                placeholder="Enter a brief description of the show"
                rows="4"
                aria-describedby="description-help"
              ></textarea>
              <div class="label">
                <span class="label-text-alt" id="description-help"
                  >A brief summary of what the show is about</span
                >
              </div>
            </div>

            <div class="form-control">
              <label class="label" for="streamingService">
                <span class="label-text font-medium">Streaming Service</span>
              </label>
              <input
                id="streamingService"
                type="text"
                formControlName="streamingService"
                class="input input-bordered w-full"
                placeholder="e.g., Netflix, Hulu, Amazon Prime"
                required
                aria-describedby="streaming-help"
              />
              <div class="label">
                <span class="label-text-alt" id="streaming-help"
                  >Where the show can be watched</span
                >
              </div>
            </div>

            <div class="form-control mt-8">
              <button type="submit" class="btn btn-primary btn-lg w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Show
              </button>
            </div>
            <button
              type="cancel"
              class="btn btn-secondary btn-lg w-full mt-4"
              (click)="router.navigate(['..'])"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class Add {
  store = inject(ShowsStore);
  router = inject(Router);
  form = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    streamingService: new FormControl('', { nonNullable: true }),
  });

  onSubmit() {
    const newShow = this.form.value;
    this.store.addShow(newShow);
    this.router.navigate(['..']);
  }
}
