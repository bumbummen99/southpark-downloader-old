import {dirname, join, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

export function rootDir(): string {
  return dirname(fileURLToPath(import.meta.url))
}

export function dataDir(): string {
  return resolve(join(rootDir(), '../data'))
}
