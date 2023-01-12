import { Command, Flags } from '@oclif/core'
import Database from '../database'
import { parseFilterString } from '../util'

export default class Download extends Command {
  static description = 'Downloads episodes from southpark.de'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    filter: Flags.string({char: 's', description: 'Limit episodes to download like "S01E01,S02E02,S03E04-S06E02,S07,S9-S10E4"'}),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(Download)

    /* Generate filters if they are provided */
    const filters: EpisodesFilter[] = flags.filter ? parseFilterString(flags.filter) : []

    /* Filter database by provided arguments */
    const episodes = (new Database()).getEpisodes(episode => {
      if (flags.season && episode.season != flags.season) {
        return false
      }

      if (flags.episode && episode.index != flags.episode) {
        return false
      }

      return true
    })

    /* Initialize and configure the downloader */
    const downloader = new Downloader(episodes)

    /* Download the episodes */
    await downloader.download()
  }
}
