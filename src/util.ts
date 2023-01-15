import { resolve } from 'node:path'
import EpisodeFilter from './episode-filter'

export function dataDir(): string {
  return resolve('/data')
}

export function parseFilterString(input: string): EpisodeFilter[] {
  const filters: EpisodeFilter[] = []

  for (const filter of input.split(',')) {
    /* Match the line with out magic regex */
    const [match, season, episode, toSeason, toEpisode] = /^S(\d{2})(?:E(\d{2}))?(?:-S(\d{2})(?:E(\d{2}))?)?$/.exec(input) || []

    /* Verify that the provided filter is well formed */
    if (!match) {
      throw new Error(`The provided episode filter '${filter}' is invalid. Filters have to be one of the following formats S00E00 (episode), S00 (season), S00E00-S00E00 (range), S00-S00E00 (range)`)
    }

    /* Initialize and add the filter */
    filters.push(new EpisodeFilter(Number(season), Number(episode), Number(toSeason), Number(toEpisode)))
  }

  return filters
}
