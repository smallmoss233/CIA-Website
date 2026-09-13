document.addEventListener('DOMContentLoaded', () => {

    // ============ 滚动显现 ============
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

    // ============ 星点生成 ============
    const starsContainer = document.querySelector('.stars');
    if (starsContainer) {
        const starCount = 120;
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < starCount; i++) {
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

    // ============ 点击粒子效果 ============
    // ★ 用 if 包裹，而不是 return，避免截断后面的代码
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        let particles = [];
        let width, height;

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
                    decay: 0.012 + Math.random() * 0.02
                });
            }
        }

        window.addEventListener('pointerdown', (e) => {
            const target = e.target;
            if (target.closest('a') || target.closest('button')) return;
            spawnParticles(e.clientX, e.clientY, 25);
        });

        let lastSpawn = 0;
        window.addEventListener('pointermove', (e) => {
            const now = performance.now();
            if (now - lastSpawn < 60) return;
            lastSpawn = now;
            if (Math.abs(e.movementX) + Math.abs(e.movementY) > 15) {
                spawnParticles(e.clientX, e.clientY, 2);
            }
        });

        function animate() {
            ctx.clearRect(0, 0, width, height);

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

                ctx.save();
                ctx.globalAlpha = p.life;
                ctx.globalCompositeOperation = 'lighter';
                ctx.fillStyle = p.color;
                ctx.shadowBlur = 12;
                ctx.shadowColor = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            requestAnimationFrame(animate);
        }
        animate();
    }

    // ============ 从 Modrinth API 获取下载量 ============
    // ★ 直接调用，不再嵌套 DOMContentLoaded
    async function fetchModrinthDownloads() {
        const elements = document.querySelectorAll('[data-modrinth-project]');

        for (const el of elements) {
            const projectId = el.getAttribute('data-modrinth-project');
            if (!projectId) continue;

            try {
                const response = await fetch(`https://api.modrinth.com/v2/project/${projectId}`, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' }
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                const data = await response.json();
                const downloads = data.downloads;

                el.textContent = downloads.toLocaleString('en-US');
            } catch (error) {
                console.warn(`无法获取 ${projectId} 的下载量:`, error);
                el.textContent = 'N/A';
            }
        }
    }

    fetchModrinthDownloads();

    // ============ 侧边导航：滚动高亮 ============
    const sideLinks = document.querySelectorAll('.side-link');
    const sections = [...sideLinks]
        .map(link => document.getElementById(link.dataset.target))
        .filter(Boolean);

    if (sections.length > 0) {
        function updateActiveSideLink() {
            const scrollY = window.scrollY;
            const viewportMiddle = scrollY + window.innerHeight / 3;
            // ↑ 用 1/3 高度判断"当前在哪"，不是屏幕正中

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
        updateActiveSideLink();  // 初始化
    }

// ============ 最近提交 ============
async function fetchRecentCommits() {
    const list = document.getElementById('commit-list');
    if (!list) return;

    const username = 'smallmoss233';
    const maxCommits = 10;
    const CACHE_KEY = 'doctor_m_commits_cache';
    const CACHE_TTL = 5 * 60 * 1000;

    // 1. 读缓存
    try {
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
        if (cached && (Date.now() - cached.time < CACHE_TTL)) {
            renderCommits(list, cached.commits);
            return;
        }
    } catch (e) {}

    try {
        // 2. 拿最近更新的公开仓库
        const reposRes = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=15`,
            { headers: { 'Accept': 'application/vnd.github+json' } }
        );

        if (!reposRes.ok) throw new Error(`Repos HTTP ${reposRes.status}`);
        const repos = await reposRes.json();

        // ★★★ 关键：这里定义 ownRepos
        const ownRepos = repos.filter(r => !r.fork);

        // 3. 并行拉每个仓库里自己的最近 commits
        const allCommits = [];
        const promises = ownRepos.slice(0, 8).map(async repo => {
            try {
                const res = await fetch(
                    `https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&per_page=10`,
                    { headers: { 'Accept': 'application/vnd.github+json' } }
                );
                if (!res.ok) return [];
                const commits = await res.json();
                return commits.map(c => ({
                    message: (c.commit.message || '').split('\n')[0],
                    sha: c.sha.substring(0, 7),
                    repo: repo.name,
                    url: c.html_url,
                    date: c.commit.author?.date || ''
                }));
            } catch (e) {
                return [];
            }
        });

        const results = await Promise.all(promises);
        results.forEach(arr => allCommits.push(...arr));

        // 4. 按时间排序，取前 10
        allCommits.sort((a, b) => new Date(b.date) - new Date(a.date));
        const top = allCommits.slice(0, maxCommits);

        if (top.length === 0) {
            list.innerHTML = '<div class="commit-empty">最近没有公开提交</div>';
            return;
        }

        renderCommits(list, top);
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                time: Date.now(),
                commits: top
            }));
        } catch (e) {}

    } catch (err) {
        console.error('获取提交失败:', err);
        list.innerHTML = '<div class="commit-empty">暂时无法加载提交记录</div>';
    }
}

function renderCommits(list, commits) {
    list.innerHTML = commits.map(c => `
        <a class="commit-item" href="${c.url}" target="_blank" rel="noopener">
            <span class="commit-icon">◉</span>
            <span class="commit-message" title="${escapeHtml(c.message)}">${escapeHtml(c.message)}</span>
            <span class="commit-repo">${c.repo}</span>
            <span class="commit-hash">${c.sha}</span>
        </a>
    `).join('');
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

fetchRecentCommits();

});

// ============ 从 Modrinth 抓取成员头像和简介 ============
const MEMBER_CACHE_KEY = 'cia_members_cache';
const MEMBER_CACHE_TTL = 24 * 60 * 60 * 1000;   // 24 小时

async function fetchMemberProfiles() {
    const cards = document.querySelectorAll('.member-card[data-modrinth]');
    if (cards.length === 0) return;

    // 1. 先读缓存
    let cache = {};
    try {
        const cached = JSON.parse(localStorage.getItem(MEMBER_CACHE_KEY) || 'null');
        if (cached && (Date.now() - cached.time < MEMBER_CACHE_TTL)) {
            cache = cached.data || {};
        }
    } catch (e) {}

    // 2. 逐个处理
    for (const card of cards) {
        const username = card.getAttribute('data-modrinth');
        if (!username) continue;

        // 缓存里有，直接用
        if (cache[username]) {
            applyMemberData(card, cache[username]);
            continue;
        }

        // 没缓存，调 API
        try {
            const res = await fetch(`https://api.modrinth.com/v2/user/${username}`, {
                headers: { 'Accept': 'application/json' }
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data = await res.json();

            // 只提取需要的信息
            const profile = {
                avatar: data.avatar_url || '',
                bio: data.bio || '',
                username: data.username || username
            };

            cache[username] = profile;
            applyMemberData(card, profile);

        } catch (e) {
            console.warn(`无法获取 ${username} 的 Modrinth 资料:`, e);
            // 保留默认首字母
        }
    }

    // 3. 写回缓存
    try {
        localStorage.setItem(MEMBER_CACHE_KEY, JSON.stringify({
            time: Date.now(),
            data: cache
        }));
    } catch (e) {}
}

function applyMemberData(card, profile) {
    // 替换头像
    const avatarEl = card.querySelector('.member-avatar');
    if (avatarEl && profile.avatar) {
        avatarEl.innerHTML = `<img src="${profile.avatar}" alt="" loading="lazy">`;
    }

    // 替换简介（如果有的话）
    if (profile.bio) {
        const roleEl = card.querySelector('.member-role');
        if (roleEl) {
            roleEl.textContent = profile.bio;
        }
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    fetchMemberProfiles();
});

// ============ Discord 在线人数 ============
const DISCORD_SERVER_ID = '1548521178006560831';
const DISCORD_CACHE_KEY = 'cia_discord_cache';
const DISCORD_CACHE_TTL = 5 * 60 * 1000;

async function fetchDiscordStatus() {
    const el = document.getElementById('discord-status');
    if (!el || !DISCORD_SERVER_ID) return;   // ★ 只检查这两个

    try {
        const cached = JSON.parse(localStorage.getItem(DISCORD_CACHE_KEY) || 'null');
        if (cached && (Date.now() - cached.time < DISCORD_CACHE_TTL)) {
            el.textContent = cached.text;
            return;
        }
    } catch (e) {}

    try {
        const res = await fetch(`https://discord.com/api/guilds/${DISCORD_SERVER_ID}/widget.json`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const count = data.presence_count || 0;
        const text = `${count} 人在线`;

        el.textContent = text;

        try {
            localStorage.setItem(DISCORD_CACHE_KEY, JSON.stringify({
                time: Date.now(),
                text
            }));
        } catch (e) {}
    } catch (e) {
        console.warn('无法获取 Discord 状态:', e);
        el.textContent = '点击加入';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchDiscordStatus();
});