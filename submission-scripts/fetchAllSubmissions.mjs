#!/usr/bin/env node

const BASE_URL = "https://leetcode.com"
const GRAPHQL_URL = "https://leetcode.com/graphql"
const USER_AGENT = "Mozilla/5.0 (Node.js script)"

async function fetchSubmissions(username) {
  let all = []
  let hasNext = true
  let lastKey = null
  const limit = 50

  while (hasNext) {
    const query = `
      query submissionList($username: String!, $limit: Int!, $lastKey: String) {
        submissionList(username: $username, limit: $limit, lastKey: $lastKey) {
          submissions {
            id
            title
            titleSlug
            timestamp
            statusDisplay
            lang
            runtime
            memory
          }
          lastKey
          hasNext
        }
      }
    `
    const vars = { username, limit, lastKey }
    const res = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": USER_AGENT,
        "Referer": BASE_URL
      },
      body: JSON.stringify({ query, variables: vars })
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const body = await res.json()
    const data = body.data.submissionList
    all = all.concat(data.submissions)
    hasNext = data.hasNext
    lastKey = data.lastKey
    console.error(`fetched ${all.length} so far…`)
  }

  return all
}

async function main() {
  try {
    const user = "rgnack"
    const subs = await fetchSubmissions(user)
    console.error(`✅ total submissions for ${user}: ${subs.length}`)
    console.log(JSON.stringify(subs, null, 2))
  } catch (e) {
    console.error("❌", e)
    process.exit(1)
  }
}

main()

