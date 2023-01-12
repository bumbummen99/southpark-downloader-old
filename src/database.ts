import axios from "axios"
import {readFileSync} from "fs"
import {writeFile} from "fs/promises"
import {resolve} from "path"
import {Episode} from "./types/Episode"
import {depsDir} from "./Util"

export default class Database {
  static baseURL = 'https://bumbummen99.github.io/southpark-downloader/database.json'

  private data: Episode[] = []

  constructor() {
    this.data = JSON.parse(readFileSync(resolve(depsDir(), 'database.json')).toString())
  }

  getEpisodes(filter?: EpisodesFilter): Episode[] {
    return filter ? this.data.filter((value, index, array) => filter(value, index, array)) : this.data
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
