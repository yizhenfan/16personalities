// 标准题库 - 每个维度15道题，共60题 (经典版)
const simpleQuestions = [
    // 外向(E) vs 内向(I) 维度题目 - 15题
    {
        text: "我在社交聚会中感到精力充沛",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我更喜欢一对一的深入交谈，而不是群体讨论",
        dimension: "EI", 
        direction: "I"
    },
    {
        text: "我很容易与陌生人开始对话",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "长时间的社交活动会让我感到疲惫",
        dimension: "EI",
        direction: "I"
    },
    {
        text: "我喜欢成为众人关注的焦点",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我需要安静的时间来恢复精力",
        dimension: "EI",
        direction: "I"
    },
    {
        text: "我在团队工作中表现最佳",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我更喜欢通过书面方式而非口头交流",
        dimension: "EI",
        direction: "I"
    },
    {
        text: "我喜欢参加大型聚会和活动",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我有一个小而亲密的朋友圈",
        dimension: "EI",
        direction: "I"
    },
    {
        text: "我通过与他人交谈来整理我的想法",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我在做决定前喜欢独自思考",
        dimension: "EI",
        direction: "I"
    },
    {
        text: "我在群体讨论中经常发言",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我喜欢在开始新项目前仔细规划",
        dimension: "EI",
        direction: "I"
    },
    {
        text: "我喜欢外出社交而不是独自在家",
        dimension: "EI",
        direction: "E"
    },

    // 实感(S) vs 直觉(N) 维度题目 - 15题
    {
        text: "我更关注事实和细节，而非可能性",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我经常思考未来的可能性",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我注重实际应用而非抽象理论",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我喜欢按照既定的步骤和程序工作",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我更愿意创新而非改进现有方法",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我经常有新的想法和灵感",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我喜欢处理具体的、有形的事物",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我容易看到事物之间的联系和模式",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我相信经验胜过直觉",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我喜欢探索新的概念和理论",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我更关注现在而非未来",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我经常从不同角度看待问题",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我喜欢使用经过验证的方法",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我对可能发生的事情有很多想象",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我重视准确性和精确性",
        dimension: "SN",
        direction: "S"
    },

    // 思考(T) vs 情感(F) 维度题目 - 15题
    {
        text: "我主要基于逻辑分析做决定",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我在做决定时会考虑对他人的影响",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我认为客观性比和谐更重要",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我努力维护人际关系的和谐",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我更愿意给出诚实的批评而非善意的谎言",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我很容易感受到他人的情绪",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我在冲突中保持理性和客观",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我重视同情心和理解力",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我认为效率比人际关系更重要",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我经常站在他人的角度考虑问题",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我更关注事实而非感受",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我在做决定时会考虑个人价值观",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我认为公平比仁慈更重要",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我容易被他人的痛苦所感动",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我喜欢分析问题的原因而非情感反应",
        dimension: "TF",
        direction: "T"
    },

    // 判断(J) vs 知觉(P) 维度题目 - 15题
    {
        text: "我喜欢提前制定详细的计划",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我更愿意保持选择的灵活性",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "我喜欢有序和结构化的环境",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我喜欢按时完成任务",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我在截止日期前工作得最好",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "我喜欢即兴发挥和适应变化",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "我会立即整理杂乱的空间",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我享受探索意外的机会",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "我喜欢制定时间表并遵守它",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我更喜欢开放式的结局而非确定的结论",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "未完成的任务会让我感到不安",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我喜欢同时进行多个项目",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "我认为准时是对他人的尊重",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我经常改变我的计划以适应新情况",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "我喜欢有明确的目标和期限",
        dimension: "JP",
        direction: "J"
    }
];

