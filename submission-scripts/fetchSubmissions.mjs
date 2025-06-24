import { LeetCode } from './LeetCode-Query/lib/index.js'; // direct import to your local build

const usernames = ["jormarcus", "kbrien11", "rgnack", "shugums"];
const LIMIT = 50;

async function fetchGroupedSubmissions() {
  console.log("🔍 Starting submission fetch process...");
  const grouped = {};
  const lc = new LeetCode();

  for (const username of usernames) {
    console.log(`\n📥 Fetching submissions for user: ${username}`);

    try {
      const user = await lc.user(username);
      console.log(`→ User object created for "${username}"`);

      const submissions = await user.submissions({ limit: LIMIT });
      console.log(`→ Retrieved ${submissions.length} submissions`);

      for (const sub of submissions) {
        const title = sub.title;
        console.log(`   ↪️ Checking "${title}"`);

        if (!grouped[title]) {
          grouped[title] = [];
          console.log(`   🆕 New question found: "${title}"`);
        }

        const alreadyLogged = grouped[title].some(e => e.user === username);
        if (alreadyLogged) {
          console.log(`   🚫 Already logged: ${username} on "${title}"`);
        } else {
          grouped[title].push({
            user: username,
            status: sub.statusDisplay,
            lang: sub.lang,
            runtime: sub.runtime,
            time: new Date(sub.timestamp * 1000).toISOString(),
          });
          console.log(`   ✅ Logged: ${username} on "${title}"`);
        }
      }
    } catch (err) {
      console.error(`❌ Error fetching "${username}":`, err.message);
    }
  }

  console.log("\n✅ Finished! Returning grouped submissions.\n");
  return grouped;
}

fetchGroupedSubmissions().then((data) => {
  console.log("📦 Final Result:");
  console.log(JSON.stringify(data, null, 2));
});

