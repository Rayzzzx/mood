'use client'

import { useState } from 'react'
import { Copy, Share, Heart, RefreshCw } from 'lucide-react'
import { copyToClipboard, getShareText } from '@/lib/utils'
import { MoodEntry } from '@/lib/types'

interface AIResponseProps {
    entry: MoodEntry
    onRegenerate?: () => void
    isRegenerating?: boolean
    className?: string
}

export default function AIResponse({ entry, onRegenerate, isRegenerating = false, className = '' }: AIResponseProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        const success = await copyToClipboard(entry.aiResponse)
        if (success) {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const handleShare = async () => {
        const shareText = getShareText(entry.content, entry.aiResponse)

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'AI倾诉分享',
                    text: shareText,
                })
            } catch (err) {
                // 如果用户取消分享，不做任何操作
            }
        } else {
            // 降级到复制到剪贴板
            await copyToClipboard(shareText)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className={`bg-white rounded-lg shadow-md p-6 space-y-4 fade-in ${className}`}>
            {/* 原始内容 */}
            <div className="border-l-4 border-gray-200 pl-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{entry.mood.emoji}</span>
                    <span className="text-sm text-gray-600">你说：</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                    {entry.content}
                </p>
            </div>

            {/* AI回复 */}
            <div className="border-l-4 border-primary-200 pl-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🤖</span>
                    <span className="text-sm text-gray-600">AI回复：</span>
                    <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                        {entry.responseStyle.name}
                    </span>
                </div>
                <p className="text-gray-800 leading-relaxed">
                    {entry.aiResponse}
                </p>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleCopy}
                        disabled={copied}
                        className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors text-sm"
                    >
                        <Copy size={16} />
                        {copied ? '已复制' : '复制'}
                    </button>

                    <button
                        onClick={handleShare}
                        className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors text-sm"
                    >
                        <Share size={16} />
                        分享
                    </button>

                    {onRegenerate && (
                        <button
                            onClick={onRegenerate}
                            disabled={isRegenerating}
                            className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors text-sm disabled:opacity-50"
                        >
                            <RefreshCw size={16} className={isRegenerating ? 'animate-spin' : ''} />
                            {isRegenerating ? '生成中...' : '重新生成'}
                        </button>
                    )}
                </div>

                <div className="text-xs text-gray-400">
                    {new Date(entry.timestamp).toLocaleString()}
                </div>
            </div>
        </div>
    )
} 