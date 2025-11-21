/*
What does the CLI need to do?

- Accept a GitHub username
- Make an HTTP GET request to: https://api.github.com/users/<username>/events
- Parse the returned JSON
- Display activity in readable lines
- Handle errors (wrong username, failed request, network issues)
*/

// Username handling
let username = process.argv[2];
if (!username) {
  console.log("Unable to capture username");
  process.exit(1);
}

let Url = `https://api.github.com/users/${username}/events`;

async function fetchActivity() {
  //The Analogy (The Pizza Shop):

  //The Order (fetch): You go to a pizza place and order a pizza.

  //The Promise: The cashier doesn't give you the pizza instantly.

  // They give you a Buzzer/Receipt. This receipt is a Promise. It basically says: "I promise to give you a pizza in the future, or I will tell you we ran out of dough (Error)."
  // Wait: You go sit down and check your phone. You are not blocking the counter.
  // Resolution: The buzzer goes off. You trade the buzzer for the pizza.

  let response = await fetch(Url, {
    headers: {
      "User-Agent": "node.js-app", // acts like a id-card so github dont block u.
    },
  }); // fetch returns a promise like

  //check for resonse code
  if (!response.ok) {
    if (response.status === 404) {
      console.log("ERROR: User Not Found. Please check the Username");
    } else {
      console.log(`Error: Could not fetch data (Status: ${response.status})`);
    }
    return;
  }

  // the actual data is still in a box to read it
  let data = await response.json(); // parse reponse in JSON

  console.log("\n\nTHE ACTUAL DATA STARTS FROM HERE\n");
  
  if (data.length === 0) {
    console.log("No recent activity found.");
    return; // Stop the function
  }
  data.forEach((event) => {
    let action;

    // 1. PUSH EVENT
    if (event.type === "PushEvent") {
      // We try to find size. If it's missing, we assume 1.
      const commitCount = event.payload.size || 1;
      action = `Pushed ${commitCount} commit(s) to ${event.repo.name}`;
    }

    // 2. CREATE EVENT (New Branch or Repo)
    else if (event.type === "CreateEvent") {
      action = `Created a new ${event.payload.ref_type || "resource"} in ${
        event.repo.name
      }`;
    }

    // 3. WATCH EVENT (Starred a repo)
    else if (event.type === "WatchEvent") {
      action = `Starred ${event.repo.name}`;
    }

    // 4. CATCH ALL (Any other event)
    else {
      // Add spaces to the event type so "PullRequestEvent" looks nicer if you want
      action = `${event.type.replace("Event", "")} in ${event.repo.name}`;
    }

    console.log(`- ${action}`);
  });

  // we did it but the code is still a bit less human readable so we gonna turn it into one sentence
}

fetchActivity();
