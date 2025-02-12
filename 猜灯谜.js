import plugin from "../../lib/plugins/plugin.js"

export class guessRiddle extends plugin {
  constructor() {
    super({
      name: "元宵猜灯谜",
      dsc: "包含100个原创灯谜的元宵节互动插件",
      event: "message",
      priority: 50,
      rule: [
        { reg: "^#?猜灯谜$", fnc: "startRiddle" },
        { reg: "^#?答案(.+)$", fnc: "checkAnswer" },
        { reg: "^#?(结束灯谜|放弃)$", fnc: "endRiddle" },
        { reg: "^#?灯谜帮助$", fnc: "showHelp" },
        { reg: "^#?查看答案$", fnc: "showAnswer" }
      ]
    });

    // 完整100条灯谜库
    this.riddles = [
      { question: "灯笼高高挂，红红灯笼亮，猜一字", answer: "明" },
      { question: "一月十五夜，天上亮如昼，猜一节日", answer: "元宵节" },
      { question: "两只黄鹂鸣翠柳，一行白鹭上青天，猜一动物", answer: "鱼" },
      { question: "十五月亮当空挂，家中团圆品汤圆，猜一字", answer: "宵" },
      { question: "夜半子时合家欢，此物煮熟桌上端，猜一食品", answer: "元宵" },
      { question: "中间有洞口四方，内含甜蜜馅儿香，打一节日食品", answer: "元宵" },
      { question: "乌云遮月不见光，却见地上灯光煌，猜一元宵活动", answer: "赏花灯" },
      { question: "春风吹开第一枝，元宵佳节闹花灯，打一花卉", answer: "梅花" },
      { question: "圆圆白胖子，黑芝麻做心，沸水洗个澡，浮起笑盈盈", answer: "汤圆" },
      { question: "竹马踉跄冲淖去，纸鸢跋扈挟风鸣，打一传统玩具", answer: "灯笼" },
      { question: "金钩银丝缠玉珠，沸水锅中跳芭蕾，猜一食物", answer: "龙须面" },
      { question: "白胖娃娃泥里藏，腰身细细心眼多，猜一植物", answer: "莲藕" },
      { question: "珍珠白玉板，金砖砌墙垣，猜一建筑样式", answer: "琉璃瓦" },
      { question: "四四方方一座城，城里兵马乱纷纷，猜一传统游戏", answer: "象棋" },
      { question: "身披红战袍，头戴冲天冠，说句话儿震天响，猜一动物", answer: "公鸡" },
      { question: "小时四条腿，长大两条腿，老来三条腿，猜一生物", answer: "人" },
      { question: "有头没有颈，有眼没有眉，猜一水生动物", answer: "鱼" },
      { question: "远看山有色，近听水无声，猜一艺术品", answer: "山水画" },
      { question: "红关公，白刘备，黑张飞，三结义，猜一水果", answer: "荔枝" },
      { question: "麻屋子，红帐子，里面住着白胖子，猜一坚果", answer: "花生" },
      { question: "小小诸葛亮，独坐中军帐，摆下八卦阵，专捉飞来将", answer: "蜘蛛" },
      { question: "青藤挂满棚，小龙倒挂串串铃，猜一蔬菜", answer: "葡萄" },
      { question: "金枝玉叶不沾尘，珍珠玛瑙聚一身，猜一饰品", answer: "项链" },
      { question: "有翅不会飞，没脚走千里，猜一交通工具", answer: "船" },
      { question: "一座七彩桥，雨后挂天边，猜一自然现象", answer: "彩虹" },
      { question: "白娃娃，爬黑墙，越爬个儿越变小，猜一文具", answer: "粉笔" },
      { question: "说它是马不是马，云里穿梭显神威，猜一神兽", answer: "天马" },
      { question: "铜锤子，铁把子，歪头子，黄褂子，猜一水果", answer: "梨" },
      { question: "小时层层包，大时节节高，猜一植物", answer: "竹子" },
      { question: "有眼没有眉，有翅不能飞，浑身亮闪闪，怕旱不怕水", answer: "鱼" },
      { question: "金箍桶，银箍桶，打开来，箍不拢，猜一蛋类", answer: "鸡蛋" },
      { question: "远看像座亭，近看没窗棂，上边直流水，下边有人行", answer: "雨伞" },
      { question: "一对小船，实在能干，白天运人，晚上靠岸", answer: "鞋子" },
      { question: "四角方方，常随常往，伤风咳嗽，数它最忙", answer: "手帕" },
      { question: "半个西瓜皮，口朝上面搁，上头不怕水，下头不怕火", answer: "锅" },
      { question: "中间是火山，四边是大海，海里宝贝多，快快捞上来", answer: "火锅" },
      { question: "红艳艳，飘胸前，像火苗，暖心间", answer: "红领巾" },
      { question: "左边缺一半，右边空一半，合起来正好，猜一字", answer: "缸" },
      { question: "有马能行千里，有土能种庄稼，有人不是你我，猜", answer: "士" },
      { question: "有目共睹，猜一字", answer: "者" },
      { question: "有两个动物，一个在水里，一个在山上，猜一字", answer: "鲜" },
      { question: "身披黄金甲，腹藏珍珠心，元宵时节上桌来，猜一食品", answer: "金丝汤圆" },
      { question: "圆圆小铁饼，天天走不停，猜一物品", answer: "钟表" },
      { question: "头戴红帽子，身穿白袍子，走路摆架子，说话伸脖子", answer: "鹅" },
      { question: "有风不动无风动，不动无风动有风", answer: "扇子" },
      { question: "一间小黑房，不能开门窗，窗儿开一开，见人请进房", answer: "照相机" },
      { question: "会走没有腿，会吃没有嘴，过河没有水，死了没有鬼", answer: "象棋" },
      { question: "一物生来真奇怪，肚子下面长口袋，孩子袋里吃和睡，跑得不快跳得快", answer: "袋鼠" },
      { question: "四四方方一块田，一块一块卖铜钱", answer: "豆腐" },
      { question: "十个客人十间屋，冷了进去暖了出", answer: "手套" },
      { question: "小小两只船，没桨又没帆，白天带它到处走，黑夜停在床跟前", answer: "鞋子" },
      { question: "一本书，天天看，看了一篇撕一篇，一年到头多少天，小书撕下多少篇", answer: "日历" },
      { question: "你哭他也哭，你笑他也笑，脸上脏不脏，看它就知道", answer: "镜子" },
      { question: "哥俩一般高，每天三出操，人人都需要，团结互助好", answer: "筷子" },
      { question: "弯弯一座桥，架在半天腰，七色排得巧，一会不见了", answer: "彩虹" },
      { question: "青色糕，红色糕，不能吃来不能咬，点心铺里买不到，要盖房子少不了", answer: "砖头" },
      { question: "兄弟七八个，围着柱子坐，大家一分手，衣服就扯破", answer: "蒜" },
      { question: "独木造高楼，没瓦没砖头，人在水下走，水在人上流", answer: "雨伞" },
      { question: "身穿大皮袄，野草吃个饱，过了严冬天，献出一身毛", answer: "绵羊" },
      { question: "一个小姑娘，生在水中央，身穿粉红衫，坐在绿船上", answer: "荷花" },
      { question: "颜色白如雪，身子硬如铁，一日洗三遍，夜晚柜中歇", answer: "碗" },
      { question: "有面没有口，有脚没有手，虽有四只脚，自己不会走", answer: "桌子" },
      { question: "白嫩小宝宝，洗澡吹泡泡，洗洗身体小，再洗不见了", answer: "肥皂" },
      { question: "身穿绿衣裳，肚里水汪汪，生的子儿多，个个黑脸膛", answer: "西瓜" },
      { question: "不怕细菌小，有它能看到，化验需要它，科研不可少", answer: "显微镜" },
      { question: "像只大蝎子，抱起似孩子，抓挠肚肠子，唱出好曲子", answer: "琵琶" },
      { question: "圆筒白浆糊，早晚挤一股，兄弟三十二，都说有好处", answer: "牙膏" },
      { question: "上不怕水，下不怕火，家家厨房，都有一个", answer: "锅" },
      { question: "一个老头，不跑不走，请他睡觉，他就摇头", answer: "不倒翁" },
      { question: "大姐用针不用线，二姐用线不用针，三姐点灯不干活，四姐做活不点灯", answer: "蜜蜂、蜘蛛、萤火虫、纺织娘" },
      { question: "驼背公公，力大无穷，爱驮什么？车水马龙", answer: "桥" },
      { question: "头戴红帽子，身披五彩衣，从来不唱戏，喜欢吊嗓子", answer: "公鸡" },
      { question: "先修十字街，在修月花台，身子不用动，口粮自动来", answer: "蜘蛛" },
      { question: "有头没有颈，身上冷冰冰，有翅不能飞，无脚也能行", answer: "鱼" },
      { question: "身披花棉袄，唱歌呱呱叫，田里捉害虫，丰收立功劳", answer: "青蛙" },
      { question: "大姐真漂亮，身穿桔红花衣裳，七颗黑星上面镶，爱吃蚜虫饱肚肠", answer: "七星瓢虫" },
      { question: "腿长胳膊短，眉毛盖着眼，有人不吱声，无人爱叫唤", answer: "蝈蝈" },
      { question: "一顶透明降落伞，随波逐流飘海中，触手有毒蜇人痛，身上小虾当眼睛", answer: "海蜇" },
      { question: "尖尖嘴，细细腿，狡猾多疑拖大尾", answer: "狐狸" },
      { question: "身穿白袍子，头戴红帽子，走路像公子，说话高嗓子", answer: "鹅" },
      { question: "每隔数日脱旧衣，没有脚爪走得急，攀缘树木多轻便，光滑地面步难移", answer: "蛇" },
      { question: "长相俊俏，爱舞爱跳，飞舞花丛，快乐逍遥", answer: "蝴蝶" },
      { question: "尖尖牙齿，大盆嘴，短短腿儿长长尾，捕捉食物流眼泪，人人知它假慈悲", answer: "鳄鱼" },
      { question: "性子像鸭水里游，样子像鸟天上飞，游玩休息成双对，夫妻恩爱永不离", answer: "鸳鸯" },
      { question: "有枪不能放，有脚不能行，天天弯着腰，总在水里游", answer: "虾" },
      { question: "不走光跳，吵吵闹闹，吃虫吃粮，功大过小", answer: "麻雀" },
      { question: "像条带，一盘菜，下了水，跑得快", answer: "带鱼" },
      { question: "背面灰色腹有斑，繁殖习性很罕见，卵蛋产在邻鸟窝，代它孵育自消遣", answer: "杜鹃" },
      { question: "身子黑不溜秋，喜往泥里嬉游，常爱口吐气泡，能够观察气候", answer: "泥鳅" },
      { question: "头戴红缨帽，身穿绿罗袍，背上生双翅，爱脏腿长毛", answer: "苍蝇" },
      { question: "身子轻如燕，飞在天地间，不怕相隔远，也能把话传", answer: "信鸽" },
      { question: "头前两把刀，钻地害禾苗，捕来烘成干，一味利尿药", answer: "蝼蛄" },
      { question: "四蹄飞奔鬃毛抖，拉车驮货多面手，农民夸它好伙伴，骑兵爱它如战友", answer: "马" },
      { question: "头像绵羊颈似鹅，不是牛马不是骡，戈壁滩上万里行，能耐渴来能忍饿", answer: "骆驼" },
      { question: "说它是虎它不像，金钱印在黄袄上，站在山上吼一声，吓跑猴子吓跑狼", answer: "金钱豹" },
      { question: "身穿皮袍黄又黄，呼啸一声百兽慌，虽然没率兵和将，威风凛凛山大王", answer: "虎" },
      { question: "黑夜林中小哨兵，眼睛限像两盏灯，瞧瞧西来望望东，抓住盗贼不留情", answer: "猫头鹰" },
      { question: "头戴大红花，身穿什锦衣，好象当家人，一早催人起", answer: "公鸡" },
      { question: "嘴像小铲子，脚像小扇子，走路左右摆，水上划船子", answer: "鸭" },
      { question: "身体肥，头儿大，脸儿长方宽嘴巴，名字叫马却没毛，常在水中度生涯", answer: "河马" },
      { question: "一物像人又像狗，爬杆上树是能手，擅长模仿人动作，家里没有山里有", answer: "猴" },
      { question: "身子像个小逗点，摇着一根小尾巴，从小就会吃孑孓，长大吃虫叫哇哇", answer: "蝌蚪" },
      { question: "小小姑娘满身黑，秋去江南春来归，从小立志除害虫，身带剪刀满天飞", answer: "燕子" },
      { question: "唱歌不用嘴，声音真清脆，嘴尖像根锥，专吸树枝水", answer: "蝉" },
      { question: "背着包袱不肯走，表面坚强内里柔，行动迟缓不拖拉，碰到困难就缩头", answer: "蜗牛" },
      { question: "一条牛，真厉害，猛兽见它也避开，它的皮厚毛稀少，长出角来当药材", answer: "犀牛" },
      { question: "小货郎，不挑担，背着针，满处窜", answer: "刺猬" },
      { question: "小飞机，纱翅膀，飞来飞去灭虫忙，低飞雨，高飞睛，气象预报它内行", answer: "蜻蜓" },
      { question: "胡子不多两边翘，开口总是喵喵喵，黑夜巡逻眼似灯，粮仓厨房它放哨", answer: "猫" },
      { question: "腿长胳膊短，眉毛盖着眼，有人不吱声，无人爱叫唤", answer: "蝈蝈" },
      { question: "身穿鲜艳百花衣，爱在山丘耍儿戏，稍稍有点情况紧，只顾头来不顾尾", answer: "野鸭" },
      { question: "小飞虫，尾巴明，黑夜闪闪像盏灯，古代有人曾借用，刻苦读书当明灯", answer: "萤火虫" },
      { question: "一顶透明降落伞，随波逐流飘海中，触手有毒蜇人痛，身上小虾当眼睛", answer: "海蜇" },
      { question: "尖尖嘴，细细腿，狡猾多疑拖大尾", answer: "狐狸" },
      { question: "身穿白袍子，头戴红帽子，走路像公子，说话高嗓子", answer: "鹅" }
    ];

    // 去重校验
    this.riddles = this.riddles.filter((obj, index, self) =>
      index === self.findIndex((t) => (
        t.question === obj.question && t.answer === obj.answer
      ))
    );
  }

