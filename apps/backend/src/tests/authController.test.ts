import assert from 'node:assert/strict';
import { test } from 'node:test';
import express from 'express';
import http from 'node:http';
import { registerRoutes } from '../routes/index.js';

async function startServer() {
  const app = express();
  app.use(express.json());
  registerRoutes(app);

  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const address = server.address();

  if (!address || typeof address === 'string') {
    throw new Error('Failed to start test server');
  }

  const baseUrl = `http://127.0.0.1:${address.port}`;
  return {
    baseUrl,
    close: () => new Promise<void>((resolve) => server.close(() => resolve())),
  };
}

test('auth controller registers and logs in a user over HTTP', async () => {
  const server = await startServer();
  const suffix = Date.now().toString();
  const username = `testuser_${suffix}`;
  const password = 'password123';

  try {
    const registerResponse = await fetch(`${server.baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const registerBody = (await registerResponse.json()) as {
      success: boolean;
      token?: string;
      user?: { id: string; username: string };
    };

    assert.equal(registerResponse.status, 200);
    assert.equal(registerBody.success, true);
    assert.ok(registerBody.token);
    assert.deepEqual(registerBody.user, { id: registerBody.user?.id, username });

    const loginResponse = await fetch(`${server.baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const loginBody = (await loginResponse.json()) as {
      success: boolean;
      token?: string;
      user?: { id: string; username: string };
    };

    assert.equal(loginResponse.status, 200);
    assert.equal(loginBody.success, true);
    assert.ok(loginBody.token);
    assert.deepEqual(loginBody.user?.username, username);
  } finally {
    await server.close();
  }
});

test('auth controller rejects duplicate registration attempts', async () => {
  const server = await startServer();
  const username = `dup_user_${Date.now()}`;
  const password = 'password123';

  try {
    const firstResponse = await fetch(`${server.baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const secondResponse = await fetch(`${server.baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const secondBody = (await secondResponse.json()) as { success: boolean; error?: string };

    assert.equal(firstResponse.status, 200);
    assert.equal(secondResponse.status, 409);
    assert.equal(secondBody.success, false);
    assert.equal(secondBody.error, 'Username already exists.');
  } finally {
    await server.close();
  }
});

test('auth controller rejects invalid login credentials', async () => {
  const server = await startServer();
  const username = `login_user_${Date.now()}`;
  const password = 'password123';

  try {
    await fetch(`${server.baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const invalidLoginResponse = await fetch(`${server.baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password: 'wrong-password' }),
    });
    const invalidLoginBody = (await invalidLoginResponse.json()) as {
      success: boolean;
      error?: string;
    };

    assert.equal(invalidLoginResponse.status, 401);
    assert.equal(invalidLoginBody.success, false);
    assert.equal(invalidLoginBody.error, 'Incorrect username or password');
  } finally {
    await server.close();
  }
});
