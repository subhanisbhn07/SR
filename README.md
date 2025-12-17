# SignRoad Wellness Platform

A comprehensive wellness and manifestation platform built with React, TypeScript, and Vite. SignRoad helps users track signs from the universe, set personal goals, receive daily guidance, and manifest their intentions.

## Features

- **Universe Signs Tracking**: Log and track signs you spot in daily life (feathers, numbers, synchronicities)
- **Goal Manifestation**: Create and track personal goals with progress monitoring
- **Daily Messages & Audio**: Receive personalized daily messages and guided audio sessions
- **Universe Receipts**: Generate shareable proof posters when you find signs or achieve goals
- **Tribes**: Connect with accountability groups for support and motivation
- **Multi-Landing Page Funnel**: Feature-specific landing pages for targeted user acquisition
- **Neumorphic UI**: Modern, soft UI design with neumorphism principles

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3 with custom neumorphic components
- **Routing**: React Router DOM 6
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Date Utilities**: date-fns
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/subhanisbhn07/SR.git
cd SR
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── auth/           # Authentication components
│   ├── error/          # Error boundaries and error handling
│   ├── homepage/       # Homepage-specific components
│   ├── onboarding/     # User onboarding flow
│   ├── ui/             # Shared UI components
│   └── voice/          # Voice/audio components
├── constants/          # Shared constants and configuration
│   └── routes.ts       # Centralized route definitions
├── hooks/              # Custom React hooks
├── pages/              # Page components
│   └── landing/        # Feature-specific landing pages
├── store/              # Zustand state management stores
├── styles/             # Global styles
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Key Features

### Authentication
- Email/password authentication
- Social login (Google, Facebook) - Coming soon
- Password reset functionality
- Signup flow with email validation

### Landing Pages
The application includes multiple landing pages optimized for different user acquisition funnels:

- `/` - Main platform overview
- `/universe-receipts` - Focus on receipt generation feature
- `/daily-message` - Highlight daily guidance feature
- `/daily-audio` - Showcase audio sessions
- `/sleep-orb` - Promote sleep soundscapes
- `/platform` - Platform landing page

### State Management
The application uses Zustand for state management with the following stores:

- `authStore` - Authentication and user state
- `affinityStore` - User affinity and UTM tracking
- `configStore` - Application configuration
- `themeStore` - Theme preferences
- `signsGoalsStore` - Signs and goals tracking
- `lanternStore` - Lantern health tracking
- `tribesStore` - Tribe/community management
- And more...

### Error Handling
- Global error boundary for catching React errors
- User-friendly error messages
- Development mode stack traces

## Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Add your environment variables here
VITE_API_URL=your_api_url
```

### Customization
- Modify `tailwind.config.js` for custom theme colors
- Update `src/constants/routes.ts` for route management
- Configure stores in `src/store/` for state management

## Development

### Code Quality
The project includes:
- ESLint for code linting
- TypeScript for type safety
- Organized component structure
- Centralized constants and utilities

### Best Practices
- All components are typed with TypeScript
- Unused imports are removed
- Error boundaries wrap the application
- Form validation with React Hook Form
- Accessibility considerations (ARIA labels recommended)

## Security

The project has addressed security vulnerabilities:
- ✅ Fixed 7 out of 9 npm audit vulnerabilities
- ⚠️ 2 remaining moderate vulnerabilities (esbuild/vite) - dev dependencies only
- All unused code has been removed to reduce attack surface

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run `npm run lint` to check for errors
4. Run `npm run build` to verify the build
5. Create a pull request

## License

This project is private and proprietary.

## Support

For questions or support, contact: hello@signroad.com

---

**Note**: This is an active development project. Features and documentation are continuously updated.
