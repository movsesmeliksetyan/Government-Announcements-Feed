Dear Movses Meliksetyan,


Thank you for your interest in the FE position



Please complete the following assessment task by 15th June 2026:



Task: Government Announcements Feed



Build a Government Announcements Feed — a small web app where residents can browse, search, bookmark, and read official government announcements.



There is no prescribed architecture. The choices you make, how you justify them, and how well you handle edge cases are what we evaluate — not the quantity of features you ship.



---



API



Fetch data from:



    GET https://jsonplaceholder.typicode.com/posts



Map each post to an announcement as follows:



    id       → id (number)

    title    → title (capitalize the first letter of each word)

    body     → body

    category → derived from id:

                 id % 4 === 0  →  "Health"

                 id % 4 === 1  →  "Transport"

                 id % 4 === 2  →  "Education"

                 anything else →  "Infrastructure"

    isUrgent → true if id % 7 === 0, otherwise false



---



REQUIRED FEATURES



1. Feed Page  (/announcements)



- Fetch and display all announcements on load.

- Show a loading state while fetching.

- Show an error state with a Retry button if the fetch fails.

- Each item must show: title, category badge, and an urgent indicator where applicable.

- Search: filter announcements by title in real time — no additional API call.

- Category filter: All / Health / Transport / Education / Infrastructure.

- Search and category filter must work together simultaneously.



2. Detail Page  (/announcements/:id)



- Display all fields of the selected announcement.

- Do not make a second API call when navigating from the Feed page — use data already fetched.

- If the user opens this URL directly (deep link), fall back to fetching that single post:

  GET https://jsonplaceholder.typicode.com/posts/:id

- Include a Back button that returns to the Feed page with the previous search and filter state intact.



3. Bookmarks



- Allow each announcement to be bookmarked or unbookmarked from both the Feed and Detail pages.

- Bookmarks must persist across page refreshes (localStorage).

- Show a bookmark count badge in the navigation bar at all times.

- A Bookmarks page (/bookmarks) shows only the saved announcements.



---



CONSTRAINTS



- No UI component libraries (no MUI, Ant Design, Chakra, Tailwind component kits, etc.). Use plain CSS.

- No data-fetching libraries (no React Query, SWR, Apollo). Use the browser fetch API directly.

- React and React Router are the only permitted third-party runtime libraries beyond dev tooling.

- TypeScript is strongly encouraged.



---