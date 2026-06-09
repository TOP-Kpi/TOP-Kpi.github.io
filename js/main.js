    // 数据区：后续替换图片、文案、颜色时，优先修改这里。
    const STORAGE_KEY = "sanfu_h5_outfit_state_v2";
    const PAGE = {
      HOME: 0,
      INTRO: 1,
      SCENE: 2,
      STORY: 3,
      GENERATE_PERSONA: 4,
      LOADING: 5,
      RESULT: 6
    };
    const JSDELIVR_ASSET_BASE = "https://cdn.jsdelivr.net/gh/TOP-Kpi/TOP-Kpi.github.io@main/";
    const LOCAL_ASSET_HOSTS = new Set(["", "localhost", "127.0.0.1", "::1"]);

    function assetUrl(path) {
      const normalized = String(path).replace(/^\.?\//, "");
      const isLocalPreview = location.protocol === "file:" || LOCAL_ASSET_HOSTS.has(location.hostname);
      return isLocalPreview ? normalized : JSDELIVR_ASSET_BASE + encodeURI(normalized);
    }

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

    const sceneSelectAssets = {
      school: "images/第三页/图层 1.png",
      dorm: "images/第三页/图层 2.png",
      street: "images/第三页/图层 3.png",
      date: "images/第三页/图层 4.png"
    };

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

    const sceneResults = {
      school: {
        persona: "元气开学搭子",
        keyword: "元气可爱",
        subtitle: "新学期第一眼就要清爽在线",
        products: ["学院感上衣", "帆布包", "发夹"],
        icon: "📖"
      },
      dorm: {
        persona: "松弛宅家搭子",
        keyword: "松弛休闲",
        subtitle: "舒服才是今天的主旋律",
        products: ["宽松T恤", "居家短裤", "毛绒抱枕"],
        icon: "🛋️"
      },
      street: {
        persona: "拍照出片搭子",
        keyword: "甜酷出街",
        subtitle: "轻松出门，也要拍照好看",
        products: ["短袖T恤", "斜挎包", "墨镜"],
        icon: "📷"
      },
      date: {
        persona: "心动细节搭子",
        keyword: "精致细节",
        subtitle: "把心动藏进每一个小细节",
        products: ["针织上衣", "项链", "腮红"],
        icon: "💐"
      }
    };

    const loadingAssets = {
      school: { base: "images/开学第一天-生成页/", main: "图层 1.png", mystery: "图层 2.png" },
      dorm: { base: "images/宿舍松弛日-正在生成页/", main: "图层 1.png", mystery: "图层 2.png" },
      street: { base: "images/周末出街-正在生成页/", main: "图层 1.png", mystery: "图层 2.png" },
      date: { base: "images/约会-正在生成页/", main: "图层 1.png" }
    };

    const generatePersonaAssets = {
      school: "images/第五页/开学.png",
      dorm: "images/第五页/宿舍.png",
      street: "images/第五页/周末.png",
      date: "images/第五页/约会.png"
    };

    const resultAssets = {
      school: {
        base: "images/开学第一天-搭案/",
        main: "图层 1.png",
        products: ["图层 2.png", "图层 3.png"]
      },
      dorm: {
        base: "images/宿舍松弛日-搭案/",
        main: "图层 1.png",
        products: ["图层 2.png", "图层 3.png", "图层 4.png", "图层 5.png"]
      },
      street: {
        base: "images/周末出街-搭案/",
        main: "图层 1.png",
        products: ["图层 2.png", "图层 3.png", "图层 4.png", "图层 5.png", "图层 6.png", "图层 7.png"]
      },
      date: {
        base: "images/约会-搭案/",
        main: "图层 1.png",
        products: ["图层 2.png"]
      }
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
      "slide-generate-persona",
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

    function getSceneResult() {
      return sceneResults[getScene().id] || sceneResults.street;
    }

    function getLoadingAssets() {
      return loadingAssets[getScene().id] || loadingAssets.street;
    }

    function getGeneratePersonaAsset() {
      return generatePersonaAssets[getScene().id] || generatePersonaAssets.street;
    }

    function getResultAssets() {
      return resultAssets[getScene().id] || resultAssets.street;
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
            <img class="home-asset-bg" src="${assetUrl("images/第一页/图层 6.png")}" alt="">
            <img class="home-asset home-asset-title" src="${assetUrl("images/第一页/图层 3.png")}" alt="生活新「搭」案局">
            <img class="home-asset home-asset-girl" src="${assetUrl("images/第一页/图层 5.png")}" alt="可爱女生与潮趣好物主视觉">
            <img class="home-asset home-asset-gift" src="${assetUrl("images/第一页/图层 1.png")}" alt="">
            <img class="home-asset home-asset-bag" src="${assetUrl("images/第一页/图层 2.png")}" alt="">
            <img class="home-asset home-asset-shopbag" src="${assetUrl("images/第一页/图层 4.png")}" alt="">
            <img class="home-asset home-asset-teddy" src="${assetUrl("images/第一页/图层 7.png")}" alt="">
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
          <img class="intro-asset intro-asset-main" src="${assetUrl("images/第二页/图层 1.png")}" alt="今天你要主什么局说明主视觉">
          <img class="intro-asset intro-asset-lip" src="${assetUrl("images/第二页/图层 2.png")}" alt="">
          <img class="intro-asset intro-asset-accessory" src="${assetUrl("images/第二页/图层 3.png")}" alt="">
          <img class="intro-asset intro-asset-bag" src="${assetUrl("images/第二页/图层 4.png")}" alt="">
          <div class="intro-copy-overlay" aria-label="主局说明文案">
            <p>生活每天都不一样，心情也会换频道～</p>
            <p>学习、约会、旅行、宅家、聚会 ...</p>
            <p>每个场景，都值得精心搭配。</p>
            <p>三福陪你一起，用穿搭、配饰、美妆、</p>
            <p>潮玩和惊喜好礼，为每一天打call!</p>
            <p>你的潮趣搭子已上线，</p>
            <p>准备好主宰你的精彩生活了吗?</p>
          </div>
          <button class="gradient-btn intro-hit" type="button" data-go="${PAGE.SCENE}" aria-label="选择生活场景">选择生活场景</button>
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
          <button class="gradient-btn" type="button" data-go="${PAGE.SCENE}">✨ 选择生活场景 ✨</button>
        </div>
      `);
    }

    // 必须实现：第 3 页：生活场景选择页
    function renderSceneSelect() {
      const cards = scenes.map(scene => `
        <button class="scene-card ${userState.selectedScene === scene.id ? "active" : ""}" style="--scene-bg:${scene.bg}" type="button" data-scene="${scene.id}">
          <span class="scene-check">✓</span>
          <span class="scene-visual">
            ${sceneSelectAssets[scene.id] ? `<img class="scene-asset-img" src="${assetUrl(sceneSelectAssets[scene.id])}" alt="">` : scene.icon}
          </span>
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
            <img class="story-frame-img" src="${assetUrl(assetSet.base + file)}" alt="">
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
        ? assetSet.decorations.map((file, index) => `<img class="story-asset-deco story-asset-deco-${index + 1}" src="${assetUrl(assetSet.base + file)}" alt="">`).join("")
        : "";

      return pageWrap(`story-page ${assetSet ? "story-assets-page" : ""}`, `
        <h1 class="sticker-title tiny"><span class="pink">${scene.name}</span></h1>
        <div class="ribbon mint">${scene.sub} ☺</div>
        ${decorations}
        <section class="story-list">${cards}</section>
        <div class="btn-row">
          <button class="gradient-btn" type="button" data-go="${PAGE.GENERATE_PERSONA}">✨ 生成我的搭案人格 ✨</button>
        </div>
      `);
    }

    // 必须实现：第 5 页：生成搭案人格页
    function renderGeneratePersona() {
      const scene = getScene();
      const asset = getGeneratePersonaAsset();

      return pageWrap("market-page generate-persona-page", `
        ${pageTag(5)}
        <h1 class="sticker-title tiny"><span class="black">点击</span><span class="pink">生成</span><span class="mint">搭案人格</span></h1>
        <div class="ribbon">根据你的生活场景，生成今日专属生活新「搭」案</div>
        <section class="generate-persona-card generate-persona-visual">
          <img class="generate-persona-img" src="${assetUrl(asset)}" alt="${scene.name}生成搭案人格主视觉">
          <div class="generate-persona-overlay">
            <div class="generate-scene-copy">
              <p>你的生活场景</p>
              <strong>${scene.name}</strong>
            </div>
            <ul class="generate-list">
              <li>即将生成：搭案人格</li>
              <li>即将生成：今日关键词</li>
              <li>即将生成：专属搭案卡</li>
            </ul>
            <button class="gradient-btn" type="button" data-action="startGenerate">✨ 开始生成 ✨</button>
          </div>
        </section>
      `);
    }

    // 必须实现：第 8 页：搭案人格生成页
    function renderLoading() {
      const scene = getScene();
      const result = userState.generatedPersonality?.persona ? userState.generatedPersonality : getSceneResult();
      const assets = getLoadingAssets();
      const mysteryImage = assets.mystery
        ? `<img class="loading-mystery-img" src="${assetUrl(assets.base + assets.mystery)}" alt="">`
        : `<div class="mystery-shadow">?</div>`;

      return pageWrap("loading-page", `
        <h1 class="sticker-title tiny"><span class="black">你的</span><span class="pink">搭案人格</span><br><span class="mint">正在生成</span></h1>
        <section class="loading-visual-card dashed-card">
          <img class="loading-main-img" src="${assetUrl(assets.base + assets.main)}" alt="${scene.name}搭案人格生成主视觉">
          <div class="analysis-panel">
            <div class="analysis-row">📍 你的场景：${scene.name}</div>
            <div class="analysis-row"># 搭案类型：${result.persona}</div>
            <div class="analysis-row">〰 正在分析你的生活新「搭」案……</div>
          </div>
          <div class="loading-bar">
            <div class="loading-track"><div class="loading-fill"></div></div>
            <div class="loading-percent">0%</div>
          </div>
        </section>
        <section class="mystery-card dashed-card">
          ${mysteryImage}
          <div>
            <p>你的搭案人格是——</p>
            <strong>“${result.persona}”</strong>
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
      const result = userState.generatedPersonality?.persona ? userState.generatedPersonality : getSceneResult();
      const assets = getResultAssets();

      const productList = result.products.map((product, index) => `
        <div class="result-product">
          ${assets.products[index] ? `<img class="result-product-img" src="${assetUrl(assets.base + assets.products[index])}" alt="">` : `<span>${result.icon}</span>`}
          ${product}
        </div>
      `).join("");

      const tags = result.keyword.split(/\s+/).map(tag => `<span class="mini-tag">${tag}</span>`).join("");

      return pageWrap("result-page", `
        <h1 class="sticker-title tiny"><span class="black">我的</span><span class="mint">生活新</span><span class="pink">「搭」</span><span class="black">案</span></h1>
        <div class="ribbon">你的专属搭案已生成！</div>
        <section class="result-card dashed-card" id="resultCard">
          <div class="result-hero">
            <div class="result-media">
              <img class="result-main-img" src="${assetUrl(assets.base + assets.main)}" alt="${scene.name}生活新搭案主视觉">
            </div>
            <div>
              <h2 class="result-title">${result.persona}</h2>
              <div class="result-style">${result.keyword}</div>
              <div class="tag-row">${tags}</div>
            </div>
          </div>
          <div class="tag-row">
            <span class="mini-tag">场景：${scene.name}</span>
            <span class="mini-tag">副标题：${result.subtitle}</span>
            <span class="mini-tag">人格：${result.persona}</span>
          </div>
          <div class="result-products">${productList}</div>
          <p class="result-copy">
            ${result.subtitle}<br>
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
        renderGeneratePersona,
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
      updateMusicButtons();
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

    // 必须实现：根据生活场景自动生成人格结果
    function generateResult() {
      userState.generatedPersonality = getSceneResult();
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
        if (!userState.generatedPersonality?.persona) userState.generatedPersonality = null;
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
      generateResult();
      goTo(PAGE.LOADING);
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
          event.stopPropagation();
          toggleMusic();
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
        case "startGenerate":
          loadingStarted = false;
          generateResult();
          goTo(PAGE.LOADING);
          break;
        case "clearProducts":
          clearProducts();
          break;
        case "confirmOutfit":
          confirmOutfit();
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
        allowTouchMove: false,
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
      updateMusicButtons();
    }
  let bgmStartedOnce = false;

function getBgm() {
  return document.getElementById("bgm");
}

function getFloatingMusicBtn() {
  return document.getElementById("musicBtn");
}

function updateMusicButtons() {
  const bgm = getBgm();
  const isActuallyPlaying = Boolean(bgm && !bgm.paused);

  document.querySelectorAll('[data-action="toggleMusic"]').forEach(btn => {
    if (btn.id === "musicBtn") return;

    btn.innerHTML = `🎵 ${isActuallyPlaying ? "音乐开" : "音乐关"}`;
    btn.classList.toggle("music-active", isActuallyPlaying);
  });

  const floatingBtn = getFloatingMusicBtn();
  if (floatingBtn) {
    floatingBtn.classList.toggle("is-playing", isActuallyPlaying);
    floatingBtn.textContent = isActuallyPlaying ? "♫" : "♪";
    floatingBtn.setAttribute("aria-label", isActuallyPlaying ? "暂停音乐" : "播放音乐");
  }
}

async function playBgm() {
  const bgm = getBgm();
  if (!bgm) return;

  try {
    bgm.volume = 0.35;
    await bgm.play();

    userState.musicOn = true;
    bgmStartedOnce = true;
    saveState();
    updateMusicButtons();
    showToast("音乐已开启");
  } catch (error) {
    updateMusicButtons();
    console.log("浏览器限制自动播放，需要用户点击后播放音乐。");
  }
}

function pauseBgm() {
  const bgm = getBgm();
  if (!bgm) return;

  bgm.pause();

  userState.musicOn = false;
  saveState();
  updateMusicButtons();
  showToast("音乐已关闭");
}

function toggleMusic() {
  const bgm = getBgm();
  if (!bgm) return;

  if (bgm.paused) {
    playBgm();
  } else {
    pauseBgm();
  }
}

function unlockBgmOnce() {
  if (!bgmStartedOnce && userState.musicOn) {
    playBgm();
  }
}

document.addEventListener("click", unlockBgmOnce, { once: true });
document.addEventListener("touchstart", unlockBgmOnce, { once: true });
/* 浏览器前进 / 后退适配：Edge、Chrome、Safari 通用 */
(function enableBrowserHistoryForSwiper() {
  const HISTORY_PREFIX = "page-";
  let isHistoryChanging = false;
  let lastHistoryPage = null;

  function isValidPage(page) {
    return Number.isInteger(page) && page >= PAGE.HOME && page <= PAGE.RESULT;
  }

  function getCurrentPage() {
    if (swiper && typeof swiper.activeIndex === "number") {
      return swiper.activeIndex;
    }

    return userState.currentPage || PAGE.HOME;
  }

  function getPageFromHash() {
    const match = location.hash.match(/^#page-(\d+)$/);

    if (!match) {
      return PAGE.HOME;
    }

    const page = Number(match[1]);
    return isValidPage(page) ? page : PAGE.HOME;
  }

  function writeHistory(page, replace = false) {
    if (!isValidPage(page)) return;
    if (lastHistoryPage === page && !replace) return;

    const url = new URL(location.href);
    url.hash = `${HISTORY_PREFIX}${page}`;

    const state = {
      sanfuPage: page
    };

    if (replace) {
      history.replaceState(state, "", url);
    } else {
      history.pushState(state, "", url);
    }

    lastHistoryPage = page;
  }

  function goToHistoryPage(page) {
    if (!isValidPage(page)) return;
    if (!swiper || typeof swiper.slideTo !== "function") return;

    isHistoryChanging = true;

    userState.currentPage = page;
    swiper.slideTo(page, 420);

    setTimeout(() => {
      isHistoryChanging = false;
    }, 460);
  }

  function initHistory() {
    if (!swiper || typeof swiper.on !== "function") {
      setTimeout(initHistory, 80);
      return;
    }

    const initialPage = getPageFromHash();

    userState.currentPage = initialPage;
    swiper.slideTo(initialPage, 0);
    writeHistory(initialPage, true);

    swiper.on("slideChange", function () {
      if (isHistoryChanging) return;

      const page = getCurrentPage();
      userState.currentPage = page;
      writeHistory(page);
    });

    window.addEventListener("popstate", function (event) {
      const pageFromState = event.state && Number.isInteger(event.state.sanfuPage)
        ? event.state.sanfuPage
        : getPageFromHash();

      goToHistoryPage(pageFromState);
    });
  }

  initHistory();
})();

    // 这些函数暴露到 window，方便调试或对接后续活动平台。
    // Expose functions for debugging and campaign platform integration.
    globalThis.renderHome = renderHome;
    globalThis.renderIntro = renderIntro;
    globalThis.renderSceneSelect = renderSceneSelect;
    globalThis.renderStoryPage = renderStoryPage;
    globalThis.renderGeneratePersona = renderGeneratePersona;
    globalThis.renderLoading = renderLoading;
    globalThis.renderResult = renderResult;
    globalThis.selectScene = selectScene;
    globalThis.selectProduct = selectProduct;
    globalThis.removeProduct = removeProduct;
    globalThis.clearProducts = clearProducts;
    globalThis.selectStyle = selectStyle;
    globalThis.generateResult = generateResult;
    globalThis.assetUrl = assetUrl;
    globalThis.saveState = saveState;
    globalThis.loadState = loadState;
    globalThis.resetGame = resetGame;
    globalThis.showToast = showToast;

    window.addEventListener("resize", fitStageToViewport);
    window.visualViewport?.addEventListener("resize", fitStageToViewport);
    boot();
  
