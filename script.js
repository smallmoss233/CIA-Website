// ============================================================
// DOCTOR M / CIA 组织站 - 交互脚本
// ============================================================

// ==================== 多语言翻译字典 ====================
const TRANSLATIONS = {
    'zh-CN': {
        'meta.title': '天体干预局 | Celestial Intervention Agency',
        'nav.home': '首页',
        'nav.about': '关于',
        'nav.members': '成员',
        'nav.works': '作品',
        'nav.discord': 'Discord',
        'nav.personal': '组长的个人站：P',
        'hero.greeting': 'C E L E S T I A L',
        'hero.title': '天体干预局',
        'hero.title-en': 'Celestial Intervention Agency',
        'hero.subtitle': '《神秘博士》为主题的 Minecraft 开发团队',
        'hero.tag.fabric': 'Fabric Mod',
        'hero.tag.fabric-tooltip': '模组开发',
        'hero.tag.modpack': 'Modpack',
        'hero.tag.modpack-tooltip': '整合包制作',
        'hero.tag.localization': 'Localization',
        'hero.tag.localization-tooltip': '汉化与本地化',
        'hero.tag.worldbuilding': 'Worldbuilding',
        'hero.tag.worldbuilding-tooltip': '世界观与设定',
        'hero.tag.art': 'Art & Model',
        'hero.tag.art-tooltip': '美术与模型',
        'about.title': '关于我们',
        'about.intro1': '天体干预局（Celestial Intervention Agency）是一个极其开放的《神秘博士》× Minecraft 社区。当然不只是 Doctor Who 和 MC——你也可以发送这些主题之外的内容，我们不限制。',
        'about.intro2': '群内的内容包括但不限于：游戏、猎奇、OC 设定、同人创作……其内鱼龙混杂，啥物种都有，还望来玩的小伙伴们玩得开心。',
        'about.label.founded': '成立',
        'about.label.members': '拥有贡献的成员',
        'about.label.works': '作品',
        'about.value.members': '11 人',
        'about.value.works': '1 个',
        'about.tooltip.founded': '2024年9月30日成立~',
        'about.tooltip.members': '拥有贡献的成员',
        'about.tooltip.works': '只有个DOCTOR M ：P',
        'about.join.title': '名字来源',
        'about.join.quote': '<span class="quote-mark">“</span>知晓 DW，哪怕只是表面也可以。<br>知道冷门设定最好。<span class="quote-mark">”</span>',
        'about.join.source': '— 加入条件',
        'lore.title': '组织档案 · 天体干预局',
        'lore.label.name': '组织名称',
        'lore.label.type': '组织类型',
        'lore.label.founded': '创立时间',
        'lore.label.headquarters': '总部地点',
        'lore.label.nature': '组织性质',
        'lore.label.mission': '核心任务',
        'lore.label.motto': '宗旨',
        'lore.value.name': '天体干预局 · Celestial Intervention Agency (CIA)',
        'lore.value.type': '情报机构',
        'lore.value.founded': '古代伽里弗雷，可追溯至拉斯隆时期，由拉斯隆的近卫队精英成员演变而来',
        'lore.value.headquarters': 'Gallifrey',
        'lore.value.nature': '表面上是公开记录在案的组织，但行动具有秘密性质；最高议会对外否认其存在',
        'lore.value.mission': '保卫时间领主社会免受威胁；保护时间之网；捍卫时间领主统治宇宙的历史',
        'lore.value.motto': '"The story changes, the ending stays the same"',
        'lore.value.motto-zh': '情节改变，结局不变——允许改变历史细节，但确保整体结果恒定',
        'members.title': '成员',
        'members.subtitle': '天体干预局的每一位有贡献成员。',
        'members.group.core': '核心开发者',
        'members.group.contributor': '贡献者',
        'members.group.special': '特别',
        'works.title': '作品',
        'works.subtitle': '天体干预局免费发布的作品。如遇付费二次分发，请联系我们。',
        'works.label.downloads': '下载',
        'works.doctorm.desc': 'AIT 扩展模组，让 AIT 变得更好更棒！',
        'join.title': '加入我们',
        'join.intro': '如果你热爱《神秘博士》，并且想为 Minecraft 创作做点什么——无论是模组开发、美术、汉化、还是世界观设定——欢迎加入天体干预局。',
        'join.github': 'GitHub',
        'join.github-desc': '查看我们的代码',
        'join.bilibili': 'B站',
        'join.bilibili-desc': '关注我们的动态',
        'join.qq': 'QQ 群',
        'join.qq-desc': '群号：654700630',
        'join.discord': 'Discord',
        'join.discord-loading': '加载中…',
        'footer.copyright': '© 2026 天体干预局 · Celestial Intervention Agency',
        'misc.loading': '加载中…'
    },
    'en': {
        'meta.title': 'Celestial Intervention Agency | 天体干预局',
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.members': 'Members',
        'nav.works': 'Works',
        'nav.discord': 'Discord',
        'nav.personal': "Organizer's Personal Site :P",
        'hero.greeting': 'C E L E S T I A L',
        'hero.title': '天体干预局',
        'hero.title-en': 'Celestial Intervention Agency',
        'hero.subtitle': 'Doctor Who themed Minecraft Development Team',
        'hero.tag.fabric': 'Fabric Mod',
        'hero.tag.fabric-tooltip': 'Mod Development',
        'hero.tag.modpack': 'Modpack',
        'hero.tag.modpack-tooltip': 'Modpack Production',
        'hero.tag.localization': 'Localization',
        'hero.tag.localization-tooltip': 'Localization',
        'hero.tag.worldbuilding': 'Worldbuilding',
        'hero.tag.worldbuilding-tooltip': 'Worldbuilding',
        'hero.tag.art': 'Art & Model',
        'hero.tag.art-tooltip': 'Art & Model',
        'about.title': 'About Us',
        'about.intro1': 'The Celestial Intervention Agency is an extremely open Doctor Who × Minecraft community. Not just Doctor Who and MC——you can also send content beyond these themes, we do not restrict.',
        'about.intro2': 'Content within includes but is not limited to: games, curiosities, OC settings, fan creations……it is a mix of all kinds, whatever species, we hope friends who come to play have fun.',
        'about.label.founded': 'Founded',
        'about.label.members': 'Contributing Members',
        'about.label.works': 'Works',
        'about.join.title': 'Name Origin',
        'about.join.quote': '<span class="quote-mark">“</span>Know DW, even if only superficially.<br>It\'s best to know obscure settings.<span class="quote-mark">”</span>',
        'about.join.source': '— Join Condition',
        'lore.title': 'Organization Profile · Celestial Intervention Agency',
        'lore.label.name': 'Organization Name',
        'lore.label.type': 'Organization Type',
        'lore.label.founded': 'Founded',
        'lore.label.headquarters': 'Headquarters',
        'lore.label.nature': 'Nature',
        'lore.label.mission': 'Core Mission',
        'lore.label.motto': 'Motto',
        'lore.value.name': 'Celestial Intervention Agency (CIA)',
        'lore.value.type': 'Intelligence Agency',
        'lore.value.founded': 'Ancient Gallifrey, traceable to the Rassilon era, evolved from Rassilon\'s elite guard members',
        'lore.value.headquarters': 'Gallifrey',
        'lore.value.nature': 'Officially recorded on the surface, but actions are secretive; the High Council denies its existence externally',
        'lore.value.mission': 'Defend Time Lord society from threats; protect the Web of Time; defend Time Lord rule over the history of the universe',
        'lore.value.motto': '"The story changes, the ending stays the same"',
        'lore.value.motto-zh': 'The plot changes, but the ending remains the same - historical details may be altered, but the overall result is constant',
        'members.title': 'Members',
        'members.subtitle': 'Every contributing member of the Celestial Intervention Agency.',
        'members.group.core': 'Core Developers',
        'members.group.contributor': 'Contributors',
        'members.group.special': 'Special',
        'works.title': 'Works',
        'about.value.members': '11 Members',
        'about.value.works': '1 Work',
        'about.tooltip.founded': 'Founded on Sept 30, 2024',
        'about.tooltip.members': 'Contributing Members',
        'about.tooltip.works': 'Only DOCTOR M :P',
        'works.subtitle': 'Works freely released by the Celestial Intervention Agency. If you encounter paid secondary distribution, please contact us.',
        'works.label.downloads': 'Downloads',
        'works.doctorm.desc': 'An AIT expansion mod, making AIT even better!',
        'join.title': 'Join Us',
        'join.intro': 'If you love Doctor Who, and want to do something for Minecraft creation——whether mod development, art, localization, or worldbuilding——welcome to join the Celestial Intervention Agency.',
        'join.github': 'GitHub',
        'join.github-desc': 'View our code',
        'join.bilibili': 'Bilibili',
        'join.bilibili-desc': 'Follow our updates',
        'join.qq': 'QQ Group',
        'join.qq-desc': 'Group: 654700630',
        'join.discord': 'Discord',
        'join.discord-loading': 'Loading…',
        'footer.copyright': '© 2026 Celestial Intervention Agency | 天体干预局',
        'misc.loading': 'Loading…'
    }
};

