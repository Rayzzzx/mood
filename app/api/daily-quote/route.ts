import { NextRequest, NextResponse } from 'next/server'
import { getToday, generateId } from '@/lib/utils'

// 预设语录库
const QUOTES_POOL = [
    { content: '每一个不曾起舞的日子，都是对生命的辜负。', author: '尼采' },
    { content: '世界以痛吻我，要我报之以歌。', author: '泰戈尔' },
    { content: '当你凝视深渊时，深渊也在凝视着你。', author: '尼采' },
    { content: '生活不是等待暴风雨过去，而是要学会在雨中跳舞。', author: '佚名' },
    { content: '人生如茶，不会苦一辈子，但总会苦一阵子。', author: '佚名' },
    { content: '你现在的气质里，藏着你走过的路、读过的书和爱过的人。', author: '佚名' },
    { content: '不要为已消逝之年华叹息，必须正视匆匆溜走的时光。', author: '布莱希特' },
    { content: '所有的大人都曾经是小孩，虽然只有少数的人记得。', author: '小王子' },
    { content: '黑夜给了我黑色的眼睛，我却用它寻找光明。', author: '顾城' },
    { content: '在最深的绝望里，遇见最美丽的风景。', author: '几米' },
    { content: '你的善良必须有点锋芒，不然就等于零。', author: '佚名' },
    { content: '愿你历尽千帆，归来仍是少年。', author: '佚名' },
    { content: '山川是不卷收的文章，日月为你掌灯伴读。', author: '简媜' },
    { content: '凡是过往，皆为序章。', author: '莎士比亚' },
    { content: '生活总是让我们遍体鳞伤，但到后来，那些受伤的地方一定会变成我们最强壮的地方。', author: '海明威' },
    { content: '要么庸俗，要么孤独。', author: '叔本华' },
    { content: '心有多大，舞台就有多大。', author: '佚名' },
    { content: '人间不值得，但你值得。', author: '佚名' },
    { content: '慢慢来，谁还没有一个努力的过程。', author: '佚名' },
    { content: '星光不问赶路人，时光不负有心人。', author: '佚名' },
]

export async function GET(request: NextRequest) {
    try {
        const today = getToday()

        // 基于日期生成随机种子，确保同一天返回相同的语录
        const dateNumber = parseInt(today.replace(/-/g, ''))
        const randomIndex = dateNumber % QUOTES_POOL.length

        const selectedQuote = QUOTES_POOL[randomIndex]

        const quote = {
            id: generateId(),
            content: selectedQuote.content,
            author: selectedQuote.author,
            date: today,
            liked: false
        }

        return NextResponse.json(quote)

    } catch (error) {
        console.error('Daily Quote Error:', error)

        return NextResponse.json(
            { error: '获取每日语录失败' },
            { status: 500 }
        )
    }
} 