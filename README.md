# 2 Day Tech Challenge - PokeDEX

### Installation

```
npm install
```

```
npm start
```

---

### About

React.js web UI that interfaces with the Pokemon API.
This App is a PokeDex app with an added pokemon comparison feature.

---

### Technologies

- React.js - Front-end framework
- Tailwind CSS - CSS framework with some standard SASS
- Axios - Data fetching
- React Router v6 - Routing
- React-paginate - Pagination
- React-lazy-load-image-component - Image process rendering

---

### App User Stories

- "As a user, I want to view and easily find pokemon so that I can easily explore the many pokemon that exist"
- "As a user, I want to filter pokemon by their generation so that I can find pokemon I am interested in"
- "As a user, I want to preview in detail a pokemon so that I can find out all the information around that particular pokemon"
- "As a user, I want to compare pokemon so that I can decide if one is better over the other"
- "As a user, I want to save my favourite pokemon so that I can easily find them next time I visit the application"

---

### Features

1. Search for any Pokemon via search fields
2. The Pokemon image in the Pokemon card container is clickable, displaying more information about the selected Pokemon.
3. Save and remove favourite Pokemon from favourites. Favorites persist across page refreshes. This is achieved by using local storage.
4. Filter Pokemon by their generation.
5. Change the number of Pokemon displayed on the page.
6. Compare different Pokemon based on pokemon base stats and other information.
7. Pagination.
8. Mobile responsive.
9. Basic data fetching loading and error handling.

---

### My Experience - FAQs

#### 1) If you used any particular libraries why did you choose them?

- I used Tailwind CSS as my CSS framework as it rapidly speeds up my development. Tailwind, through its responsive classes and their structure, in my opinion, makes code easier to maintain.

- I used Axios for data fetching for its automatic JSON transformation. There are other benefits but they are not applicable to this project. If I had to update this app, I would consider using SWR https://swr.vercel.app/ as we can pull loading and error states from the response object saving me the trouble of creating those states manually. Other benefits are auto revalidation, which allows the user to see the most up-to-date information without refreshing the page, pagination support, and many more.

- I used React router v6 as it’s the recommended and the most established library to create page route paths for our react application.

- I used React-paginate as the API was relatively straightforward to understand compared to others I have worked with in the past. It's well established and maintained and allowed me to build the functionality I needed without much hassle.

- I used React-lazy-load-image-component because it behaves very similar to the NEXT.js image component. It has an extremely simple API, which optimises how images are rendered in the app.

#### 2) Did you have any challenges and if so, how did you overcome them?

- I had some initial pain points working with the Pokemon API. I had to typically fetch a name of a pokemon and then use that name in another request to fetch data for that pokemon. Working out the best way to architect this process caused some initial headache but I developed solutions across the multiple different cases in the app. If I had more time, I would refactor the current solutions.

- I had to ‘lift state’ a few times to preserve states of pages when introducing react router into the app. I would consider using context API in a future refactor.

#### 3) If you had more time, what else would you implement?

- I’d map out the app visually and create a tree-like diagram, similar to how react renders components, along with common functions so I can better understand, control and manage the data flow. The benefit of this is if the app expanded I wouldn't have to 'lift state' as many times as I did. I would consider using context API to avoid pop drilling. I would also consider using Redux if the complexity of the app increased significantly due to a change in scope.

- I’d spend much more time reading and understanding the Pokemon API and build new features based on that.

- I’d add a number of new features (i.e., more filter options), and improve the overall UI of the app dramatically.

- I’d break down larger components into much smaller ones so the code can become more maintainable. I started to do this but did not have enough time to continue. Generally, I would refactor the code a few times over until the app is structurally well organised and the maintainability is high.
- I’d Add error and loading handling in all fetch requests and improve the UI of these states when encountered using a toasts

- I’d Test for bugs more thoroughly.

---

### Live-link

https://pokedex-ayocodes.netlify.app/
