import { Command, Flags } from '@oclif/core'
import Database from '../database'
import Downloader from '../downloader'
import EpisodeFilter from '../episode-filter'
import { parseFilterString } from '../util'

export default class Download extends Command {
  static description = 'Downloads episodes from southpark.de'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    filter: Flags.string({ char: 's', description: 'Limit episodes to download like "S01E01,S02E02,S03E04-S06E02,S07,S9-S10E4"' }),
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Download)

    /* Generate filters if they are provided */
    const filters: EpisodeFilter[] = flags.filter ? parseFilterString(flags.filter) : []

    /* Filter database by provided arguments */
    const episodes = (new Database()).getEpisodes(filters)

    /* Initialize and configure the downloader */
    const downloader = new Downloader()

    /* Download the episodes */
    await downloader.process(episodes)
  }
}
