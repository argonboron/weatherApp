import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createMessage, getMessagesForCity } from '../services/messageService.js';

test('createMessage persists a city message and getMessagesForCity returns it', () => {
  const city = `City_${Date.now()}`;
  const message = createMessage({
    city: `  ${city}  `,
    content: 'Hello from the test skeleton',
    userId: 'user-1',
    username: 'TestUser',
  });

  assert.equal(message.city, city);
  assert.equal(message.content, 'Hello from the test skeleton');
  assert.equal(message.userId, 'user-1');
  assert.equal(message.username, 'TestUser');
  assert.equal(typeof message.timestamp, 'number');
  assert.equal(getMessagesForCity(city).at(-1)?.id, message.id);
});
