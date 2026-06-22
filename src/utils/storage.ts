export type StorageDriver = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

export const isBrowser = (): boolean =>
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

export const storageFallback: StorageDriver = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
}

export const getPersistentStorage = (): StorageDriver =>
  isBrowser() ? window.localStorage : storageFallback

export function loadJSON<T>(key: string, fallback: T): T {
  if (!isBrowser()) {
    return fallback
  }

  try {
    const stored = window.localStorage.getItem(key)
    return stored ? (JSON.parse(stored) as T) : fallback
  } catch {
    return fallback
  }
}

export function saveJSON(key: string, value: unknown): void {
  if (!isBrowser()) {
    return
  }

  window.localStorage.setItem(key, JSON.stringify(value))
}

export function removeJSON(key: string): void {
  if (!isBrowser()) {
    return
  }

  window.localStorage.removeItem(key)
}