  static currentGame = {
    riddle: null,
    startTime: 0,
    attempts: new Map() // 改用Map记录所有用户尝试次数
  };

  async showHelp(e) {
    const helpMsg = `🏮 元宵猜灯谜使用指南：
━━━━━━━━━━━━━━
🔹 #猜灯谜 - 开启新谜题
🔹 #答案[内容] - 提交答案（例：#答案元宵）
🔹 #结束灯谜 - 终止当前谜题
🔹 #查看答案 - 显示当前谜底
🔹 #灯谜帮助 - 查看本指南

📌 每个谜题限时2分钟
🎯 输入答案无需标点符号
✅ 回答正确自动结束
💡 错误3次获得提示`;
    await e.reply(helpMsg);
  }

  async endRiddle(e) {
    guessRiddle.currentGame = {
      riddle: null,
      startTime: 0,
      attempts: new Map()
    };
    await e.reply("🎏 已重置所有灯谜游戏");
  }

  async startRiddle(e) {
    const now = Date.now();
    
    // 自动清理过期题目
    if (now - guessRiddle.currentGame.startTime > 120000) {
      guessRiddle.currentGame = {
        riddle: null,
        startTime: 0,
        attempts: new Map()
      };
    }

    if (guessRiddle.currentGame.riddle) {
      await e.reply([
        "🎯 当前已有进行中的灯谜：",
        `📜 ${guessRiddle.currentGame.riddle.question}`,
        "💡 你可以直接回答或输入#查看答案"
      ].join("\n"));
      return;
    }

    const availableRiddles = this.riddles;
    const riddle = availableRiddles[Math.floor(Math.random() * availableRiddles.length)];

    guessRiddle.currentGame = {
      riddle,
      startTime: Date.now(),
      attempts: new Map()
    };

    await e.reply([
      "🏮 元宵灯谜已刷新！",
      `📜 谜题：「${riddle.question}」`,
      "⏳ 剩余时间：120秒",
      "✨ 输入格式：#答案+你的答案",
      "❓ 输入#灯谜帮助查看说明"
    ].join("\n"));
  }