const LANG_KEY = 'cia_lang';

function detectLanguage() {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored && TRANSLATIONS[stored]) return stored;

    const navLang = navigator.language || navigator.userLanguage;
    if (navLang && navLang.toLowerCase().startsWith('zh')) return 'zh-CN';
    return 'en';
}

function applyLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;

    // 更新 html lang
    document.documentElement.lang = lang;

    // 遍历所有带 data-i18n 的元素
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = TRANSLATIONS[lang][key];
        if (value === undefined) return;

        // ★ 优先判断翻译文本里是否含有 HTML 标签（如引用块里的 span 和 br）
        // 如果有，直接整体覆盖，这样样式和换行才能生效
        if (/<[a-z][\s\S]*>/i.test(value)) {
            el.innerHTML = value;
        }
        // 其次判断元素内部是否有子元素（如主标题里的 span），保留结构只替换文字
        else if (el.children.length > 0) {
            el.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                    node.textContent = value;
                }
            });
        }
        // 普通情况，直接替换文本
        else {
            el.textContent = value;
        }
    });

    // 遍历所有带 data-i18n-tooltip 的元素，更新其 title/tooltip
    document.querySelectorAll('[data-i18n-tooltip]').forEach(el => {
        const key = el.getAttribute('data-i18n-tooltip');
        const value = TRANSLATIONS[lang][key];
        if (value === undefined) return;
        el.setAttribute('data-tooltip', value);
        el.setAttribute('title', value);
    });

    // 更新页面标题
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) {
        document.title = TRANSLATIONS[lang]['meta.title'];
    }

    localStorage.setItem(LANG_KEY, lang);
}

