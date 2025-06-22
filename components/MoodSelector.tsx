'use client'

import { useState } from 'react'
import { MoodTag, MOOD_TAGS } from '@/lib/types'
import { getMoodColor } from '@/lib/utils'

interface MoodSelectorProps {
    selectedMood: MoodTag | null
    onMoodSelect: (mood: MoodTag) => void
    className?: string
}

export default function MoodSelector({ selectedMood, onMoodSelect, className = '' }: MoodSelectorProps) {
    return (
        <div className={`space-y-3 ${className}`}>
            <h3 className="text-sm font-medium text-gray-700 mb-3">
                选择你的心情 <span className="text-gray-400">(可选)</span>
            </h3>

            <div className="grid grid-cols-4 gap-2">
                {MOOD_TAGS.map((mood) => {
                    const isSelected = selectedMood?.value === mood.value
                    const colorClasses = getMoodColor(mood.value)

                    return (
                        <button
                            key={mood.value}
                            onClick={() => onMoodSelect(mood)}
                            className={`
                flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200
                hover:scale-105 hover:shadow-md
                ${isSelected
                                    ? `${colorClasses} border-opacity-50 shadow-md`
                                    : 'bg-white border-gray-200 hover:border-gray-300'
                                }
              `}
                        >
                            <span className="text-2xl mb-1">{mood.emoji}</span>
                            <span className={`text-xs font-medium ${isSelected ? '' : 'text-gray-600'}`}>
                                {mood.label}
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
} 