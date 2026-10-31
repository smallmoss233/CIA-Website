// ============================================================
// DOCTOR M / CIA 组织站 - 交互脚本
// ============================================================

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
