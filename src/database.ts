import axios from 'axios'
import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import EpisodeFilter from './episode-filter'
import { dataDir } from './util'

export const databaseFilePath = resolve(dataDir(), 'database.json')

export default class Database {
  static url = 'https://bumbummen99.github.io/southpark-downloader/database.json'

  private data: Episode[] = []

  /**
   * Loads the database from the JSON datafile.
   * @param sync Force sync the database with the repository (i.e. update)
   * @returns Promise <void>
   */
  public async load(sync = false): Promise<void> {
    /* Sync database with the repo in case we are forced to or the database does not exist locally */
    if (sync || existsSync(databaseFilePath)) {
      /* Load the database from the repository and overwrite the local file */
      await writeFile(databaseFilePath, await axios.get(Database.url, {
        responseType: 'json',
      }))
    }

    /* Load the local database file */
    this.data = JSON.parse(await readFile(databaseFilePath, 'utf-8'))
  }

  public getEpisodes(filters?: EpisodeFilter[]): Episode[] {
    if (filters) {
      /* Filter episodes to those that match any of the provided filters */
      return this.data.filter((episode: Episode) => filters.some((filter: EpisodeFilter) => filter.match(episode)))
    }

    return this.data
  }
}
