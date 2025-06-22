export interface MoodEntry {
    id: string
    content: string
    mood: MoodTag
    aiResponse: string
    responseStyle: ResponseStyle
    timestamp: number
    date: string
}

export interface MoodTag {
    emoji: string
    label: string
    value: string
}

export interface ResponseStyle {
    name: string
    description: string
    value: string
}

export interface DailyQuote {
    id: string
    content: string
    author?: string
    date: string
    liked: boolean
}

export const MOOD_TAGS: MoodTag[] = [
    { emoji: '😔', label: '悲伤', value: 'sad' },
    { emoji: '😡', label: '生气', value: 'angry' },
    { emoji: '😟', label: '焦虑', value: 'anxious' },
    { emoji: '😊', label: '开心', value: 'happy' },
    { emoji: '😴', label: '疲惫', value: 'tired' },
    { emoji: '😶', label: '复杂', value: 'complex' },
    { emoji: '😌', label: '平静', value: 'calm' },
    { emoji: '🥺', label: '委屈', value: 'wronged' },
]

export const RESPONSE_STYLES: ResponseStyle[] = [
    {
        name: '朋友语气',
        description: '温暖亲切，像好朋友一样聊天',
        value: 'friend'
    },
    {
        name: '心理咨询师',
        description: '专业理性，提供建设性建议',
        value: 'counselor'
    },
    {
        name: '佛系语气',
        description: '淡然智慧，帮助放下执念',
        value: 'zen'
    },
    {
        name: '温柔治愈',
        description: '柔和安慰，给予温暖支持',
        value: 'gentle'
    }
] 