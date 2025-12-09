import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { MessageEvent } from '@nestjs/common';

@Injectable()
export class SseService {
  private userStreams = new Map<string, Subject<MessageEvent>>();

  addStream(userId: string): Observable<MessageEvent> {
    if (!this.userStreams.has(userId)) {
      this.userStreams.set(userId, new Subject<MessageEvent>());
    }
    return this.userStreams.get(userId)!.asObservable();
  }

  notifyUser(userId: string, eventName: string, data: any = {}) {
    const stream = this.userStreams.get(userId);
    if (stream) {
      stream.next({
        data,
        type: eventName,
      });
    }
  }
}
