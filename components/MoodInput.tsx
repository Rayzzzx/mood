'use client'

import { useState } from 'react'
import { Send, Loader } from 'lucide-react'
import { useMoodStore } from '@/lib/store'
import { MoodTag, ResponseStyle, MOOD_TAGS, RESPONSE_STYLES } from '@/lib/types'
import { validateContent, generateId, getToday } from '@/lib/utils'
import MoodSelector from './MoodSelector'
import StyleSelector from './StyleSelector'
import AIResponse from './AIResponse'

interface MoodInputProps {
    className?: string
}

export default function MoodInput({ className = '' }: MoodInputProps) {
    const { addEntry, currentResponseStyle, setResponseStyle, isLoading, setLoading } = useMoodStore()

    const [content, setContent] = useState('')
    const [selectedMood, setSelectedMood] = useState<MoodTag | null>(null)
    const [currentEntry, setCurrentEntry] = useState<any>(null)
    const [error, setError] = useState('')

    const handleSubmit = async () => {
        // 验证内容
        const validation = validateContent(content)
        if (!validation.isValid) {
            setError(validation.error || '')
            return
        }

        // 如果没有选择心情，使用默认的"复杂"心情
        const mood = selectedMood || MOOD_TAGS.find(m => m.value === 'complex')!

        setError('')
        setLoading(true)

        try {
            // 调用AI接口
            const response = await fetch('/api/ai-response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content,
                    mood,
                    style: currentResponseStyle.value,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'AI回复生成失败')
            }

            // 创建新的条目
            const newEntry = {
                id: generateId(),
                content,
                mood,
                aiResponse: data.response,
                responseStyle: currentResponseStyle,
                timestamp: Date.now(),
                date: getToday(),
            }

            // 保存到存储
            addEntry(newEntry)
            setCurrentEntry(newEntry)

            // 重置表单
            setContent('')
            setSelectedMood(null)

        } catch (error) {
            console.error('Submit error:', error)
            setError(error instanceof Error ? error.message : 'AI服务暂时不可用，请稍后重试')
        } finally {
            setLoading(false)
        }
    }

    const handleRegenerate = async () => {
        if (!currentEntry) return

        setLoading(true)
        try {
            const response = await fetch('/api/ai-response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: currentEntry.content,
                    mood: currentEntry.mood,
                    style: currentResponseStyle.value,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'AI回复生成失败')
            }

            // 更新当前条目的AI回复
            const updatedEntry = {
                ...currentEntry,
                aiResponse: data.response,
                responseStyle: currentResponseStyle,
            }

            setCurrentEntry(updatedEntry)

        } catch (error) {
            console.error('Regenerate error:', error)
            setError(error instanceof Error ? error.message : 'AI服务暂时不可用，请稍后重试')
        } finally {
            setLoading(false)
        }
    }

    const handleNewEntry = () => {
        setCurrentEntry(null)
        setContent('')
        setSelectedMood(null)
        setError('')
    }

    return (
        <div className={`space-y-6 ${className}`}>
            {!currentEntry ? (
                // 输入界面
                <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
                    {/* 标题 */}
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">
                            🧠 AI 倾诉小站
                        </h1>
                        <p className="text-gray-600">
                            在这里安全地倾诉你的情绪，AI会温暖地回应你
                        </p>
                    </div>

                    {/* 文本输入 */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">
                            想说点什么？
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="分享你的心情、困扰或者任何想说的话..."
                            className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                            rows={6}
                            maxLength={1000}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>匿名安全，仅本地存储</span>
                            <span>{content.length}/1000</span>
                        </div>
                    </div>

                    {/* 心情选择 */}
                    <MoodSelector
                        selectedMood={selectedMood}
                        onMoodSelect={setSelectedMood}
                    />

                    {/* 回复风格选择 */}
                    <StyleSelector
                        selectedStyle={currentResponseStyle}
                        onStyleSelect={setResponseStyle}
                    />

                    {/* 错误信息 */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    {/* 提交按钮 */}
                    <button
                        onClick={handleSubmit}
                        disabled={!content.trim() || isLoading}
                        className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader size={18} className="animate-spin" />
                                AI正在生成回复...
                            </>
                        ) : (
                            <>
                                <Send size={18} />
                                倾诉给AI
                            </>
                        )}
                    </button>

                    <div className="text-center text-xs text-gray-500">
                        <p>💡 本服务仅供情绪倾诉，不提供专业医疗建议</p>
                    </div>
                </div>
            ) : (
                // 结果展示界面
                <div className="space-y-6">
                    <AIResponse
                        entry={currentEntry}
                        onRegenerate={handleRegenerate}
                        isRegenerating={isLoading}
                    />

                    {/* 操作按钮 */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleNewEntry}
                            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                        >
                            继续倾诉
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
} 