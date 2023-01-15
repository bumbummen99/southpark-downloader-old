export default class Downloader {
  /**
   * Determines how many episodes will be loaded in parallel.
   */
  private parallel: number;

  constructor() {
    this.parallel = 4
  }

  /**
   * Download the provided episodes.
   */
  public async process(episodes: Episode[]): Promise<void> {
    for (const episode of episodes) {
      console.log(`Processing S${episode.season.toString().padStart(2, '0')}E${episode.index.toString().padStart(2, '0')}.`)
    }
  }
}