// 复杂题库 - 完整版120题，每个维度30题
const complexQuestions = [
    // 外向(E) vs 内向(I) 维度题目 - 30题
    {
        text: "我在社交聚会中感到精力充沛",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我更喜欢一对一的深入交谈，而不是群体讨论",
        dimension: "EI", 
        direction: "I"
    },
    {
        text: "我通常是第一个在新环境中主动与他人交谈的人",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "长时间的社交活动会让我感到疲惫",
        dimension: "EI",
        direction: "I"
    },
    {
        text: "我喜欢成为众人关注的焦点",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我需要安静的时间来恢复精力",
        dimension: "EI",
        direction: "I"
    },
    {
        text: "我在团队工作中表现最佳",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我更喜欢通过书面方式而非口头交流",
        dimension: "EI",
        direction: "I"
    },
    {
        text: "我很容易与陌生人开始对话",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我在做决定前喜欢独自思考",
        dimension: "EI",
        direction: "I"
    },
    {
        text: "我喜欢参加大型聚会和活动",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我有一个小而亲密的朋友圈",
        dimension: "EI",
        direction: "I"
    },
    {
        text: "我通过与他人交谈来整理我的想法",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我喜欢在开始新项目前仔细规划",
        dimension: "EI",
        direction: "I"
    },
    {
        text: "我在群体讨论中经常发言",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我更倾向于观察而非参与社交互动",
        dimension: "EI",
        direction: "I"
    },
    {
        text: "我喜欢在会议中主动分享我的想法",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我在嘈杂的环境中难以集中注意力",
        dimension: "EI",
        direction: "I"
    },
    {
        text: "我享受在公众场合发表演讲或表演",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我更喜欢通过观察来了解他人，而非直接询问",
        dimension: "EI",
        direction: "I"
    },
    {
        text: "我在社交场合中主动介绍自己给他人",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我觉得独处时思考更清晰",
        dimension: "EI",
        direction: "I"
    },
    {
        text: "我喜欢组织聚会和活动",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我在做重要决定时需要充分的独处时间",
        dimension: "EI",
        direction: "I"
    },
    {
        text: "我能够轻松地在多个对话间切换",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我倾向于将感受和想法保留在内心",
        dimension: "EI",
        direction: "I"
    },
    {
        text: "我喜欢与许多不同的人建立联系",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我更愿意深入了解少数几个人",
        dimension: "EI",
        direction: "I"
    },
    {
        text: "我在解决问题时喜欢大声讨论",
        dimension: "EI",
        direction: "E"
    },
    {
        text: "我更喜欢在安静的环境中工作和学习",
        dimension: "EI",
        direction: "I"
    },

    // 实感(S) vs 直觉(N) 维度题目 - 30题
    {
        text: "我更关注事实和细节，而非可能性",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我经常思考未来的可能性",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我喜欢按照既定的步骤和程序工作",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我更愿意创新而非改进现有方法",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我注重实际应用而非抽象理论",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我经常有新的想法和灵感",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我喜欢处理具体的、有形的事物",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我容易看到事物之间的联系和模式",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我相信经验胜过直觉",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我喜欢探索新的概念和理论",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我更关注现在而非未来",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我经常从不同角度看待问题",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我喜欢使用经过验证的方法",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我对可能发生的事情有很多想象",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我重视准确性和精确性",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我喜欢思考抽象的概念和哲学问题",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我更信任可观察和可测量的信息",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我经常想到一些看似不相关的创意想法",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我喜欢循序渐进地学习新技能",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我对未来趋势和发展方向很敏感",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我更重视实际结果而非潜在可能",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我喜欢探讨事物背后的深层含义",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我更愿意完善现有的系统而非创造新的",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我经常产生突破性的想法和洞察",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我注重细节的准确性和完整性",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我喜欢思考复杂的理论模型",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我倾向于关注当下的实际需求",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我能够预见事物的发展趋势",
        dimension: "SN",
        direction: "N"
    },
    {
        text: "我喜欢按部就班地完成任务",
        dimension: "SN",
        direction: "S"
    },
    {
        text: "我更感兴趣于事物的潜在可能性",
        dimension: "SN",
        direction: "N"
    },

    // 思考(T) vs 情感(F) 维度题目 - 30题
    {
        text: "我主要基于逻辑分析做决定",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我在做决定时会考虑对他人的影响",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我认为客观性比和谐更重要",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我努力维护人际关系的和谐",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我更愿意给出诚实的批评而非善意的谎言",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我很容易感受到他人的情绪",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我在冲突中保持理性和客观",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我重视同情心和理解力",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我认为效率比人际关系更重要",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我经常站在他人的角度考虑问题",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我更关注事实而非感受",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我在做决定时会考虑个人价值观",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我认为公平比仁慈更重要",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我容易被他人的痛苦所感动",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我喜欢分析问题的原因而非情感反应",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我会优先考虑团队成员的感受和需求",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我更注重制定明确的标准和规则",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我倾向于通过赞扬来激励他人",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我在评估情况时重视数据和证据",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我很在意自己的行为是否会伤害到他人",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我更愿意直接指出错误而不顾及面子",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我喜欢营造温馨和支持的环境",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我认为原则比个人情感更重要",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我擅长察觉和回应他人的情感需求",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我更重视系统性的分析方法",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我在做决定时会考虑对人际关系的长远影响",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我倾向于基于逻辑推理来解决问题",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我认为维护团队凝聚力非常重要",
        dimension: "TF",
        direction: "F"
    },
    {
        text: "我更注重结果的合理性而非过程中的人际感受",
        dimension: "TF",
        direction: "T"
    },
    {
        text: "我喜欢帮助他人发挥潜力和实现目标",
        dimension: "TF",
        direction: "F"
    },

    // 判断(J) vs 知觉(P) 维度题目 - 30题
    {
        text: "我喜欢提前制定详细的计划",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我更愿意保持选择的灵活性",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "我喜欢按时完成任务",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我在截止日期前工作得最好",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "我喜欢有序和结构化的环境",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我喜欢即兴发挥和适应变化",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "我会立即整理杂乱的空间",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我享受探索意外的机会",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "我喜欢制定时间表并遵守它",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我更喜欢开放式的结局而非确定的结论",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "未完成的任务会让我感到不安",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我喜欢同时进行多个项目",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "我认为准时是对他人的尊重",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我经常改变我的计划以适应新情况",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "我喜欢有明确的目标和期限",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我更愿意等到最后一刻再做出决定",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "我倾向于尽早完成任务以避免压力",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我享受在压力下工作带来的刺激感",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "我喜欢建立并遵循日常例行公事",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我更喜欢根据当下的心情来安排活动",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "我认为完成比完美更重要",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我喜欢保持多种选择开放直到最后",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "我更愿意有序地处理事务而不是临时应对",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我发现变化和不确定性令人兴奋",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "我喜欢为长期目标制定具体的行动计划",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我倾向于收集更多信息而推迟做决定",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "我认为制定规则和流程有助于提高效率",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我更愿意适应环境而非改变环境",
        dimension: "JP",
        direction: "P"
    },
    {
        text: "我喜欢在开始新项目前完成当前的工作",
        dimension: "JP",
        direction: "J"
    },
    {
        text: "我倾向于探索多种可能性而非专注于一个方向",
        dimension: "JP",
        direction: "P"
    }
];

// 默认使用复杂题库，可通过 setQuestionMode 函数切换
let questions = complexQuestions;

// 切换题库模式的函数
function setQuestionMode(mode) {
    if (mode === 'simple') {
        questions = simpleQuestions;
    } else {
        questions = complexQuestions;
    }
    return questions;
}