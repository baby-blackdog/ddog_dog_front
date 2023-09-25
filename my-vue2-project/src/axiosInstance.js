import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJiYWJ5LWJsYWNrZG9nIiwiaWF0IjoxNjk1NDc3MjMyLCJleHAiOjE2OTgwNjkyMzIsImVtYWlsIjoiZGJ6eGM5NjZAbmF2ZXIuY29tIiwicm9sZSI6IlVTRVIifQ.m3cXy-hX0Or0wGiHzwozWTQhKE9dJwTAZuX9Q_cK3FQb_GDQxbSieJ8mbUHO9Np2wgwEeki5snryaA464fOybQ'
  }
});

export default instance;
