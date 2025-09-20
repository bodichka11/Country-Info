Country Info

Angular application that provides detailed information about countries, including their holidays and border information. It features real-time search functionality and a random countries widget with upcoming holiday information.

🌟 Features
-Search Functionality

Real-time search as you type

Search by country name or country code

Displays up to 10 matching results

Clear messaging when no results are found

-Random Countries Widget

Loads 3 random countries on page load

Displays the next upcoming holiday for each country

Refresh button to load new random countries

Handles cases where no upcoming holidays are available

-Holiday Display

Chronologically sorted holidays

Color-coded holiday types (Public, Global etc.)

Shows establishment year when available

Displays both English and local names

🚀 Getting Started
Prerequisites

Node.js (version 18 or higher)

npm or yarn package manager

Installation

Clone the repository

git clone <repository-url>
cd country-info


Install dependencies

npm install


Start the development server

npm start


The application will be available at http://localhost:4200

Building
npm run build


The build artifacts will be stored in the dist/ directory.

🏗️ Project Structure
country-info/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── country/       # Country detail component
│   │   │   └── home/          # Home page component
│   │   ├── models/            # TypeScript interfaces
│   │   ├── services/          # API service layer
│   │   └── styles/            # Global styles and theming
│   ├── assets/                # Static assets
│   └── environments/          # Environment configurations
├── angular.json               # Angular configuration
├── package.json               # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration

🛠️ Technologies Used

Angular 17 – Frontend framework

TypeScript – Type-safe JavaScript

SCSS – CSS preprocessor

RxJS – Reactive programming

Angular SSR – Server-side rendering

ESLint & Prettier – Code quality and formatting

📦 API Integration

This application integrates with the Nager.Date API to fetch:

Country information

Public holidays

Border country data

🎨 Styling

Component-scoped SCSS styles

Responsive design principles

Modern CSS features (Flexbox, Grid)

Color-coded holiday types

🧪 Testing & Linting

Run tests:

npm test


Run linting:

npm run lint


Format code:

npm run format

🤝 Contributing

Fork the project

Create your feature branch:

git checkout -b feature/AmazingFeature


Commit your changes:

git commit -m "Add some AmazingFeature"


Push to the branch:

git push origin feature/AmazingFeature


Open a Pull Request
