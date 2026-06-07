    // 数据区：后续替换图片、文案、颜色时，优先修改这里。
    const STORAGE_KEY = "sanfu_h5_outfit_state_v1";
    const PAGE = {
      HOME: 0,
      INTRO: 1,
      SCENE: 2,
      STORY: 3,
      MARKET: 4,
      OUTFIT: 5,
      KEYWORD: 6,
      LOADING: 7,
      RESULT: 8
    };

    const scenes = [
      {
        id: "school",
        name: "开学第一天",
        sub: "元气出场",
        icon: "📖",
        emoji: "🎒",
        bg: "linear-gradient(145deg, #eee7ff, #fff7fd)",
        storyBg: "linear-gradient(135deg, #ffe3ef, #e7f4ff)",
        frames: [
          "新学期第一天，先穿上好状态。",
          "安安说：第一印象很重要！",
          "元气出场，认识新朋友。",
          "今天的我，顺利开局！"
        ]
      },
      {
        id: "dorm",
        name: "宿舍松弛日",
        sub: "舒服自在",
        icon: "🧸",
        emoji: "🛋️",
        bg: "linear-gradient(145deg, #e8f8ed, #fff8fb)",
        storyBg: "linear-gradient(135deg, #e9f8ef, #ffeaf1)",
        frames: [
          "忙完一天，终于可以松一口气。",
          "追剧、零食、聊天，快乐开始。",
          "楼下有活动？舒服也要见得了人。",
          "舒服不是随便，松弛也可以很美好。"
        ]
      },
      {
        id: "street",
        name: "周末出街",
        sub: "拍照出片",
        icon: "📷",
        emoji: "🥤",
        bg: "linear-gradient(145deg, #ffe0ec, #fff7fb)",
        storyBg: "linear-gradient(135deg, #ffe0ec, #e5fbf4)",
        frames: [
          "周末到了，今天当然要出门走个局。",
          "先把好心情穿上身。",
          "街角、咖啡、阳光，随手都很出片。",
          "这一套，拍照真的赢了！"
        ]
      },
      {
        id: "party",
        name: "朋友聚会",
        sub: "有点亮眼",
        icon: "⭐",
        emoji: "🍰",
        bg: "linear-gradient(145deg, #fff0dc, #fff8f0)",
        storyBg: "linear-gradient(135deg, #ffe7d1, #fff0fb)",
        frames: [
          "朋友的局，当然要有点状态。",
          "不用太用力，也要刚刚好亮眼。",
          "见到朋友，气氛一下就热起来。",
          "今天的我，合照里也很出彩。"
        ]
      },
      {
        id: "date",
        name: "约会见面",
        sub: "自然加分",
        icon: "💜",
        emoji: "💐",
        bg: "linear-gradient(145deg, #eee7ff, #fff7fb)",
        storyBg: "linear-gradient(135deg, #f0e8ff, #fff0df)",
        frames: [
          "不想太刻意，只想刚好心动。",
          "一见面，紧张都变成了小开心。",
          "舒服的相处，就是最好的加分项。",
          "自然一点，也能让心动发生。"
        ]
      },
      {
        id: "gift",
        name: "节日送礼",
        sub: "送得有趣",
        icon: "🎁",
        emoji: "🎀",
        bg: "linear-gradient(145deg, #e7f8ef, #fff6f9)",
        storyBg: "linear-gradient(135deg, #fff0db, #e8f8ef)",
        frames: [
          "节日到了，想把心意认真送出去。",
          "礼物不只要好看，还要有点小惊喜。",
          "包装好心意，仪式感拉满。",
          "看到她开心，就是今天最好的礼物。"
        ]
      }
    ];

    const storyAssets = {
      school: {
        base: "images/开学第一天-故事/",
        frames: ["图层 1.png", "图层 2.png", "图层 3.png", "图层 4.png"],
        decorations: ["图层 5.png", "图层 6.png"]
      },
      dorm: {
        base: "images/宿舍-故事/",
        frames: ["图层 1.png", "图层 2.png", "图层 3.png", "图层 4.png"],
        decorations: []
      },
      street: {
        base: "images/周末出街-故事/",
        frames: ["图层 1.png", "图层 2.png", "图层 3.png", "图层 4.png"],
        decorations: []
      },
      date: {
        base: "images/约会见面-故事/",
        frames: ["图层 1.png", "图层 2.png", "图层 3.png", "图层 4.png"],
        decorations: []
      }
    };

    const markets = [
      { id: "clothes", name: "服装区", sub: "时尚穿搭 / 每日焕新", icon: "👕", bg: "linear-gradient(145deg, #eee7ff, #fbf6ff)" },
      { id: "accessory", name: "配饰区", sub: "点缀造型 / 搭出心动细节", icon: "🎀", bg: "linear-gradient(145deg, #ffe3ef, #fff6fb)" },
      { id: "beauty", name: "美妆区", sub: "元气妆容 / 自信发光", icon: "💄", bg: "linear-gradient(145deg, #ffe9df, #fff6f2)" },
      { id: "toy", name: "潮玩区", sub: "治愈好物 / 快乐加倍", icon: "🧸", bg: "linear-gradient(145deg, #e5f8ed, #f7fff9)" },
      { id: "gift", name: "礼物区", sub: "心意好礼 / 送给重要的 TA", icon: "🎁", bg: "linear-gradient(145deg, #fff1cd, #fff9ec)" }
    ];

    const categories = ["上衣", "下装", "包包", "发饰", "美妆", "玩偶挂件"];
    const products = [
      { id: "top-green", category: "上衣", name: "绿色雏菊 T 恤", icon: "👕", bg: "linear-gradient(145deg, #def8e5, #f8fff9)" },
      { id: "top-pink", category: "上衣", name: "粉色短袖", icon: "🎽", bg: "linear-gradient(145deg, #ffe1ec, #fff7fb)" },
      { id: "top-purple", category: "上衣", name: "紫色短袖", icon: "👚", bg: "linear-gradient(145deg, #eee5ff, #fbf8ff)" },
      { id: "bottom-denim", category: "下装", name: "牛仔短裤", icon: "🩳", bg: "linear-gradient(145deg, #dff2ff, #f7fcff)" },
      { id: "bottom-plaid", category: "下装", name: "格纹半身裙", icon: "🧵", bg: "linear-gradient(145deg, #ffe6ef, #fff9fc)" },
      { id: "bottom-pink", category: "下装", name: "粉色百褶裙", icon: "👗", bg: "linear-gradient(145deg, #ffe0ef, #fff7fb)" },
      { id: "bag-pink", category: "包包", name: "粉色绗缝包", icon: "👜", bg: "linear-gradient(145deg, #ffe1ec, #fff8fb)" },
      { id: "bag-purple", category: "包包", name: "紫色书包", icon: "🎒", bg: "linear-gradient(145deg, #e9e1ff, #fbf8ff)" },
      { id: "bag-black", category: "包包", name: "黑色小包", icon: "👛", bg: "linear-gradient(145deg, #ebe7f0, #fff)" },
      { id: "hair-scrunchie", category: "发饰", name: "紫色发圈", icon: "🟣", bg: "linear-gradient(145deg, #eee5ff, #fff8ff)" },
      { id: "hair-bow", category: "发饰", name: "蝴蝶结发夹", icon: "🎀", bg: "linear-gradient(145deg, #f3e7ff, #fff8ff)" },
      { id: "hair-color", category: "发饰", name: "彩色发夹", icon: "✨", bg: "linear-gradient(145deg, #fff0d9, #f1fff9)" },
      { id: "beauty-lip", category: "美妆", name: "奶茶色唇釉", icon: "💄", bg: "linear-gradient(145deg, #ffe1dc, #fff7f3)" },
      { id: "beauty-blush", category: "美妆", name: "元气腮红", icon: "🌸", bg: "linear-gradient(145deg, #ffe5ee, #fff8fb)" },
      { id: "beauty-eye", category: "美妆", name: "微闪眼影", icon: "💫", bg: "linear-gradient(145deg, #eee6ff, #fff8ff)" },
      { id: "toy-bear", category: "玩偶挂件", name: "小熊挂件", icon: "🧸", bg: "linear-gradient(145deg, #fff1df, #fff9f2)" },
      { id: "toy-dino", category: "玩偶挂件", name: "恐龙玩偶", icon: "🦖", bg: "linear-gradient(145deg, #e6f8dd, #f8fff5)" },
      { id: "toy-badge", category: "玩偶挂件", name: "趣味徽章", icon: "🏅", bg: "linear-gradient(145deg, #fff0cd, #fff9eb)" }
    ];

    const styles = [
      { id: "simple", name: "简洁耐看", icon: "🌿", bg: "linear-gradient(145deg, #e4f8ed, #fbfff8)" },
      { id: "sweet-cool", name: "甜酷出街", icon: "🕶️", bg: "linear-gradient(145deg, #ffe2ec, #fff8fb)" },
      { id: "cute", name: "元气可爱", icon: "🌼", bg: "linear-gradient(145deg, #fff0d2, #fffaf0)" },
      { id: "relaxed", name: "松弛休闲", icon: "🥤", bg: "linear-gradient(145deg, #def2ff, #f7fcff)" },
      { id: "detail", name: "精致细节", icon: "📿", bg: "linear-gradient(145deg, #f1e6ff, #fff8ff)" },
      { id: "funny", name: "潮趣搞怪", icon: "🦖", bg: "linear-gradient(145deg, #e9f8dd, #fffdf0)" }
    ];

    const personalities = {
      simple: { name: "清爽秩序搭子", keywords: ["清爽", "耐看", "自然"] },
      "sweet-cool": { name: "拍照出片搭子", keywords: ["甜酷", "亮眼", "出片"] },
      cute: { name: "元气亲和搭子", keywords: ["元气", "可爱", "亲和"] },
      relaxed: { name: "自在松弛搭子", keywords: ["舒服", "自在", "松弛"] },
      detail: { name: "细节仪式搭子", keywords: ["精致", "细节", "仪式感"] },
      funny: { name: "反差趣味搭子", keywords: ["潮趣", "搞怪", "反差"] }
    };

    let userState = {
      currentPage: PAGE.HOME,
      selectedScene: null,
      selectedProducts: [],
      selectedStyle: null,
      generatedPersonality: null,
      musicOn: true,
      selectedCategory: "上衣"
    };

    let swiper = null;
    let toastTimer = null;
    let loadingStarted = false;
    let loadingReady = false;
    let resultCelebrated = false;

    const slideIds = [
      "slide-home",
      "slide-intro",
      "slide-scene",
      "slide-story",
      "slide-market",
      "slide-outfit",
      "slide-keyword",
      "slide-loading",
      "slide-result"
    ];

    function escapeHtml(value) {
      return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[char]));
    }

    function getScene() {
      return scenes.find(scene => scene.id === userState.selectedScene) || scenes[2];
    }

    function getStyle() {
      return styles.find(style => style.id === userState.selectedStyle) || styles[1];
    }

    function getProduct(id) {
      return products.find(product => product.id === id);
    }

    function getSelectedProducts() {
      return userState.selectedProducts.map(getProduct).filter(Boolean);
    }

    function brandBar() {
      return `
        <header class="brand-bar">
          <div class="brand-lockup">
            <div class="brand-logo">三福</div>
            <div class="brand-line"></div>
            <div class="brand-sub">年轻人的<br>生活美学品牌</div>
          </div>
          <div class="top-actions">
            <button class="pill-btn" type="button" data-action="toggleMusic">🎵 ${userState.musicOn ? "音乐开" : "音乐关"}</button>
            <button class="pill-btn share" type="button" data-action="share">↗ 分享</button>
          </div>
        </header>
      `;
    }

    function decorations() {
      return `
        <span class="float-decoration deco-1">✧</span>
        <span class="float-decoration deco-2">♥</span>
        <span class="float-decoration deco-3">✦</span>
        <span class="float-decoration deco-4">↝</span>
        <span class="float-decoration deco-5">✦</span>
        <span class="doodle-line doodle-a"></span>
        <span class="doodle-line doodle-b"></span>
      `;
    }

    function footerSlogan() {
      return `<div class="footer-slogan">潮趣生活 由你主局</div>`;
    }

    function pageWrap(className, content) {
      return `
        <div class="page ${className}">
          ${decorations()}
          ${brandBar()}
          <div class="page-scroll">${content}</div>
          ${footerSlogan()}
        </div>
      `;
    }

    function pageTag(index) {
      return `<div class="page-tag">第 <strong>${index}</strong> 页</div>`;
    }

    // 必须实现：第 1 页：首页
    function renderHome() {
      return pageWrap("home-page", `
        <section class="home-assets-layout" aria-label="生活新搭案首页主视觉">
          <div class="home-assets-scene">
            <img class="home-asset-bg" src="images/第一页/图层 6.png" alt="">
            <img class="home-asset home-asset-title" src="images/第一页/图层 3.png" alt="生活新「搭」案局">
            <img class="home-asset home-asset-girl" src="images/第一页/图层 5.png" alt="可爱女生与潮趣好物主视觉">
            <img class="home-asset home-asset-gift" src="images/第一页/图层 1.png" alt="">
            <img class="home-asset home-asset-bag" src="images/第一页/图层 2.png" alt="">
            <img class="home-asset home-asset-shopbag" src="images/第一页/图层 4.png" alt="">
            <img class="home-asset home-asset-teddy" src="images/第一页/图层 7.png" alt="">
          </div>
          <span class="home-asset-label label-wear">穿搭</span>
          <span class="home-asset-label label-bag">包包</span>
          <span class="home-asset-label label-makeup">美妆</span>
          <span class="home-asset-label label-toy">潮玩</span>
          <span class="home-asset-label label-gift">惊喜好礼</span>
          <div class="home-start-layer">
            <button class="gradient-btn" type="button" data-go="${PAGE.INTRO}" aria-label="开始主局">✨ 开始主局 ✨</button>
          </div>
        </section>
      `);
    }

    // 必须实现：第 2 页：主局说明页
    function renderIntro() {
      return pageWrap("intro-page intro-assets-page", `
        ${pageTag(2)}
        <h1 class="sticker-title small"><span class="mint">今天</span><span class="black">，你要</span><span class="pink">主</span><span class="black">什么局？</span></h1>
        <div class="ribbon">换上心动搭配，解锁多彩生活场景！</div>
        <section class="intro-assets-layout" aria-label="主局说明页素材主视觉">
          <img class="intro-asset intro-asset-main" src="images/第二页/图层 1.png" alt="今天你要主什么局说明主视觉">
          <img class="intro-asset intro-asset-lip" src="images/第二页/图层 2.png" alt="">
          <img class="intro-asset intro-asset-accessory" src="images/第二页/图层 3.png" alt="">
          <img class="intro-asset intro-asset-bag" src="images/第二页/图层 4.png" alt="">
          <div class="intro-copy-overlay" aria-label="主局说明文案">
            <p>生活每天都不一样，心情也会换频道～</p>
            <p>学习、约会、旅行、宅家、聚会 ...</p>
            <p>每个场景，都值得精心搭配。</p>
            <p>三福陪你一起，用穿搭、配饰、美妆、</p>
            <p>潮玩和惊喜好礼，为每一天打call!</p>
            <p>你的潮趣搭子已上线，</p>
            <p>准备好主宰你的精彩生活了吗?</p>
          </div>
          <button class="gradient-btn intro-hit" type="button" data-go="${PAGE.SCENE}" aria-label="进入潮趣市集">进入潮趣市集</button>
        </section>
      `);
      return pageWrap("intro-page", `
        ${pageTag(2)}
        <h1 class="sticker-title small"><span class="mint">今天</span><span class="black">，你要</span><span class="pink">主</span><span class="black">什么局？</span></h1>
        <div class="ribbon">换上心动搭配，解锁多彩生活场景！</div>
        <section class="intro-card dashed-card">
          <p>生活每天都不一样，心情也会换频道～</p>
          <p>学习、约会、旅行、宅家、聚会……</p>
          <p>每个场景，都值得精心搭配。</p>
          <p>三福陪你一起，用穿搭、配饰、美妆、潮玩和惊喜好礼，为每一天打 call！</p>
          <p>你的潮趣搭子已上线，</p>
          <p>准备好主宰你的精彩生活了吗？</p>
        </section>
        <div class="intro-goods"><span>🎒</span><span>📣</span><span>🧸</span><span>🎁</span></div>
        <div class="btn-row">
          <button class="gradient-btn" type="button" data-go="${PAGE.SCENE}">✨ 进入潮趣市集 ✨</button>
        </div>
      `);
    }

    // 必须实现：第 3 页：生活场景选择页
    function renderSceneSelect() {
      const cards = scenes.map(scene => `
        <button class="scene-card ${userState.selectedScene === scene.id ? "active" : ""}" style="--scene-bg:${scene.bg}" type="button" data-scene="${scene.id}">
          <span class="scene-check">✓</span>
          <span class="scene-visual">${scene.icon}</span>
          <h3>${scene.name}</h3>
          <p>${scene.sub}</p>
        </button>
      `).join("");

      return pageWrap("scene-page", `
        ${pageTag(3)}
        <h1 class="sticker-title tiny"><span class="black">选择你的</span><span class="pink">今日</span><span class="mint">生活</span><span class="violet">场景</span></h1>
        <div class="scene-grid">${cards}</div>
        <div class="btn-row">
          <button class="gradient-btn" type="button" data-action="sceneNext">✨ 下一步 ✨</button>
        </div>
      `);
    }

    // 必须实现：第 4 页：故事分镜页
    function renderStoryPage() {
      const scene = getScene();
      const assetSet = storyAssets[scene.id];
      const cards = assetSet
        ? assetSet.frames.map((file, index) => `
          <article class="story-card story-image-card" aria-label="${escapeHtml(scene.name)}分镜 ${index + 1}：${escapeHtml(scene.frames[index])}">
            <img class="story-frame-img" src="${assetSet.base}${file}" alt="">
          </article>
        `).join("")
        : scene.frames.map((text, index) => `
          <article class="story-card" style="--story-bg:${scene.storyBg}">
            <div class="story-scene"></div>
            <div class="story-no">${index + 1}</div>
            <div class="story-emoji">${scene.emoji}</div>
            <div class="story-bubble ${index % 2 ? "alt" : ""}">${escapeHtml(text)}</div>
          </article>
        `).join("");

      const decorations = assetSet?.decorations?.length
        ? assetSet.decorations.map((file, index) => `<img class="story-asset-deco story-asset-deco-${index + 1}" src="${assetSet.base}${file}" alt="">`).join("")
        : "";

      return pageWrap(`story-page ${assetSet ? "story-assets-page" : ""}`, `
        <h1 class="sticker-title tiny"><span class="pink">${scene.name}</span></h1>
        <div class="ribbon mint">${scene.sub} ☺</div>
        ${decorations}
        <section class="story-list">${cards}</section>
        <div class="btn-row">
          <button class="gradient-btn" type="button" data-go="${PAGE.MARKET}">✨ 进入三福潮趣市集 ✨</button>
        </div>
      `);
    }

    // 必须实现：第 5 页：潮趣市集页
    function renderMarket() {
      const marketAssetMap = {
        clothes: "images/第三页/图层 1.png",
        accessory: "images/第三页/图层 4.png",
        beauty: "images/第三页/图层 3.png",
        toy: "images/第三页/图层 2.png",
        gift: "images/第三页/图层 5.png"
      };
      const cardsWithAssets = markets.map((market, index) => `
        <button class="market-card ${index === 4 ? "wide" : ""}" style="--market-bg:${market.bg}" type="button" data-action="marketTap" data-market="${market.id}">
          <div>
            <h3>${market.name}</h3>
            <p>${market.sub}</p>
          </div>
          <img class="market-asset-img" src="${marketAssetMap[market.id]}" alt="">
        </button>
      `).join("");

      return pageWrap("market-page market-assets-page", `
        ${pageTag(5)}
        <img class="market-floating-asset market-cart" src="images/第三页/图层 5.png" alt="">
        <img class="market-floating-asset market-star-a" src="images/第三页/图层 6.png" alt="">
        <img class="market-floating-asset market-star-b" src="images/第三页/图层 7.png" alt="">
        <h1 class="sticker-title tiny"><span class="black">进入</span><span class="mint">三福</span><span class="pink">潮趣市集</span></h1>
        <img class="market-assets-ribbon" src="images/第三页/图层 8.png" alt="点击你想逛的区域">
        <section class="market-grid">${cardsWithAssets}</section>
        <div class="btn-row">
          <button class="gradient-btn" type="button" data-go="${PAGE.OUTFIT}">✨ 开始搭配 ✨</button>
        </div>
      `);
      const cards = markets.map((market, index) => `
        <button class="market-card ${index === 4 ? "wide" : ""}" style="--market-bg:${market.bg}" type="button" data-action="marketTap" data-market="${market.id}">
          <div>
            <h3>${market.name}</h3>
            <p>${market.sub}</p>
          </div>
          <span class="market-icon">${market.icon}</span>
        </button>
      `).join("");

      return pageWrap("market-page", `
        ${pageTag(5)}
        <h1 class="sticker-title tiny"><span class="black">进入</span><span class="mint">三福</span><span class="pink">潮趣市集</span></h1>
        <div class="ribbon">点击你想逛的区域</div>
        <section class="market-grid">${cards}</section>
        <div class="btn-row">
          <button class="gradient-btn" type="button" data-go="${PAGE.OUTFIT}">✨ 开始搭配 ✨</button>
        </div>
      `);
    }

    // 必须实现：第 6 页：拖拽搭配页
    function renderOutfitDrag() {
      const selected = getSelectedProducts();
      const selectedIds = new Set(userState.selectedProducts);
      const category = userState.selectedCategory || categories[0];
      const productCards = products
        .filter(product => product.category === category)
        .map(product => `
          <button class="product-card ${selectedIds.has(product.id) ? "selected" : ""}" style="--product-bg:${product.bg}" type="button" data-product="${product.id}">
            <span class="selected-badge">已选择</span>
            <span class="product-icon">${product.icon}</span>
            <span class="product-name">${product.name}</span>
          </button>
        `).join("");

      const slots = Array.from({ length: 5 }).map((_, index) => {
        const product = selected[index];
        if (product) {
          return `
            <button class="slot-card filled" type="button" data-remove-slot="${index}">
              <span class="slot-icon">${product.icon}</span>
              ${product.name}
            </button>
          `;
        }
        return `<button class="slot-card empty" type="button" data-empty-slot="${index}"><span class="slot-icon">＋</span>拖拽到这里</button>`;
      }).join("");

      const hearts = Array.from({ length: 5 }).map((_, index) =>
        `<span class="${index < selected.length ? "filled" : ""}">♥</span>`
      ).join("");

      const chips = categories.map(item => `
        <button class="category-chip ${item === category ? "active" : ""}" type="button" data-category="${item}">${item}</button>
      `).join("");

      return pageWrap("outfit-page", `
        <div class="progress-pill">搭配进度 <strong>${selected.length}/5</strong></div>
        <div class="heart-progress">${hearts}</div>
        <h1 class="sticker-title tiny"><span class="pink">拖一拖</span><span class="black">，搭出你的</span><span class="mint">今日状态</span></h1>
        <section class="outfit-main">
          <div class="avatar-card dashed-card">
            <span class="avatar-bubble b1">搭子感 +1</span>
            <span class="avatar-bubble b2">出片指数上升 ↑</span>
            <span class="avatar-bubble b3">这件很适合今天主个局 💗</span>
            <div class="avatar-person"><span class="head"></span><span class="body"></span></div>
          </div>
          <div class="slots-panel dashed-card">
            <div class="slots-title">已选搭配（${selected.length}/5）</div>
            <div class="slot-grid">${slots}</div>
          </div>
        </section>
        <div class="category-row">${chips}</div>
        <section class="product-grid">${productCards}</section>
        <div class="hint-text">长按商品卡片，拖到上方装扮区，也可以直接点击选择</div>
        <div class="btn-row">
          <button class="gradient-btn secondary" type="button" data-action="clearProducts">↺ 撤回</button>
          <button class="gradient-btn" type="button" data-action="confirmOutfit">✨ 确认搭配 ✨</button>
        </div>
      `);
    }

    // 必须实现：第 7 页：搭配关键词页
    function renderKeywordSelect() {
      const cards = styles.map(style => `
        <button class="keyword-card ${userState.selectedStyle === style.id ? "active" : ""}" style="--keyword-bg:${style.bg}" type="button" data-style="${style.id}">
          <span class="keyword-check">✓</span>
          <span class="keyword-icon">${style.icon}</span>
          <h3>${style.name}</h3>
          <p>选一个最像你今天状态的关键词</p>
        </button>
      `).join("");

      return pageWrap("keyword-page", `
        ${pageTag(7)}
        <h1 class="sticker-title tiny"><span class="black">你的今日搭配</span><span class="pink">关键词</span><span class="black">是？</span></h1>
        <div class="ribbon">选一个最像你今天状态的关键词</div>
        <section class="keyword-grid">${cards}</section>
        <div class="btn-row">
          <button class="gradient-btn" type="button" data-action="styleNext">✨ 生成搭配方向 ✨</button>
        </div>
      `);
    }

    // 必须实现：第 8 页：搭案人格生成页
    function renderLoading() {
      const scene = getScene();
      const style = getStyle();
      const persona = userState.generatedPersonality || personalities[style.id];

      return pageWrap("loading-page", `
        <h1 class="sticker-title tiny"><span class="black">你的</span><span class="pink">搭案人格</span><br><span class="mint">正在生成</span></h1>
        <section class="analysis-card dashed-card">
          <div class="analysis-row">📍 你的场景：${scene.name}</div>
          <div class="analysis-row"># 你的关键词：${style.name}</div>
          <div class="analysis-row">〰 正在分析你的生活新「搭」案……</div>
          <div class="loading-bar">
            <div class="loading-track"><div class="loading-fill"></div></div>
            <div class="loading-percent">0%</div>
          </div>
        </section>
        <section class="mystery-card dashed-card">
          <div class="mystery-shadow">?</div>
          <div>
            <p>你的搭案人格是——</p>
            <strong>“${persona.name}”</strong>
            <p>正在为你准备专属搭案报告……</p>
          </div>
        </section>
        <div class="btn-row">
          <button class="gradient-btn disabled" type="button" data-action="viewResult" disabled>✨ 查看我的搭案 ✨</button>
        </div>
      `);
    }

    // 必须实现：第 9 页：结果页
    function renderResult() {
      const scene = getScene();
      const style = getStyle();
      const persona = userState.generatedPersonality || personalities[style.id];
      const selected = getSelectedProducts();
      const resultProducts = selected.length ? selected : products.slice(0, 3);

      const productList = resultProducts.map(product => `
        <div class="result-product"><span>${product.icon}</span>${product.name}</div>
      `).join("");

      const tags = persona.keywords.map(tag => `<span class="mini-tag">${tag}</span>`).join("");

      return pageWrap("result-page", `
        <h1 class="sticker-title tiny"><span class="black">我的</span><span class="mint">生活新</span><span class="pink">「搭」</span><span class="black">案</span></h1>
        <div class="ribbon">你的专属搭案已生成！</div>
        <section class="result-card dashed-card" id="resultCard">
          <div class="result-hero">
            <div class="result-person">☺</div>
            <div>
              <h2 class="result-title">${scene.name}</h2>
              <div class="result-style">${style.name}</div>
              <div class="tag-row">${tags}</div>
            </div>
          </div>
          <div class="tag-row">
            <span class="mini-tag">场景：${scene.name}</span>
            <span class="mini-tag">副标题：${scene.sub}</span>
            <span class="mini-tag">人格：${persona.name}</span>
          </div>
          <div class="result-products">${productList}</div>
          <p class="result-copy">
            生活新「搭」案，和潮趣一起主个局<br>
            三福，发现生活新可能
          </p>
        </section>
        <div class="result-actions">
          <button class="gradient-btn" type="button" data-action="saveCard">⇩ 保存我的搭案卡</button>
          <button class="gradient-btn violet-btn" type="button" data-action="share">↗ 分享给朋友</button>
          <button class="gradient-btn mint-btn" type="button" data-action="resetGame">↻ 再搭一次</button>
        </div>
      `);
    }

    function renderAll() {
      const renders = [
        renderHome,
        renderIntro,
        renderSceneSelect,
        renderStoryPage,
        renderMarket,
        renderOutfitDrag,
        renderKeywordSelect,
        renderLoading,
        renderResult
      ];

      slideIds.forEach((id, index) => {
        const slide = document.getElementById(id);
        slide.innerHTML = renders[index]();
      });
    }

    function refreshCurrent() {
      renderAll();
      if (swiper) {
        swiper.update();
        swiper.slideTo(userState.currentPage, 0, false);
      }
      afterRender();
    }

    function goTo(pageIndex) {
      userState.currentPage = pageIndex;
      if (pageIndex !== PAGE.LOADING) {
        loadingStarted = false;
      }
      saveState();
      renderAll();
      if (swiper) {
        swiper.update();
        swiper.slideTo(pageIndex, 420);
      }
      setTimeout(afterRender, 460);
    }

    // 必须实现：选择场景
    function selectScene(id) {
      userState.selectedScene = id;
      saveState();
      refreshCurrent();
    }

    // 必须实现：选择商品，支持传入 product 对象或商品 id。
    function selectProduct(product) {
      const id = typeof product === "string" ? product : product.id;
      const existsIndex = userState.selectedProducts.indexOf(id);
      if (existsIndex >= 0) {
        userState.selectedProducts.splice(existsIndex, 1);
        showToast("已移除该单品");
      } else {
        if (userState.selectedProducts.length >= 5) {
          showToast("最多选择 5 件搭配单品");
          return;
        }
        userState.selectedProducts.push(id);
        showToast("已选择搭配单品");
      }
      saveState();
      refreshCurrent();
    }

    // 必须实现：移除已选槽位
    function removeProduct(index) {
      userState.selectedProducts.splice(index, 1);
      saveState();
      showToast("已移除该单品");
      refreshCurrent();
    }

    // 必须实现：清空选择
    function clearProducts() {
      userState.selectedProducts = [];
      saveState();
      showToast("已清空当前搭配");
      refreshCurrent();
    }

    // 必须实现：选择关键词
    function selectStyle(styleId) {
      userState.selectedStyle = styleId;
      saveState();
      refreshCurrent();
    }

    // 必须实现：根据关键词生成人格结果
    function generateResult() {
      const style = getStyle();
      userState.generatedPersonality = personalities[style.id];
      saveState();
      return userState.generatedPersonality;
    }

    // 必须实现：保存状态
    function saveState() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userState));
    }

    // 必须实现：读取状态
    function loadState() {
      try {
        if (new URLSearchParams(location.search).has("reset")) {
          localStorage.removeItem(STORAGE_KEY);
        }
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
        userState = { ...userState, ...saved };
        userState.selectedProducts = Array.isArray(userState.selectedProducts) ? userState.selectedProducts.filter(id => getProduct(id)) : [];
        if (!scenes.some(scene => scene.id === userState.selectedScene)) userState.selectedScene = null;
        if (!styles.some(style => style.id === userState.selectedStyle)) userState.selectedStyle = null;
        if (!categories.includes(userState.selectedCategory)) userState.selectedCategory = categories[0];
        if (typeof userState.currentPage !== "number" || userState.currentPage < 0 || userState.currentPage > PAGE.RESULT) {
          userState.currentPage = PAGE.HOME;
        }
      } catch (error) {
        userState.currentPage = PAGE.HOME;
      }
      return userState;
    }

    // 必须实现：重新开始
    function resetGame() {
      userState.selectedScene = null;
      userState.selectedProducts = [];
      userState.selectedStyle = null;
      userState.generatedPersonality = null;
      userState.currentPage = PAGE.SCENE;
      resultCelebrated = false;
      loadingStarted = false;
      saveState();
      showToast("已清空选择，重新主局");
      goTo(PAGE.SCENE);
    }

    // 必须实现：提示
    function showToast(message) {
      const toast = document.querySelector(".toast");
      clearTimeout(toastTimer);
      toast.textContent = message;
      toast.classList.add("show");
      toastTimer = setTimeout(() => toast.classList.remove("show"), 1600);
    }

    function confirmOutfit() {
      if (userState.selectedProducts.length < 3) {
        showToast("至少选择 3 件搭配单品。");
        return;
      }
      goTo(PAGE.KEYWORD);
    }

    function startLoading() {
      if (loadingStarted) return;
      loadingStarted = true;
      loadingReady = false;
      generateResult();

      const slide = document.getElementById("slide-loading");
      const fill = slide.querySelector(".loading-fill");
      const percent = slide.querySelector(".loading-percent");
      const button = slide.querySelector("[data-action='viewResult']");
      if (!fill || !percent || !button) return;

      button.disabled = true;
      button.classList.add("disabled");
      gsap.set(fill, { width: "0%" });
      gsap.to(fill, {
        width: "100%",
        duration: 1.5,
        ease: "power2.out",
        onUpdate: function () {
          const value = Math.round(this.progress() * 100);
          percent.textContent = value + "%";
        },
        onComplete: function () {
          percent.textContent = "100%";
          loadingReady = true;
          button.disabled = false;
          button.classList.remove("disabled");
          showToast("搭案报告已准备好");
        }
      });
    }

    function saveResultCard() {
      const card = document.getElementById("resultCard");
      if (!card || !window.html2canvas) {
        showToast("保存组件加载中，请稍后再试");
        return;
      }
      showToast("正在生成搭案卡图片");
      html2canvas(card, {
        backgroundColor: null,
        scale: 2,
        useCORS: true
      }).then(canvas => {
        const link = document.createElement("a");
        link.download = "sanfu-life-outfit-card.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
        showToast("搭案卡已保存");
      }).catch(() => showToast("保存失败，请再试一次"));
    }

    function celebrateResult() {
      if (resultCelebrated) return;
      resultCelebrated = true;
      if (window.confetti) {
        confetti({
          particleCount: 72,
          spread: 72,
          origin: { y: .62 },
          colors: ["#ff7da1", "#9b83db", "#67d3bf", "#ffe6a3", "#ffffff"]
        });
        setTimeout(() => confetti({
          particleCount: 42,
          spread: 96,
          startVelocity: 26,
          origin: { y: .5 },
          colors: ["#ff7da1", "#f8b7cc", "#bba7f0", "#8ee4d1"]
        }), 240);
      }

      const shell = document.querySelector(".phone-shell");
      const burst = document.createElement("div");
      burst.className = "burst";
      burst.innerHTML = Array.from({ length: 18 }).map((_, index) =>
        `<span style="--i:${index}">${index % 3 === 0 ? "♥" : index % 3 === 1 ? "✦" : "✧"}</span>`
      ).join("");
      shell.appendChild(burst);
      burst.querySelectorAll("span").forEach((item, index) => {
        const angle = (Math.PI * 2 * index) / 18;
        gsap.fromTo(item,
          { x: 0, y: 0, opacity: 1, scale: .6 },
          {
            x: Math.cos(angle) * (80 + index * 3),
            y: Math.sin(angle) * (70 + index * 2),
            opacity: 0,
            scale: 1.45,
            duration: 1.2,
            ease: "power2.out"
          }
        );
      });
      setTimeout(() => burst.remove(), 1400);
    }

    function initDraggable() {
      if (!window.gsap || !window.Draggable) return;
      gsap.registerPlugin(Draggable);
      const cards = document.querySelectorAll("#slide-outfit .product-card:not(.selected)");
      if (!cards.length) return;

      Draggable.create(cards, {
        type: "x,y",
        bounds: ".phone-shell",
        zIndexBoost: true,
        onDragStart: function () {
          this.target.classList.add("dragging");
        },
        onDragEnd: function () {
          const target = this.target;
          const productId = target.dataset.product;
          const emptySlots = Array.from(document.querySelectorAll("#slide-outfit .slot-card.empty"));
          const hitSlot = emptySlots.find(slot => this.hitTest(slot, "45%"));
          target.classList.remove("dragging");
          gsap.to(target, { x: 0, y: 0, duration: .25, ease: "power2.out", clearProps: "transform" });
          if (hitSlot && productId) {
            selectProduct(productId);
          }
        }
      });
    }

    function initPointerDragFallback() {
      if (window.Draggable) return;
      const shell = document.querySelector(".phone-shell");
      const cards = document.querySelectorAll("#slide-outfit .product-card:not(.selected)");
      cards.forEach(card => {
        let startX = 0;
        let startY = 0;
        let moved = false;
        let clone = null;

        card.addEventListener("pointerdown", event => {
          startX = event.clientX;
          startY = event.clientY;
          moved = false;
          clone = card.cloneNode(true);
          clone.style.position = "fixed";
          clone.style.left = card.getBoundingClientRect().left + "px";
          clone.style.top = card.getBoundingClientRect().top + "px";
          clone.style.width = card.getBoundingClientRect().width + "px";
          clone.style.zIndex = "999";
          clone.style.pointerEvents = "none";
          clone.style.opacity = ".95";
          clone.classList.add("dragging");
          document.body.appendChild(clone);
          card.setPointerCapture(event.pointerId);
        });

        card.addEventListener("pointermove", event => {
          if (!clone) return;
          const dx = event.clientX - startX;
          const dy = event.clientY - startY;
          if (Math.abs(dx) + Math.abs(dy) > 8) moved = true;
          clone.style.transform = `translate(${dx}px, ${dy}px)`;
        });

        card.addEventListener("pointerup", event => {
          if (!clone) return;
          const slots = Array.from(document.querySelectorAll("#slide-outfit .slot-card.empty"));
          const hit = slots.some(slot => {
            const rect = slot.getBoundingClientRect();
            return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
          });
          clone.remove();
          clone = null;
          if (hit && moved) {
            event.preventDefault();
            event.stopPropagation();
            selectProduct(card.dataset.product);
          }
        });

        card.addEventListener("pointercancel", () => {
          if (clone) clone.remove();
          clone = null;
        });
      });
    }

    function animateActive() {
      if (!window.gsap) return;
      const active = document.querySelector(".swiper-slide-active .page");
      if (!active) return;

      const titleTargets = active.querySelectorAll(".sticker-title, .ribbon, .page-tag");
      if (titleTargets.length) {
        gsap.fromTo(titleTargets,
          { y: 18, opacity: 0, scale: .96 },
          { y: 0, opacity: 1, scale: 1, duration: .5, stagger: .06, ease: "back.out(1.6)" }
        );
      }

      const storyTargets = active.querySelectorAll(".story-card");
      if (storyTargets.length) {
        storyTargets.forEach((card, index) => {
          const direction = Math.random() > .5 ? 1 : -1;
          gsap.fromTo(card,
            {
              x: direction * (44 + Math.random() * 24),
              y: 10,
              opacity: 0,
              rotate: direction * (1.2 + Math.random() * 1.4)
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              rotate: 0,
              duration: .9,
              delay: index * 3,
              ease: "power3.out",
              clearProps: "transform,opacity"
            }
          );
        });
      }

      const cardTargets = active.querySelectorAll(".dashed-card, .scene-card, .market-card, .keyword-card, .product-card, .hero-product");
      if (cardTargets.length) {
        gsap.fromTo(cardTargets,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: .46, stagger: .035, ease: "power2.out" }
        );
      }

      const floatTargets = active.querySelectorAll(".float-decoration, .hero-product, .market-icon");
      if (floatTargets.length) {
        gsap.to(floatTargets, {
          y: "random(-8, 8)",
          x: "random(-4, 4)",
          rotation: "random(-5, 5)",
          duration: "random(2.2, 3.6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: .08
        });
      }
    }

    function afterRender() {
      animateActive();
      if (userState.currentPage === PAGE.OUTFIT) {
        initDraggable();
        initPointerDragFallback();
      }
      if (userState.currentPage === PAGE.LOADING) {
        startLoading();
      }
      if (userState.currentPage === PAGE.RESULT) {
        setTimeout(celebrateResult, 260);
      }
    }

    document.addEventListener("click", event => {
      const target = event.target.closest("button");
      if (!target) return;

      if (target.dataset.go) {
        goTo(Number(target.dataset.go));
        return;
      }

      if (target.dataset.scene) {
        selectScene(target.dataset.scene);
        return;
      }

      if (target.dataset.category) {
        userState.selectedCategory = target.dataset.category;
        saveState();
        refreshCurrent();
        return;
      }

      if (target.dataset.product) {
        selectProduct(target.dataset.product);
        return;
      }

      if (target.dataset.removeSlot) {
        removeProduct(Number(target.dataset.removeSlot));
        return;
      }

      if (target.dataset.style) {
        selectStyle(target.dataset.style);
        return;
      }

      switch (target.dataset.action) {
        case "toggleMusic":
          userState.musicOn = !userState.musicOn;
          saveState();
          showToast(userState.musicOn ? "音乐已开启" : "音乐已关闭");
          refreshCurrent();
          break;
        case "share":
          showToast("分享功能已模拟");
          break;
        case "sceneNext":
          if (!userState.selectedScene) {
            showToast("请先选择一个今日生活场景。");
            return;
          }
          goTo(PAGE.STORY);
          break;
        case "marketTap":
          showToast("已进入" + (target.querySelector("h3")?.textContent || "潮趣区域"));
          break;
        case "clearProducts":
          clearProducts();
          break;
        case "confirmOutfit":
          confirmOutfit();
          break;
        case "styleNext":
          if (!userState.selectedStyle) {
            showToast("请先选择一个搭配关键词。");
            return;
          }
          loadingStarted = false;
          generateResult();
          goTo(PAGE.LOADING);
          break;
        case "viewResult":
          if (!loadingReady) {
            showToast("正在生成中，请稍等");
            return;
          }
          goTo(PAGE.RESULT);
          break;
        case "saveCard":
          saveResultCard();
          break;
        case "resetGame":
          resetGame();
          break;
      }
    });

    function initSwiper() {
      if (!window.Swiper) {
        const wrapper = document.querySelector(".swiper-wrapper");
        const slides = Array.from(document.querySelectorAll(".swiper-slide"));
        swiper = {
          activeIndex: userState.currentPage,
          update() {},
          slideTo(index) {
            this.activeIndex = Math.max(0, Math.min(index, slides.length - 1));
            wrapper.style.transform = `translateX(${-100 * this.activeIndex}%)`;
            slides.forEach((slide, slideIndex) => slide.classList.toggle("swiper-slide-active", slideIndex === this.activeIndex));
            userState.currentPage = this.activeIndex;
            saveState();
          }
        };
        swiper.slideTo(userState.currentPage);
        return;
      }

      swiper = new Swiper(".h5-swiper", {
        direction: "horizontal",
        slidesPerView: 1,
        speed: 420,
        resistanceRatio: .72,
        threshold: 18,
        allowTouchMove: true,
        on: {
          slideChange: function () {
            userState.currentPage = this.activeIndex;
            if (userState.currentPage !== PAGE.RESULT) resultCelebrated = false;
            if (userState.currentPage !== PAGE.LOADING) loadingStarted = false;
            saveState();
            afterRender();
          }
        }
      });
      swiper.slideTo(userState.currentPage, 0, false);
    }

    function ensureFallbackLibraries() {
      if (!window.gsap) {
        const asArray = target => {
          if (!target) return [];
          if (typeof target === "string") return Array.from(document.querySelectorAll(target));
          if (target instanceof Element) return [target];
          return Array.from(target);
        };
        const applyVars = (element, vars) => {
          if (!element || !element.style) return;
          if ("opacity" in vars) element.style.opacity = vars.opacity;
          if ("width" in vars) element.style.width = vars.width;
          const transforms = [];
          if ("x" in vars && typeof vars.x === "number") transforms.push(`translateX(${vars.x}px)`);
          if ("y" in vars && typeof vars.y === "number") transforms.push(`translateY(${vars.y}px)`);
          if ("scale" in vars) transforms.push(`scale(${vars.scale})`);
          if ("rotation" in vars && typeof vars.rotation === "number") transforms.push(`rotate(${vars.rotation}deg)`);
          if (transforms.length) element.style.transform = transforms.join(" ");
        };
        window.gsap = {
          registerPlugin() {},
          set(target, vars) {
            asArray(target).forEach(element => applyVars(element, vars));
          },
          to(target, vars) {
            const elements = asArray(target);
            const duration = Math.max(0, (vars.duration || 0) * 1000);
            if (vars.repeat === -1) return;
            if (!duration) {
              elements.forEach(element => applyVars(element, vars));
              if (typeof vars.onComplete === "function") vars.onComplete();
              return;
            }
            const start = performance.now();
            const tick = now => {
              const progress = Math.min(1, (now - start) / duration);
              elements.forEach(element => {
                if ("width" in vars) element.style.width = progress * parseFloat(vars.width) + "%";
                if ("opacity" in vars) element.style.opacity = vars.opacity;
              });
              if (typeof vars.onUpdate === "function") vars.onUpdate.call({ progress: () => progress });
              if (progress < 1) {
                requestAnimationFrame(tick);
              } else {
                elements.forEach(element => applyVars(element, vars));
                if (typeof vars.onComplete === "function") vars.onComplete();
              }
            };
            requestAnimationFrame(tick);
          },
          fromTo(target, fromVars, toVars) {
            asArray(target).forEach(element => applyVars(element, fromVars));
            return this.to(target, toVars);
          }
        };
      }
    }

    function fitStageToViewport() {
      const designWidth = 430;
      const designHeight = 955.5556;
      const viewport = window.visualViewport || window;
      const viewportWidth = viewport.width || window.innerWidth || designWidth;
      const viewportHeight = viewport.height || window.innerHeight || designHeight;
      const scale = Math.min(viewportWidth / designWidth, viewportHeight / designHeight);
      document.documentElement.style.setProperty("--stage-scale", String(Math.max(scale, .1)));
    }

    function boot() {
      fitStageToViewport();
      ensureFallbackLibraries();
      loadState();
      renderAll();
      initSwiper();
      afterRender();
    }

    // 这些函数暴露到 window，方便调试或对接后续活动平台。
    // Expose functions for debugging and campaign platform integration.
    globalThis.renderHome = renderHome;
    globalThis.renderIntro = renderIntro;
    globalThis.renderSceneSelect = renderSceneSelect;
    globalThis.renderStoryPage = renderStoryPage;
    globalThis.renderMarket = renderMarket;
    globalThis.renderOutfitDrag = renderOutfitDrag;
    globalThis.renderKeywordSelect = renderKeywordSelect;
    globalThis.renderLoading = renderLoading;
    globalThis.renderResult = renderResult;
    globalThis.selectScene = selectScene;
    globalThis.selectProduct = selectProduct;
    globalThis.removeProduct = removeProduct;
    globalThis.clearProducts = clearProducts;
    globalThis.selectStyle = selectStyle;
    globalThis.generateResult = generateResult;
    globalThis.saveState = saveState;
    globalThis.loadState = loadState;
    globalThis.resetGame = resetGame;
    globalThis.showToast = showToast;

    window.addEventListener("resize", fitStageToViewport);
    window.visualViewport?.addEventListener("resize", fitStageToViewport);
    boot();
  
