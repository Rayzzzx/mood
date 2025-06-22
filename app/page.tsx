'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import MoodInput from '@/components/MoodInput'
import MoodDiary from '@/components/MoodDiary'
import DailyQuote from '@/components/DailyQuote'

export default function Home() {
    const [activeTab, setActiveTab] = useState('home')
    const [mounted, setMounted] = useState(false)

    // 防止服务端渲染不一致
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-gray-500">Loading...</div>
            </div>
        )
    }

    return (
        <main className="min-h-screen p-4">
            <div className="max-w-2xl mx-auto">
                {/* 导航 */}
                <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

                {/* 每日语录 - 在所有页面都显示 */}
                <DailyQuote className="mb-6" />

                {/* 主要内容区域 */}
                <div className="fade-in">
                    {activeTab === 'home' && <MoodInput />}
                    {activeTab === 'diary' && <MoodDiary />}
                </div>

                {/* 页脚 */}
                <footer className="mt-12 text-center text-gray-500 text-sm">
                    <div className="border-t border-gray-200 pt-6">
                        <p className="mb-2">
                            🧠 AI 倾诉小站 - 你的情绪记录伙伴
                        </p>
                        <div className="flex items-center justify-center gap-4 text-xs">
                            <span>💝 温暖陪伴</span>
                            <span>🔒 隐私保护</span>
                            <span>📝 记录成长</span>
                        </div>
                        <p className="mt-3 text-xs text-gray-400">
                            ⚠️ 本服务仅供情绪倾诉和记录，不提供专业心理治疗建议
                        </p>
                    </div>
                </footer>
            </div>
        </main>
    )
} 