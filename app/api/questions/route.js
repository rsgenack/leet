const USERS = ["jormarcus", "kbrien11", "rgnack", "shugums"];
const URL = 'https://leetcode.com/graphql/';
const HEADERS = { 'Content-Type': 'application/json' };

const RECENT_SUBMISSION_QUERY = `
query recentSubmissionList($username: String!, $limit: Int!) {
  recentSubmissionList(username: $username, limit: $limit) {
    id
    title
    titleSlug
    status
    timestamp
  }
}`;

const QUESTION_INFO_QUERY = `
query questionInfo($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    questionFrontendId
    title
    titleSlug
    difficulty
  }
}`;

const STATUS_MAP = {
    "AC": "Accepted",
    "WA": "Wrong Answer",
    "TLE": "Time Limit Exceeded",
    "MLE": "Memory Limit Exceeded",
    "RE": "Runtime Error",
    "CE": "Compile Error",
    "PE": "Presentation Error",
    "OE": "Output Limit Exceeded",
    "SE": "System Error",
    10: "Accepted",
    11: "Wrong Answer",
    12: "Time Limit Exceeded",
    13: "Memory Limit Exceeded",
    14: "Runtime Error",
    15: "Compile Error",
    16: "Presentation Error",
    17: "Output Limit Exceeded",
    20: "System Error"
};

let cachedQuestions = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in ms

async function fetchWithRetries(payload, headers = HEADERS, maxRetries = 3, baseDelay = 1000) {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers,
                body: JSON.stringify(payload),
                // timeout: 10000 // Not supported in Next.js fetch
            });
            if (response.status === 200) {
                return await response.json();
            }
        } catch (e) {
            // ignore, will retry
        }
        const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
        await new Promise(res => setTimeout(res, delay));
    }
    throw new Error('Max retries exceeded. Failed to fetch data.');
}

async function fetchRecentSubmissions(username, limit = 1000) {
    const payload = {
        query: RECENT_SUBMISSION_QUERY,
        variables: { username, limit }
    };
    const data = await fetchWithRetries(payload, HEADERS);
    return data.data.recentSubmissionList;
}

async function fetchQuestionInfo(titleSlug) {
    const payload = {
        query: QUESTION_INFO_QUERY,
        variables: { titleSlug }
    };
    const data = await fetchWithRetries(payload);
    const q = data.data.question;
    if (!q) return null;
    return {
        frontendQuestionId: q.questionFrontendId,
        title: q.title,
        titleSlug: q.titleSlug,
        difficulty: q.difficulty
    };
}

export async function GET() {
    // Check cache
    if (cachedQuestions && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
        return new Response(JSON.stringify(cachedQuestions), {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' }
        });
    }
    const questionUserStatus = {};
    for (const user of USERS) {
        let submissions = [];
        try {
            submissions = await fetchRecentSubmissions(user, 1000);
        } catch (e) {
            continue;
        }
        for (const sub of submissions) {
            const slug = sub.titleSlug;
            const ts = parseInt(sub.timestamp);
            let statusKey = sub.status;
            if (!isNaN(Number(statusKey))) statusKey = Number(statusKey);
            const statusFull = STATUS_MAP[statusKey] || String(sub.status);
            if (!questionUserStatus[slug]) questionUserStatus[slug] = {};
            if (!questionUserStatus[slug][user] || ts > questionUserStatus[slug][user][1]) {
                questionUserStatus[slug][user] = [statusFull, ts];
            }
        }
    }
    // Only keep questions with 2 or more users
    const filtered = Object.entries(questionUserStatus).filter(([slug, users]) => Object.keys(users).length >= 2);
    const results = [];
    for (const [slug, userStatuses] of filtered) {
        const qinfo = await fetchQuestionInfo(slug);
        if (!qinfo) continue;
        const entry = { ...qinfo };
        for (const user of USERS) {
            entry[user] = userStatuses[user] ? userStatuses[user][0] : null;
        }
        results.push(entry);
    }
    cachedQuestions = results;
    cacheTimestamp = Date.now();
    return new Response(JSON.stringify(results), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' }
    });
} 