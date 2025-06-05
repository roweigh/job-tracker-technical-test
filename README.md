# Full Stack .NET Developer Technical Test - Job Application Tracker

## Backend
Tech stack:
- ASP.NET Core Web API
- Entity Framework Core
- In-memory DB
- Swagger

Run the application in /server/JobApplicationAPI with:
```bash
dotnet run
```

Swagger UI will be available at [http://localhost:5166/swagger](http://localhost:5166/swagger).

## Frontend
Tech stack:
- React, Next.js
- Axios
- Shadcn UI component library
- Tailwind CSS
- ESLint, Prettier

Run the development server in /client with:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Assumptions made
- The typical user would be a job searcher looking to keep track of the many job applications at various companies.
- 'dateApplied' is a readonly property - while the user may want to update the date in case of a mistake, the timestamp a newly submitted application should give the most accurate information for that property.
- Interview/Offer/Rejected are all statuses that have resulted in a response. It is assumed that the job searcher will find need to know which jobs they have applied for, but haven't received any response yet. An status of 'Applied' will be assigned by default to represent this initial state.
- An additional PUT operation will be required to update and save an existing record.

## Possible further improvements
### SQLite implementation
In the interest of time, I decided to use the in-memory DB approach to my backend, opting to try the SQLite implementation approach if I had spare time afterwards. 

### Sorting/Filtering
I have sorted the applications by 'Date Applied' in reverse chronological order, as I find it to be a poor user experience to navigate to the end of the table to view a newly added application (event after implementing a button to paginate to the end). I have yet to implement interactable columns to allow for column sorting, but being able to filter/sort on 'Status' would be a large improvement to this project from a visibility standpoint.

### Client side form input validation
While I have implemented input validation on the backend to reject any records containing invalid properties, form validation on the frontend would provide a better user experience as the feedback would more effectively communicate which inputs failed validation and why.
