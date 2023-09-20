/**
 * @jest-environment node
 */

// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-unused-vars
import fetch from 'node-fetch';
import UserRepository from '../app/api/user';

class LocalStorageMock {
  private store: { [key: string]: string };

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  public get length(): number {
    return Object.keys(this.store).length;
  }

  key(index: number) {
    return Object.keys(this.store)[index];
  }
}

global.localStorage = new LocalStorageMock();

describe('User repository', () => {
  const repository = new UserRepository();

  describe('when checking token', () => {
    it('throws error when token is not valid', () => {
      localStorage.setItem(UserRepository.STORAGE_KEY, '"grgerger"');
      expect(repository.checkToken).toThrowError();
    });

    it('stores token when it is valid', async () => {
      const tempValidToken =
        '{"id":"da5156a4-a283-475c-a02d-3702aacaeaa2","versionModifiedAt":"2023-09-01T16:03:28.768Z","lastMessageSequenceNumber":1,"createdAt":"2023-09-01T16:03:28.768Z","lastModifiedAt":"2023-09-01T16:03:28.768Z","lastModifiedBy":{"clientId":"l6uBcwmAGKqxB-YYeKVO9VlX","isPlatformClient":false},"createdBy":{"clientId":"l6uBcwmAGKqxB-YYeKVO9VlX","isPlatformClient":false},"customerId":"795c58ae-8e7e-4474-8c65-de5c979f2b47","expiresAt":"2023-09-25T16:03:28.765Z","value":"DZT0AD48Mx1NjHMLoB1XIJjcZKwPKD9qNdHdxC-e"}';
      localStorage.setItem(UserRepository.STORAGE_KEY, tempValidToken);
      repository.checkToken();
      const user = await repository.user;
      expect(user).toBeTruthy();
    });
  });

  it('deletes token when logging out', async () => {
    repository.logout();
    const user = await repository.user;
    expect(user).toBeNull();
  });

  describe('when authorizing', () => {
    it('throws error when credentials are invalid', async () => {
      await expect(repository.authorize('pojgt@oigjre', 'igjrw3')).rejects.toThrowError();
    });
  });
});
