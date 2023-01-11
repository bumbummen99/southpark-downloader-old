import axios from "axios"
import {readFileSync} from "fs"
import {writeFile} from "fs/promises"
import {resolve} from "path"
import {Episode} from "./types/Episode"
import {depsDir} from "./Util"

export default class Database
{
    static baseURL: string = 'https://bumbummen99.github.io/southpark-downloader/database.json'

    private data: Episode[] = []

    constructor() {
        this.data = JSON.parse(readFileSync(resolve(depsDir(), 'database.json')).toString())
    }

    getEpisodes(filter?: EpisodesFilter): Episode[]
    {
        if (filter) {
            return this.data.filter(filter)
        } else {
            return this.data
        }
    }
}

export async function download(url: string = Database.baseURL): Promise<void>
{
    const response = await axios.get(url, {
        responseType: 'json'
    });

    await writeFile(resolve(depsDir(), 'database.json'), JSON.stringify(response.data));
}
