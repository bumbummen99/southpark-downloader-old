import { Flags } from '@oclif/core'
import Command from '../core/Command'
import Database from '../core/Database'
import Downloader from '../core/Downloader'

export default class Download extends Command {
  static description = 'Downloads the episodes from southpark.de'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    season: Flags.integer({char: 's', description: 'Season to download'}),
    episode: Flags.integer({char: 'e', description: 'Episode to download'}),
  }

  public async run(): Promise<void> {
    await super.run()

    const {args, flags} = await this.parse(Download)

    /* Filter database by provided arguments */
    const episodes = (new Database).getEpisodes(episode => {
      if (flags.season && episode.season != flags.season) {
        return false
      }

      if (flags.episode && episode.index != flags.episode) {
        return false
      }

      return true
    });

    /* Initialize and configure the downloader */
    const downloader = new Downloader(episodes);

    /* Download the episodes */
    await downloader.download();
  }
}
