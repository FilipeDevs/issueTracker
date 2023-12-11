# IssueTracker

IssueTracker serves as an integrated project management solution designed to monitor the advancement of various projects and teams. It empowers users to initiate projects and allocate developers to specific tasks. Within each project users can generate tickets to report bugs propose new features and more. Additionally the platform provides communication through comment streams associated with individual tickets.

## Tech Stack

**Client:** React, TailwindCSS, Flowbite, Toastify, Google-Charts

**Server:** Laravel, Spatie

**DB:** MySQL

## Features

-   Role-based authentication (admin, manager, and developer)
-   Project management capabilities (for managers and admins)
-   Team/contributors management for each project (for managers and admins)
-   Ticket generation and comprehensive ticket management
-   Comment functionality within each ticket, editable for flexibility
-   Visualization of project statistics through pie charts
-   Convenient view of assigned tickets
-   User role management (admin)
-   Integrated toasts for instant feedback.

## Screenshots

![Login View](https://i.imgur.com/n29W7JT.png)

![Dashboard View](https://i.imgur.com/WJDvzdv.png)

![Project View](https://i.imgur.com/RG2m8gS.png)

![Ticket View](https://i.imgur.com/zE4P6K7.png)

![Assigned Tickets View](https://i.imgur.com/SXnN9V0.png)

![User Admin View](https://i.imgur.com/1iaR04l.png)

## Usage (Local)

1. Clone the project
2. Copy `.env.example` into `.env` and configure database credentials
3. Navigate to the project's root directory using terminal
4. Run `composer install`
5. Set the encryption key by executing `php artisan key:generate --ansi`
6. Run migrations and seeders `php artisan migrate --seed`
7. Start local server by executing `php artisan serve`
8. Open new terminal and navigate to the `react/` folder
9. Copy `.env.example` into `.env` and adjust the `VITE_API_BASE_URL` parameter
10. Run `npm install`
11. Run `npm run dev` to start vite server for React
12. Access the application via [http://localhost:3000/](http://localhost:3000/)

**Some testing accounts :**

Admin :
`admin@gmail.com`
`123456`

Manager :
`manager@gmail.com`
`123456`

By default when an user creates an account he is assigned the role of `developer`.