// ==================== 公共：带缓存 fetch ====================
async function fetchWithCache(url, cacheKey, ttl, options) {
    try {
        const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null');
        if (cached && (Date.now() - cached.time < ttl)) {
            return cached.data;
        }
    } catch (e) {}

    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    try {
        localStorage.setItem(cacheKey, JSON.stringify({
            time: Date.now(),
            data
        }));
    } catch (e) {}

    return data;
}

// ==================== HTML 转义 ====================
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ==================== 主入口 ====================
document.addEventListener('DOMContentLoaded', () => {

    // ---------- 多语言自动匹配 ----------
    const lang = detectLanguage();
    applyLanguage(lang);

    // ---------- 语言切换按钮 ----------
    const langBtn = document.getElementById('lang-switcher');
    if (langBtn) {
        const langText = langBtn.querySelector('.lang-text');
        function updateLangBtn() {
            const current = localStorage.getItem(LANG_KEY) || detectLanguage();
            langText.textContent = current === 'zh-CN' ? 'EN' : '中';
        }
        updateLangBtn();
        langBtn.addEventListener('click', () => {
            const current = localStorage.getItem(LANG_KEY) || detectLanguage();
            const next = current === 'zh-CN' ? 'en' : 'zh-CN';
            applyLanguage(next);
            updateLangBtn();
        });
    }

    // ---------- 滚动显现 ----------
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(el => observer.observe(el));

    // ---------- 星点生成 ----------
    const starsContainer = document.querySelector('.stars');
    if (starsContainer) {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 90; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 2 + 0.5;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = (Math.random() * 3) + 's';
            star.style.animationDuration = (2 + Math.random() * 3) + 's';
            fragment.appendChild(star);
        }
        starsContainer.appendChild(fragment);
    }

    // ---------- 点击粒子效果（仅交互触发，不常驻） ----------
    initParticles();

    // ---------- 侧边导航高亮 ----------
    initSideNav();

    // ---------- Modrinth 下载量 ----------
    fetchModrinthDownloads();

    // ---------- Discord 在线人数 ----------
    fetchDiscordStatus();

    // ---------- 成员 Modrinth 头像 ----------
    fetchMemberProfiles();
});

// ==================== 粒子效果（点击触发，播完自动停止） ====================
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let width, height;
    let rafId = null;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#58a6ff', '#7c8cff', '#a855f7', '#c084fc', '#e0aaff'];

    function spawnParticles(x, y, count) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3 + 1;
            particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 0.5,
                size: Math.random() * 3 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 1,
                decay: 0.015 + Math.random() * 0.02
            });
        }
        if (!rafId) {
            animate();
        }
    }

    window.addEventListener('pointerdown', (e) => {
        const target = e.target;
        if (target.closest('a') || target.closest('button')) return;
        spawnParticles(e.clientX, e.clientY, 18);
    }, { passive: true });

    function animate() {
        ctx.clearRect(0, 0, width, height);

        let alive = 0;
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.03;
            p.vx *= 0.98;
            p.vy *= 0.98;
            p.life -= p.decay;

            if (p.life <= 0) {
                particles.splice(i, 1);
                continue;
            }

            alive++;
            ctx.save();
            ctx.globalAlpha = p.life;
            ctx.globalCompositeOperation = 'lighter';
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        if (alive > 0) {
            rafId = requestAnimationFrame(animate);
        } else {
            rafId = null;
        }
    }
}

