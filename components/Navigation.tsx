'use client'

import { useState } from 'react'
import { Heart, MessageCircle, BookOpen, Home } from 'lucide-react'

interface NavigationProps {
    activeTab: string
    onTabChange: (tab: string) => void
}

const TABS = [
    { id: 'home', label: '倾诉', icon: MessageCircle },
    { id: 'diary', label: '日记', icon: BookOpen },
]

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
    return (
        <nav className="bg-white shadow-md rounded-lg p-1 mb-6">
            <div className="flex">
                {TABS.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => onTabChange(id)}
                        className={`
              flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all duration-200
              ${activeTab === id
                                ? 'bg-primary-100 text-primary-700 shadow-sm'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                            }
            `}
                    >
                        <Icon size={18} />
                        <span className="font-medium">{label}</span>
                    </button>
                ))}
            </div>
        </nav>
    )
} 