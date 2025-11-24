import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'e_learning_app';
  message = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get<{ message: string }>('test').subscribe({
      next: (response) => {
        this.message = response.message;
        console.log('Backend response:', response);
      },
      error: (error) => {
        console.error('Backend connection error:', error);
      }
    });
  }
}
