import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../services/question.service';
import { Post, Reply, User } from '../interfaces/app.interfaces';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent implements OnInit {
  posts: Post[] = [];
  newPostContent: string = '';
  newReplyContent: { [key: string]: string } = {};

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this.questionService.getAllQuestions().subscribe({
      next: (data) => {
        this.posts = data;
        console.log('Forum posts fetched:', this.posts);
      },
      error: (error: any) => {
        console.error('Error fetching forum posts:', error);
      }
    });
  }

  createPost() {
    if (this.newPostContent.trim()) {
      const postData = {
        content: this.newPostContent,
        title: 'New Question' // Backend expects a title? Adding default for now.
      };

      this.questionService.createQuestion(postData).subscribe({
        next: (response) => {
          console.log('Post created successfully:', response);
          this.newPostContent = '';
          this.fetchPosts();
        },
        error: (error: any) => {
          console.error('Error creating post:', error);
          alert('Failed to create post. Please try again.');
        }
      });
    } else {
      alert('Post content cannot be empty.');
    }
  }

  createReply(postId: any) {
    const replyContent = this.newReplyContent[postId];
    if (replyContent && replyContent.trim()) {
      const replyData = { content: replyContent };

      this.questionService.replyToQuestion(postId, replyData).subscribe({
        next: (response) => {
          console.log('Reply created successfully:', response);
          this.newReplyContent[postId] = '';
          this.fetchPosts();
        },
        error: (error: any) => {
          console.error('Error creating reply:', error);
          alert('Failed to create reply. Please try again.');
        }
      });
    } else {
      alert('Reply content cannot be empty.');
    }
  }
}
