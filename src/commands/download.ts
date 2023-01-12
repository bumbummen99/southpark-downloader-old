import { Command, Flags } from '@oclif/core'
import Database from '../database'

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
    const filters: EpisodesFilter[] = []
    if (flags.filter) {
      /* Process all filters split by the delimiter */
      for (const input of flags.filter.split(',')) {
        /* Match the line with out magic regex */
        const [match, season, episode, toSeason, toEpisode] = /^S(\d{2})(?:E(\d{2}))?(?:-S(\d{2})(?:E(\d{2}))?)?$/.exec(input) || []
        
        /* Verify that the provided input is well formed */
        if (! match) {
          throw new Error(`The provided episode filter '${input}' is invalid. Filters have to be one of the following formats S00E00 (episode), S00 (season), S00E00-S00E00 (range), S00-S00E00 (range)`)
        }

        filters[] = (e: Episode) => {
          /* Season */
          if () {
            if (typeof toSeason === 'number') {
              /* Make sure the season is in bounds */
              if (e.season < season || e.season > toSeason) {

              }
            } else {
              
            }
          }
        }
      }
    }

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