// ==================== 侧边导航高亮 ====================
function initSideNav() {
    const sideLinks = document.querySelectorAll('.side-link');
    const sections = [...sideLinks]
        .map(link => document.getElementById(link.dataset.target))
        .filter(Boolean);

    if (sections.length === 0) return;

    function updateActiveSideLink() {
        const viewportMiddle = window.scrollY + window.innerHeight / 3;
        let current = sections[0].id;
        for (const section of sections) {
            if (section.offsetTop <= viewportMiddle) {
                current = section.id;
            }
        }
        sideLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.target === current);
        });
    }

    window.addEventListener('scroll', updateActiveSideLink, { passive: true });
    updateActiveSideLink();
}

// ==================== Modrinth 下载量 ====================
async function fetchModrinthDownloads() {
    const elements = document.querySelectorAll('[data-modrinth-project]');

    for (const el of elements) {
        const projectId = el.getAttribute('data-modrinth-project');
        if (!projectId) continue;

        try {
            const data = await fetchWithCache(
                `https://api.modrinth.com/v2/project/${projectId}`,
                `modrinth_${projectId}`,
                10 * 60 * 1000,   // 10 分钟缓存
                { headers: { 'Accept': 'application/json' } }
            );
            el.textContent = (data.downloads || 0).toLocaleString('en-US');
        } catch (e) {
            console.warn(`无法获取 ${projectId} 的下载量:`, e);
            el.textContent = 'N/A';
        }
    }
}

// ==================== Modrinth 成员头像/简介 ====================
const MEMBER_CACHE_KEY = 'cia_members_cache';
const MEMBER_CACHE_TTL = 24 * 60 * 60 * 1000;   // 24 小时

async function fetchMemberProfiles() {
    const cards = document.querySelectorAll('.member-card[data-modrinth]');
    if (cards.length === 0) return;

    let cache = {};
    try {
        const cached = JSON.parse(localStorage.getItem(MEMBER_CACHE_KEY) || 'null');
        if (cached && (Date.now() - cached.time < MEMBER_CACHE_TTL)) {
            cache = cached.data || {};
        }
    } catch (e) {}

    for (const card of cards) {
        const username = card.getAttribute('data-modrinth');
        if (!username) continue;

        if (cache[username]) {
            applyMemberData(card, cache[username]);
            continue;
        }

        try {
            const data = await fetchWithCache(
                `https://api.modrinth.com/v2/user/${username}`,
                `member_${username}`,
                MEMBER_CACHE_TTL,
                { headers: { 'Accept': 'application/json' } }
            );

            const profile = {
                avatar: data.avatar_url || '',
                bio: data.bio || '',
                username: data.username || username
            };

            cache[username] = profile;
            applyMemberData(card, profile);
        } catch (e) {
            console.warn(`无法获取 ${username} 的 Modrinth 资料:`, e);
        }
    }

    try {
        localStorage.setItem(MEMBER_CACHE_KEY, JSON.stringify({
            time: Date.now(),
            data: cache
        }));
    } catch (e) {}
}

function applyMemberData(card, profile) {
    // 头像
    const avatarEl = card.querySelector('.member-avatar');
    if (avatarEl && profile.avatar) {
        avatarEl.innerHTML = `<img src="${profile.avatar}" alt="" loading="lazy">`;
    }

    // 简介
    if (profile.bio) {
        const roleEl = card.querySelector('.member-role');
        if (roleEl) {
            roleEl.textContent = profile.bio;
        }
    }
}

// ==================== Discord 在线人数 ====================
const DISCORD_SERVER_ID = '1548521178006560831';
const DISCORD_CACHE_KEY = 'cia_discord_cache';
const DISCORD_CACHE_TTL = 5 * 60 * 1000;

async function fetchDiscordStatus() {
    const el = document.getElementById('discord-status');
    if (!el || !DISCORD_SERVER_ID) return;

    try {
        const data = await fetchWithCache(
            `https://discord.com/api/guilds/${DISCORD_SERVER_ID}/widget.json`,
            DISCORD_CACHE_KEY,
            DISCORD_CACHE_TTL
        );
        el.textContent = `${data.presence_count || 0} 人在线`;
    } catch (e) {
        console.warn('无法获取 Discord 状态:', e);
        el.textContent = '点击加入';
    }
}