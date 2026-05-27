// In-memory user store
// TODO: Replace with persistent store if needed
const users: any[] = [];

export function registerUser(username: string, password: string) {
  // TODO: Hash password, check for duplicates
  const user = { id: Date.now().toString(), username, password };
  users.push(user);
  return user;
}

export function findUser(username: string) {
  return users.find(u => u.username === username);
}
