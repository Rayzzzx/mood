import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: '🧠 AI 倾诉 - 你的情绪记录小站',
    description: '一个温暖、安全的空间，让AI陪伴你倾诉情绪，记录心情变化',
    keywords: ['AI倾诉', '情绪记录', '心理健康', '情绪日记', '心情分享'],
    authors: [{ name: 'Mood AI Team' }],
    openGraph: {
        title: '🧠 AI 倾诉 - 你的情绪记录小站',
        description: '一个温暖、安全的空间，让AI陪伴你倾诉情绪，记录心情变化',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh-CN">
            <body className={inter.className}>
                <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                    {children}
                </div>
            </body>
        </html>
    )
} 