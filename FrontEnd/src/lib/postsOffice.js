const LS_KEY = "blink_posts_v2";

// UUID helper
function uuid() {
    return crypto.randomUUID();
}

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

// Save or update a post (ID-based)
export function savePost(post) {
    const all = readAll();

    // If new post, assign an ID
    if (!post.id) {
        post.id = uuid();
    }

    post.updatedAt = new Date().toISOString();

    if (!post.createdAt) {
        post.createdAt = post.updatedAt;
    }

    all[post.id] = post;
    writeAll(all);
    return post;
}

// Read single post by ID
export function getPost(id) {
    const all = readAll();
    return all[id] || null;
}

// Sort latest to oldest
export function getAllPostsNewestFirst() {
    return Object.values(readAll()).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

// Delete post by ID
export function deletePost(id) {
    const all = readAll();
    if (all[id]) {
        delete all[id];
        writeAll(all);
        return true;
    }
    return false;
}

// Create a demo post only if DB is empty
export function ensureDemoSeed() {
    const all = readAll();
    if (Object.keys(all).length > 0) return;

    const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString();
const now = new Date().toISOString();
    const demo = {
        id: uuid(),
        title: "Welcome to Blink Micro Blog",
        content: "This is a demo post stored locally.\n\nTry creating a new story from the sidebar!",
        tags: ["demo", "hello"],
        coverUrl: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop",
        createdAt: now,
        updatedAt: now,
    };

    savePost(demo);
}
