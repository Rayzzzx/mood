'use client'

import { ResponseStyle, RESPONSE_STYLES } from '@/lib/types'

interface StyleSelectorProps {
    selectedStyle: ResponseStyle
    onStyleSelect: (style: ResponseStyle) => void
    className?: string
}

export default function StyleSelector({ selectedStyle, onStyleSelect, className = '' }: StyleSelectorProps) {
    return (
        <div className={`space-y-3 ${className}`}>
            <h3 className="text-sm font-medium text-gray-700 mb-3">
                选择回复风格
            </h3>

            <div className="grid grid-cols-2 gap-3">
                {RESPONSE_STYLES.map((style) => {
                    const isSelected = selectedStyle.value === style.value

                    return (
                        <button
                            key={style.value}
                            onClick={() => onStyleSelect(style)}
                            className={`
                p-4 rounded-lg border-2 text-left transition-all duration-200
                hover:shadow-md hover:scale-105
                ${isSelected
                                    ? 'border-primary-500 bg-primary-50'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }
              `}
                        >
                            <div className="font-medium text-gray-900 mb-1">
                                {style.name}
                            </div>
                            <div className="text-xs text-gray-600">
                                {style.description}
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
} 