  async checkAnswer(e) {
    const userId = e.user_id;
    const now = Date.now();
    const game = guessRiddle.currentGame;

    // 自动清理过期题目
    if (now - game.startTime > 120000) {
      guessRiddle.currentGame = {
        riddle: null,
        startTime: 0,
        attempts: new Map()
      };
      await e.reply("⏰ 当前灯谜已超时失效");
      return;
    }

    const userAnswer = e.msg.replace(/[#答案\s·，。!！?？]/g, "").trim().toLowerCase();
    const attempts = (game.attempts.get(userId) || 0) + 1;
    game.attempts.set(userId, attempts);

    if (userAnswer === game.riddle.answer.toLowerCase()) {
      await e.reply([
        "🎊 恭喜答对！",
        `✅ 正确答案：${game.riddle.answer}`,
        `💪 尝试次数：${attempts}次`,
        "🎯 输入#猜灯谜 继续挑战"
      ].join("\n"));
      guessRiddle.currentGame = {
        riddle: null,
        startTime: 0,
        attempts: new Map()
      };
    } else {
      const hint = this.getHint(game.riddle.answer, attempts);
      const replyMsg = [
        `❌ 第${attempts}次回答错误`,
        `💡 提示：${hint}`,
        ...(attempts >= 3 ? ["📛 输入#放弃 可结束当前谜题"] : [])
      ].join("\n");
      
      await e.reply(replyMsg);
      
      if (attempts >= 5) {
        await e.reply(`💔 挑战失败！正确答案是：${game.riddle.answer}`);
        guessRiddle.currentGame = {
          riddle: null,
          startTime: 0,
          attempts: new Map()
        };
      }
    }
  }

  async showAnswer(e) {
    const game = guessRiddle.currentGame;
    if (!game.riddle) {
      await e.reply("⚠️ 当前没有进行中的灯谜");
      return;
    }
    await e.reply([
      "🏮 当前灯谜答案：",
      `📜 谜题：「${game.riddle.question}」`,
      `🎯 正确答案：${game.riddle.answer}`
    ].join("\n"));
  }

  getHint(answer, attempts) {
    const revealCount = Math.min(Math.ceil(attempts * 0.7), answer.length);
    return answer.split('')
      .map((c, i) => i < revealCount ? c : '◼')
      .join('');
  }
}