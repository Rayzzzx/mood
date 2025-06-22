import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const STYLE_PROMPTS = {
    friend: '请以温暖亲切的朋友语气回复，就像好朋友之间的聊天一样自然。',
    counselor: '请以专业的心理咨询师角度回复，提供建设性的建议和理性分析。',
    zen: '请以淡然智慧的佛系语气回复，帮助用户放下执念，看淡得失。',
    gentle: '请以温柔治愈的语气回复，给予温暖的安慰和支持。'
}

export async function POST(request: NextRequest) {
    try {
        const { content, mood, style } = await request.json()

        if (!content || !mood || !style) {
            return NextResponse.json(
                { error: '缺少必要参数' },
                { status: 400 }
            )
        }

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: 'OpenAI API Key 未配置' },
                { status: 500 }
            )
        }

        const stylePrompt = STYLE_PROMPTS[style as keyof typeof STYLE_PROMPTS] || STYLE_PROMPTS.friend

        const systemMessage = `你是一个温暖、善解人意的AI伙伴，专门帮助用户处理情绪和心理状态。

当前用户的情绪状态：${mood.label} ${mood.emoji}

回复要求：
1. ${stylePrompt}
2. 回复要有同理心，真正理解用户的感受
3. 提供实用的建议或安慰
4. 语言要自然、温暖，避免过于正式
5. 长度控制在100-300字之间
6. 不要提及"我是AI"等字眼，让对话更自然
7. 根据情绪适当调整回复的深度和方向

请直接给出回复，不要有多余的解释。`

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: systemMessage
                },
                {
                    role: 'user',
                    content: content
                }
            ],
            max_tokens: 500,
            temperature: 0.8,
        })

        const aiResponse = completion.choices[0]?.message?.content?.trim()

        if (!aiResponse) {
            return NextResponse.json(
                { error: 'AI 回复生成失败' },
                { status: 500 }
            )
        }

        return NextResponse.json({ response: aiResponse })

    } catch (error) {
        console.error('AI Response Error:', error)

        // 如果是 OpenAI API 错误，返回更具体的错误信息
        if (error instanceof Error) {
            return NextResponse.json(
                { error: `AI 服务暂时不可用: ${error.message}` },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { error: 'AI 服务暂时不可用，请稍后重试' },
            { status: 500 }
        )
    }
} 