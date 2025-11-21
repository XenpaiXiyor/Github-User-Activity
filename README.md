# GitHub User Activity CLI

A simple command-line interface (CLI) tool to fetch and display the recent activity of a GitHub user. This project interacts with the GitHub API to retrieve events (commits, stars, opened issues, etc.) and displays them in a readable format.

## Features

- Fetches recent public activity for any GitHub user.
- Handles common event types:
  - Push events (commits)
  - Created events (new repos/branches)
  - Watch events (starring repos)
  - Fork events
- Graceful error handling for invalid usernames or API issues.

## Prerequisites

- **Node.js** (Version 18 or higher recommended so `fetch` works natively).

## Installation & Usage

1. Clone this repository or download the script.
2. Open your terminal in the project folder.
3. Run the command using `node`:

```bash
node index.js <username>
