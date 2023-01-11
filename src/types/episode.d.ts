declare type Episode = {
    season: number
    index: number
    thumbnail?: string,
    languages: {
        [any: string]: {
            url: string
            name: string
        }
    }
}
