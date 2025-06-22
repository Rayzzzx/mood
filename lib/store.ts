import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MoodEntry, DailyQuote, ResponseStyle, RESPONSE_STYLES } from './types'

interface MoodStore {
    // 状态
    entries: MoodEntry[]
    dailyQuotes: DailyQuote[]
    currentResponseStyle: ResponseStyle
    isLoading: boolean

    // 操作
    addEntry: (entry: MoodEntry) => void
    removeEntry: (id: string) => void
    getEntriesByDate: (date: string) => MoodEntry[]
    setResponseStyle: (style: ResponseStyle) => void
    addDailyQuote: (quote: DailyQuote) => void
    toggleQuoteLike: (id: string) => void
    setLoading: (loading: boolean) => void
}

export const useMoodStore = create<MoodStore>()(
    persist(
        (set, get) => ({
            // 初始状态
            entries: [],
            dailyQuotes: [],
            currentResponseStyle: RESPONSE_STYLES[0],
            isLoading: false,

            // 操作方法
            addEntry: (entry: MoodEntry) => {
                set((state) => ({
                    entries: [entry, ...state.entries]
                }))
            },

            removeEntry: (id: string) => {
                set((state) => ({
                    entries: state.entries.filter(entry => entry.id !== id)
                }))
            },

            getEntriesByDate: (date: string) => {
                const state = get()
                return state.entries.filter(entry => entry.date === date)
            },

            setResponseStyle: (style: ResponseStyle) => {
                set({ currentResponseStyle: style })
            },

            addDailyQuote: (quote: DailyQuote) => {
                set((state) => {
                    const exists = state.dailyQuotes.some(q => q.date === quote.date)
                    if (exists) return state

                    return {
                        dailyQuotes: [quote, ...state.dailyQuotes]
                    }
                })
            },

            toggleQuoteLike: (id: string) => {
                set((state) => ({
                    dailyQuotes: state.dailyQuotes.map(quote =>
                        quote.id === id ? { ...quote, liked: !quote.liked } : quote
                    )
                }))
            },

            setLoading: (loading: boolean) => {
                set({ isLoading: loading })
            },
        }),
        {
            name: 'mood-storage',
            partialize: (state) => ({
                entries: state.entries,
                dailyQuotes: state.dailyQuotes,
                currentResponseStyle: state.currentResponseStyle,
            }),
        }
    )
) 