import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { ConsumeService } from './consume.service';

describe('ConsumeService', () => {
  let service: ConsumeService;
  let httpCtrl: HttpTestingController;

  const POST_RESPONSE = [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ConsumeService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get posts', () => {
    service.getPosts()
      .subscribe({
        next: (response) => {
          expect(response).toBeTruthy();
          expect(response.length).toBe(1);
        }
      });
    const mockHttp = httpCtrl.expectOne('http://localhost:3000/posts');
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("GET");

    mockHttp.flush(POST_RESPONSE);
  });
});
