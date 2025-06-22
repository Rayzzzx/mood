'use client'

import { useState, useEffect } from 'react'
import { Heart, Share, Copy, RefreshCw } from 'lucide-react'
import { useMoodStore } from '@/lib/store'
import { DailyQuote as DailyQuoteType } from '@/lib/types'
import { copyToClipboard, getToday } from '@/lib/utils'

interface DailyQuoteProps {
    className?: string
}

export default function DailyQuote({ className = '' }: DailyQuoteProps) {
    const { dailyQuotes, addDailyQuote, toggleQuoteLike } = useMoodStore()
    const [currentQuote, setCurrentQuote] = useState<DailyQuoteType | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [copied, setCopied] = useState(false)

    const today = getToday()

    // 获取今日语录
    const fetchTodayQuote = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/daily-quote')
            const quote = await response.json()

            if (response.ok) {
                setCurrentQuote(quote)
                addDailyQuote(quote)
            }
        } catch (error) {
            console.error('Failed to fetch daily quote:', error)
        } finally {
            setIsLoading(false)
        }
    }

    // 检查是否已有今日语录
    useEffect(() => {
        const todayQuote = dailyQuotes.find(quote => quote.date === today)
        if (todayQuote) {
            setCurrentQuote(todayQuote)
        } else {
            fetchTodayQuote()
        }
    }, [today, dailyQuotes])

    const handleLike = () => {
        if (currentQuote) {
            toggleQuoteLike(currentQuote.id)
            setCurrentQuote(prev => prev ? { ...prev, liked: !prev.liked } : null)
        }
    }

    const handleCopy = async () => {
        if (currentQuote) {
            const text = `${currentQuote.content}${currentQuote.author ? ` —— ${currentQuote.author}` : ''}\n\n来自 AI倾诉小站 每日语录`
            const success = await copyToClipboard(text)
            if (success) {
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            }
        }
    }

    const handleShare = async () => {
        if (!currentQuote) return

        const shareText = `${currentQuote.content}${currentQuote.author ? ` —— ${currentQuote.author}` : ''}\n\n来自 AI倾诉小站 每日语录`

        if (navigator.share) {
            try {
                await navigator.share({
                    title: '每日语录分享',
                    text: shareText,
                })
            } catch (err) {
                // 用户取消分享
            }
        } else {
            await copyToClipboard(shareText)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    if (isLoading) {
        return (
            <div className={`bg-gradient-to-br from-warm-50 to-warm-100 rounded-lg shadow-md p-6 ${className}`}>
                <div className="animate-pulse">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 bg-warm-200 rounded"></div>
                        <div className="w-20 h-4 bg-warm-200 rounded"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="w-full h-4 bg-warm-200 rounded"></div>
                        <div className="w-3/4 h-4 bg-warm-200 rounded"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (!currentQuote) {
        return (
            <div className={`bg-gradient-to-br from-warm-50 to-warm-100 rounded-lg shadow-md p-6 text-center ${className}`}>
                <p className="text-warm-600 mb-4">加载每日语录失败</p>
                <button
                    onClick={fetchTodayQuote}
                    className="text-warm-700 hover:text-warm-800 transition-colors text-sm flex items-center gap-2 mx-auto"
                >
                    <RefreshCw size={16} />
                    重试
                </button>
            </div>
        )
    }

    return (
        <div className={`bg-gradient-to-br from-warm-50 to-warm-100 rounded-lg shadow-md p-6 ${className}`}>
            {/* 标题 */}
            <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">✨</span>
                <h3 className="text-sm font-medium text-warm-800">每日一句</h3>
            </div>

            {/* 语录内容 */}
            <blockquote className="text-gray-800 text-lg leading-relaxed mb-4 font-medium">
                "{currentQuote.content}"
            </blockquote>

            {/* 作者 */}
            {currentQuote.author && (
                <div className="text-right text-warm-600 text-sm mb-4">
                    —— {currentQuote.author}
                </div>
            )}

            {/* 操作按钮 */}
            <div className="flex items-center justify-between pt-4 border-t border-warm-200">
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-2 text-sm transition-colors ${currentQuote.liked
                                ? 'text-red-500 hover:text-red-600'
                                : 'text-gray-500 hover:text-red-500'
                            }`}
                    >
                        <Heart size={16} fill={currentQuote.liked ? 'currentColor' : 'none'} />
                        {currentQuote.liked ? '已收藏' : '收藏'}
                    </button>

                    <button
                        onClick={handleCopy}
                        disabled={copied}
                        className="flex items-center gap-2 text-gray-500 hover:text-warm-600 transition-colors text-sm"
                    >
                        <Copy size={16} />
                        {copied ? '已复制' : '复制'}
                    </button>

                    <button
                        onClick={handleShare}
                        className="flex items-center gap-2 text-gray-500 hover:text-warm-600 transition-colors text-sm"
                    >
                        <Share size={16} />
                        分享
                    </button>
                </div>

                <div className="text-xs text-warm-500">
                    {today}
                </div>
            </div>
        </div>
    )
} 