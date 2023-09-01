import Repository from './repository';

export default class ProjectSettingsRepository extends Repository {
  public async getCountries(): Promise<string[]> {
    const response = await this.apiRoot.get().execute();
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return response.body.countries.map((countryCode) => regionNames.of(countryCode) || '').filter((country) => country);
  }
}
