const LS_KEY = "blink_posts_v1";

function readAll() {
    try {
        return JSON.parse(localStorage.getItem(LS_KEY)) || {};
    } catch {
        return {};
    }
}

function writeAll(map) {
    localStorage.setItem(LS_KEY, JSON.stringify(map));
}

// Create or update a post (idempotent by slug)
export function savePost(post) {
    const all = readAll();
    all[post.slug] = post;
    writeAll(all);
    return post;
}

export function getPost(slug) {
    const all = readAll();
    return all[slug] || null;
}

export function getAllPostsNewestFirst() {
    const all = Object.values(readAll());
    return all.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

export function deletePost(slug) {
    const all = readAll();
    if (all[slug]) {
        delete all[slug];
        writeAll(all);
        return true;
    }
    return false;
}

export function ensureDemoSeed() {
    const all = readAll();
    if (Object.keys(all).length > 0) return;

    const now = new Date().toISOString();
    const demo = {
        slug: "welcome-to-blink",
        title: "Welcome to Blink Micro Blog",
        content: "This is a demo post seeded locally.\n\nTry editing me on the right, or create a new post.",
        tags: ["demo", "hello"],
        coverUrl: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop",
        createdAt: now,
        updatedAt: now,
    };
    savePost(demo);
}
