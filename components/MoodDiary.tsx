'use client'

import { useState, useMemo } from 'react'
import { Calendar, Trash2, Filter } from 'lucide-react'
import { useMoodStore } from '@/lib/store'
import { formatDate, getMoodColor } from '@/lib/utils'
import { MOOD_TAGS } from '@/lib/types'
import AIResponse from './AIResponse'

export default function MoodDiary() {
    const { entries, removeEntry } = useMoodStore()
    const [selectedMoodFilter, setSelectedMoodFilter] = useState<string>('all')
    const [selectedEntry, setSelectedEntry] = useState<string | null>(null)

    // 按日期分组的条目
    const groupedEntries = useMemo(() => {
        const filtered = selectedMoodFilter === 'all'
            ? entries
            : entries.filter(entry => entry.mood.value === selectedMoodFilter)

        const groups: { [date: string]: typeof entries } = {}

        filtered.forEach(entry => {
            if (!groups[entry.date]) {
                groups[entry.date] = []
            }
            groups[entry.date].push(entry)
        })

        // 按日期排序（最新的在前）
        const sortedDates = Object.keys(groups).sort((a, b) => b.localeCompare(a))

        return sortedDates.map(date => ({
            date,
            entries: groups[date].sort((a, b) => b.timestamp - a.timestamp)
        }))
    }, [entries, selectedMoodFilter])

    const handleDelete = (id: string) => {
        if (confirm('确定要删除这条记录吗？')) {
            removeEntry(id)
            if (selectedEntry === id) {
                setSelectedEntry(null)
            }
        }
    }

    const toggleEntry = (id: string) => {
        setSelectedEntry(selectedEntry === id ? null : id)
    }

    if (entries.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-gray-400 mb-4">
                    <Calendar size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                    还没有情绪记录
                </h3>
                <p className="text-gray-500">
                    开始倾诉你的心情，AI会陪伴你记录每一刻的情绪变化
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* 筛选器 */}
            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Filter size={16} />
                    <span className="text-sm font-medium text-gray-700">筛选心情</span>
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedMoodFilter('all')}
                        className={`px-3 py-1 text-xs rounded-full border transition-colors ${selectedMoodFilter === 'all'
                                ? 'bg-primary-100 border-primary-300 text-primary-800'
                                : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        全部
                    </button>

                    {MOOD_TAGS.map(mood => (
                        <button
                            key={mood.value}
                            onClick={() => setSelectedMoodFilter(mood.value)}
                            className={`px-3 py-1 text-xs rounded-full border transition-colors flex items-center gap-1 ${selectedMoodFilter === mood.value
                                    ? getMoodColor(mood.value).replace('bg-', 'bg-').replace('text-', 'text-').replace('border-', 'border-')
                                    : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <span>{mood.emoji}</span>
                            <span>{mood.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 日记条目 */}
            <div className="space-y-6">
                {groupedEntries.map(({ date, entries: dayEntries }) => (
                    <div key={date} className="space-y-3">
                        <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                            {formatDate(date)}
                        </h2>

                        <div className="space-y-3">
                            {dayEntries.map(entry => (
                                <div key={entry.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    {/* 条目摘要 */}
                                    <div
                                        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => toggleEntry(entry.id)}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-lg">{entry.mood.emoji}</span>
                                                    <span className={`text-xs px-2 py-1 rounded-full ${getMoodColor(entry.mood.value)}`}>
                                                        {entry.mood.label}
                                                    </span>
                                                    <span className="text-xs text-gray-400">
                                                        {new Date(entry.timestamp).toLocaleTimeString()}
                                                    </span>
                                                </div>

                                                <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                                                    {entry.content}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2 ml-4">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleDelete(entry.id)
                                                    }}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 展开的详细内容 */}
                                    {selectedEntry === entry.id && (
                                        <div className="border-t border-gray-100 p-4">
                                            <AIResponse entry={entry} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
} 