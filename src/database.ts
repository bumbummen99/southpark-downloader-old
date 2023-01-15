import axios from 'axios'
import { existsSync, readFileSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import EpisodeFilter from './episode-filter'
import { depsDir } from './util'

export default class Database {
  static baseURL = 'https://bumbummen99.github.io/southpark-downloader/database.json'

  private data: Episode[] = []

  constructor() {
    this.data = JSON.parse(readFileSync(resolve(depsDir(), 'database.json')).toString())
  }

  /**
   * Loads the database from the JSON datafile.
   * @param sync Force sync the database with the repository (i.e. update)
   */
  public async load(sync = false): Promise<void> {
    /* Sync database with the repo in case we are forced to or the database does not exist locally */
    if (sync || existsSync('/path/to/database.json')) {
      // Load database from the repository
    }

    /* Load the local database file */
    this.data = JSON.parse(await readFile(resolve('/path/to/database.json'), 'utf-8'))
  }

  public getEpisodes(filters?: EpisodeFilter[]): Episode[] {
    if (filters) {
      /* Filter episodes to those that match any of the provided filters */
      return this.data.filter((episode: Episode) => filters.some((filter: EpisodeFilter) => filter.match(episode)))
    }

    return this.data
  }
}

/**
 * Sync the local database with the database from the GitHub repository
 */
export async function sync(url: string = Database.baseURL): Promise<void> {
  const response = await axios.get(url, {
    responseType: 'json',
  })

  await writeFile(resolve(depsDir(), 'database.json'), JSON.stringify(response.data))
}
