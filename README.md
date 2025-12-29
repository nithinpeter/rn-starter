# React Native Firebase Starter

A production-ready React Native starter template with type-safe APIs, Firebase authentication, and a modern monorepo architecture.

[![React Native](https://img.shields.io/badge/React_Native-0.81-blue?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54-000020?logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![tRPC](https://img.shields.io/badge/tRPC-11-2596BE)](https://trpc.io/)
[![Firebase](https://img.shields.io/badge/Firebase-13-FFCA28?logo=firebase)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Features

- **Type-Safe End-to-End** - Full TypeScript with tRPC for API calls with zero codegen
- **Firebase Authentication** - Google and Apple Sign-In out of the box
- **Firestore Integration** - Ready-to-use database with type-safe queries
- **Monorepo Architecture** - Turborepo + pnpm workspaces for efficient builds
- **Modern Stack** - React 19, Expo 54, New Architecture enabled
- **Dark Mode** - Automatic light/dark theme support
- **File-Based Routing** - Expo Router with typed routes

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Frontend** | React Native | 0.81.5 |
| | Expo | 54.0 |
| | React | 19.1.0 |
| | Expo Router | 6.0 |
| **API** | Fastify | 5.2 |
| | tRPC | 11.0 |
| | Zod | 3.24 |
| **Auth & Database** | Firebase Admin | 13.0 |
| | Firebase Auth | 23.5 |
| | Firestore | 23.5 |
| **Build Tools** | Turborepo | 2.3 |
| | pnpm | 10.10 |
| | TypeScript | 5.9 |

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client (Expo)                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Auth Context │  │  tRPC Hooks  │  │   Expo Router        │  │
│  │ (Firebase)   │  │ (React Query)│  │   (File-based)       │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP + Bearer Token
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API Server (Fastify)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ tRPC Router  │  │ Auth Context │  │   Firebase Admin     │  │
│  │ (Procedures) │  │ (Verify JWT) │  │   (Firestore)        │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Project Structure

```
rn-starter/
├── apps/
│   ├── api/                        # Fastify + tRPC backend
│   │   └── src/
│   │       ├── trpc/
│   │       │   ├── routers/        # API endpoints
│   │       │   │   ├── index.ts    # Router exports
│   │       │   │   └── user.ts     # User procedures
│   │       │   ├── context.ts      # Auth context
│   │       │   └── index.ts        # tRPC initialization
│   │       ├── services/
│   │       │   ├── firebase-admin.ts
│   │       │   └── firestore.ts
│   │       ├── server.ts           # Fastify server
│   │       └── env.ts              # Environment validation
│   │
│   └── client-app/                 # Expo React Native app
│       ├── app/
│       │   ├── (auth)/             # Auth screens
│       │   │   └── login.tsx
│       │   ├── (tabs)/             # Main app tabs
│       │   │   ├── index.tsx       # Home
│       │   │   └── profile.tsx     # Profile
│       │   └── _layout.tsx         # Root layout
│       ├── components/
│       │   ├── auth/               # Auth buttons
│       │   ├── themed-text.tsx
│       │   └── themed-view.tsx
│       ├── contexts/
│       │   └── auth-context.tsx    # Firebase auth state
│       ├── services/auth/
│       │   ├── firebase.ts         # Firebase base
│       │   ├── google-auth.ts      # Google Sign-In
│       │   └── apple-auth.ts       # Apple Sign-In
│       └── hooks/
│           ├── use-auth.ts
│           └── use-color-scheme.ts
│
└── packages/
    ├── api-client/                 # Shared tRPC client
    │   └── src/
    │       ├── client.ts           # Vanilla client
    │       ├── react.tsx           # React hooks + provider
    │       └── types.ts            # Type exports
    └── tsconfig/                   # Shared TS configs
```

## Getting Started

### Prerequisites

- **Node.js** >= 20
- **pnpm** >= 10.10 (`npm install -g pnpm`)
- **Xcode** (for iOS development)
- **Android Studio** (for Android development)
- **Firebase Project** with Authentication and Firestore enabled

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/rn-starter.git
cd rn-starter
pnpm install
```

### 2. Firebase Setup

#### Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** with Google and Apple providers
4. Enable **Firestore Database**

#### Get Firebase Credentials

**For the API (Service Account):**
1. Go to Project Settings → Service Accounts
2. Click "Generate new private key"
3. Save the JSON file securely

**For the Client (Web Config):**
1. Go to Project Settings → Your apps → Add Web App
2. Copy the config object

**For Native Apps:**
1. Go to Project Settings → Your apps
2. Add iOS app → Download `GoogleService-Info.plist`
3. Add Android app → Download `google-services.json`

### 3. Environment Variables

**API Server** - Create `apps/api/.env`:

```env
PORT=3001
NODE_ENV=development

# From your Firebase service account JSON
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

**Client App** - Create `apps/client-app/.env.local`:

```env
# From Firebase Console → Project Settings → Your apps → Web
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSy...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# From Firebase Console → Authentication → Sign-in method → Google → Web SDK config
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=123456789-abc.apps.googleusercontent.com

# API URL (use your Mac's IP for real device testing)
EXPO_PUBLIC_API_URL=http://localhost:3001
```

### 4. Add Native Config Files

Copy your Firebase config files to the client app:

```bash
cp ~/Downloads/GoogleService-Info.plist apps/client-app/
cp ~/Downloads/google-services.json apps/client-app/
```

Update `apps/client-app/firebase.config.ts` with your web config values.

### 5. Run the App

```bash
# Start everything (API + Client)
pnpm dev

# Or run separately
pnpm dev:api      # API on http://localhost:3001
pnpm dev:client   # Expo dev server
```

For iOS:
```bash
cd apps/client-app
pnpm prebuild
pnpm ios
```

For Android:
```bash
cd apps/client-app
pnpm prebuild
pnpm android
```

## Authentication Flow

1. User taps "Sign in with Google" or "Sign in with Apple"
2. Native auth flow opens (Google/Apple SDK)
3. User authenticates with provider
4. Firebase credential is created from the auth result
5. `signInWithCredential` creates/signs in Firebase user
6. `AuthContext` updates with user state
7. App redirects from `/(auth)/login` to `/(tabs)`
8. API calls include Firebase ID token in Authorization header
9. API verifies token with Firebase Admin SDK

```typescript
// Client: Get token for API calls
const token = await auth().currentUser?.getIdToken();

// API: Verify token and get user
const decodedToken = await auth.verifyIdToken(token);
// { uid, email, name, picture, ... }
```

## Adding New API Endpoints

### 1. Create a Router

```typescript
// apps/api/src/trpc/routers/posts.ts
import { z } from 'zod';
import { router, protectedProcedure } from '../index.js';
import { collections } from '../../services/firestore.js';

export const postsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const snapshot = await collections.posts()
      .where('userId', '==', ctx.user.uid)
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }),

  create: protectedProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const docRef = await collections.posts().add({
        ...input,
        userId: ctx.user.uid,
        createdAt: Date.now(),
      });
      return { id: docRef.id };
    }),
});
```

### 2. Add to App Router

```typescript
// apps/api/src/trpc/routers/index.ts
import { postsRouter } from './posts.js';

export const appRouter = router({
  user: userRouter,
  posts: postsRouter,  // Add here
});
```

### 3. Add Firestore Collection

```typescript
// apps/api/src/services/firestore.ts
export const collections = {
  users: () => getFirestoreDb().collection('users'),
  posts: () => getFirestoreDb().collection('posts'),  // Add here
};
```

### 4. Use in Client

```typescript
// In any React component
import { trpc } from '@starter/api-client';

function PostsList() {
  const { data: posts } = trpc.posts.list.useQuery();
  const createPost = trpc.posts.create.useMutation();

  const handleCreate = () => {
    createPost.mutate({ title: 'Hello', content: 'World' });
  };

  return (
    <View>
      {posts?.map(post => <Text key={post.id}>{post.title}</Text>)}
      <Button title="Create Post" onPress={handleCreate} />
    </View>
  );
}
```

## Development Commands

```bash
pnpm dev              # Run all dev servers
pnpm dev:api          # API only
pnpm dev:client       # Client only
pnpm build            # Build all packages
pnpm typecheck        # Type check all packages
pnpm lint             # Lint all packages
pnpm clean            # Clean all build artifacts
```

## Deployment

### API Server

The API can be deployed to any Node.js hosting platform:

- **Render** - Connect repo, set environment variables
- **Railway** - One-click deploy from GitHub
- **Fly.io** - Global edge deployment
- **AWS/GCP/Azure** - Container or VM deployment

Set production environment variables and update `EXPO_PUBLIC_API_URL` in the client.

### Mobile App

```bash
cd apps/client-app

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

## Customization

### Update App Metadata

Edit `apps/client-app/app.config.ts`:

```typescript
const appConfig = {
  appName: 'Your App Name',
  shortName: 'YourApp',
  scheme: 'yourapp',
  iosBundleId: 'com.yourcompany.yourapp',
  androidPackage: 'com.yourcompany.yourapp',
};
```

### Change Theme Colors

Edit `apps/client-app/constants/theme.ts`:

```typescript
const tintColorLight = '#your-brand-color';
const tintColorDark = '#your-brand-color';
```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with [Expo](https://expo.dev), [tRPC](https://trpc.io), and [Firebase](https://firebase.google.com)
