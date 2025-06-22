import { format, parseISO } from 'date-fns'

export function formatDate(date: string | number | Date, formatStr: string = 'yyyy年MM月dd日'): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
    return format(dateObj, formatStr)
}

export function formatTime(date: string | number | Date): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
    return format(dateObj, 'HH:mm')
}

export function getToday(): string {
    return format(new Date(), 'yyyy-MM-dd')
}

export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function truncateText(text: string, maxLength: number = 100): string {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
}

export function copyToClipboard(text: string): Promise<boolean> {
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(text).then(() => true).catch(() => false)
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        try {
            document.execCommand('copy')
            document.body.removeChild(textArea)
            return Promise.resolve(true)
        } catch (err) {
            document.body.removeChild(textArea)
            return Promise.resolve(false)
        }
    }
}

export function getShareText(content: string, aiResponse: string): string {
    return `💭 ${content.slice(0, 50)}${content.length > 50 ? '...' : ''}

🤖 ${aiResponse.slice(0, 100)}${aiResponse.length > 100 ? '...' : ''}

来自 AI倾诉小站 - 你的情绪记录伙伴`
}

export function validateContent(content: string): { isValid: boolean; error?: string } {
    if (!content.trim()) {
        return { isValid: false, error: '请输入你想说的内容' }
    }

    if (content.length > 1000) {
        return { isValid: false, error: '内容不能超过1000字' }
    }

    return { isValid: true }
}

export function getMoodColor(moodValue: string): string {
    const colorMap: Record<string, string> = {
        happy: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        sad: 'bg-blue-100 text-blue-800 border-blue-200',
        angry: 'bg-red-100 text-red-800 border-red-200',
        anxious: 'bg-purple-100 text-purple-800 border-purple-200',
        tired: 'bg-gray-100 text-gray-800 border-gray-200',
        complex: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        calm: 'bg-green-100 text-green-800 border-green-200',
        wronged: 'bg-pink-100 text-pink-800 border-pink-200',
    }

    return colorMap[moodValue] || 'bg-gray-100 text-gray-800 border-gray-200'
} 