/**
 * @jest-environment node
 */

// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-unused-vars
import fetch from 'node-fetch';
import ProjectSettingsRepository from '../app/api/project';

describe('Project settings', () => {
  it('loads countries', async () => {
    const settings = new ProjectSettingsRepository();
    expect(await settings.getCountries()).toBeTruthy();
  });
});
