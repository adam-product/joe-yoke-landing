import type { GameEntry } from './admin/GamesContext'
import gameImg1 from '@/imports/photo_2026-07-23_20-54-30.jpg'
import gameImg2 from '@/imports/photo_2026-07-23_20-54-27.jpg'
import gameImg3 from '@/imports/photo_2026-07-23_20-54-21.jpg'
import gameImg4 from '@/imports/photo_2026-07-23_20-54-19.jpg'

export const FALLBACK_GAME_IMAGES = [gameImg1, gameImg2, gameImg3, gameImg4]

export function fallbackGameImage(game: Pick<GameEntry, 'id' | 'imageUrl'>): string {
  if (game.imageUrl) return game.imageUrl

  const id = Number(game.id)
  if (!Number.isFinite(id)) return gameImg1

  const index = ((id - 1) % FALLBACK_GAME_IMAGES.length + FALLBACK_GAME_IMAGES.length) % FALLBACK_GAME_IMAGES.length
  return FALLBACK_GAME_IMAGES[index] ?? gameImg1
}
