import { describe, expect, it } from 'vitest';
import { oauth } from './oauth';

describe('getAccessTokenUrl', () => {
  const { getAccessTokenUrl } = oauth;

  it('should return an access token url', () => {
    const clientId = 'fakeClientID';
    const clientSecret = 'fakeClientSecret';
    const code = 'fakeCode';
    const host = 'fakeHost';
    const expected = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&redirect_uri=https%3A%2F%2F${host}%2Fcallback`;

    const result = getAccessTokenUrl({
      clientId,
      clientSecret,
      code,
      host,
    });

    expect(result).toEqual(expected);
  });
});

describe('getAuthUrl', () => {
  const { getAuthUrl } = oauth;

  it('should return an access token url', () => {
    const clientId = 'fakeClientID';
    const host = 'fakeHost';
    const expected = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=https%3A%2F%2F${host}%2Fcallback&scope=repo%2Cuser`;

    const result = getAuthUrl({
      clientId,
      host,
    });

    expect(result).toEqual(expected);
  });
});
