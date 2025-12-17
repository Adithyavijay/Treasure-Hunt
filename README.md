# 🎄 Christmas Treasure Hunt App

A magical, mysterious Christmas-themed treasure hunt application built with Next.js App Router, featuring server-side password validation and secure clue delivery.

## ✨ Features

- **Server-Side Validation**: Password is validated exclusively on the server using Server Actions
- **Secure Image Delivery**: Clue image is stored outside the public directory and served via API route
- **Beautiful UI**: Dark, mysterious Christmas theme with Tailwind CSS
- **Server Components**: Fully server-rendered with no client-side JavaScript for validation
- **Environment-Based Configuration**: Password stored securely in environment variables

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure the Password

Edit `.env.local` and set your desired password:

```env
TREASURE_PASSWORD=YourSecretPassword
```

### 3. Replace the Placeholder Image

Replace `clues/treasure-clue.png` with your actual clue image. The current file is just a placeholder.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the treasure hunt.

## 📁 Project Structure

```
my-app/
├── app/
│   ├── actions.ts           # Server Actions for password validation
│   ├── page.tsx             # Main treasure hunt page (Server Component)
│   ├── layout.tsx           # Root layout
│   └── api/
│       └── clue/
│           └── route.ts     # API route to serve the clue image securely
├── clues/
│   ├── treasure-clue.png    # Your clue image (REPLACE THIS)
│   └── README.md            # Instructions for replacing the image
└── .env.local               # Environment variables (password)
```

## 🔐 How It Works

1. **Password Entry**: User enters a password on the main page
2. **Server Validation**: Form submission triggers a Server Action (`validatePassword`)
3. **Server-Side Check**: The password is compared against `process.env.TREASURE_PASSWORD` on the server
4. **State Management**: Success/failure is communicated via URL search params and page re-render
5. **Image Delivery**: On success, the page displays an image from `/api/clue`, which reads from the private `clues/` directory

## 🎨 Customization

### Change the Password
Edit `.env.local`:
```env
TREASURE_PASSWORD=NewPassword123
```

### Replace the Clue Image
1. Place your image in `clues/treasure-clue.png`
2. Or use a different filename and update `app/api/clue/route.ts`

### Modify the Theme
Edit the Tailwind classes in `app/page.tsx` to customize colors, fonts, and effects.

## 🚢 Deployment

When deploying to Vercel, Netlify, or similar platforms:

1. Add `TREASURE_PASSWORD` to your environment variables in the hosting dashboard
2. Ensure the `clues/` directory is included in your deployment
3. Deploy normally - the app is fully server-rendered

## 📝 Technical Notes

- **Next.js App Router**: Uses the latest App Router with Server Components
- **No Client State**: All validation happens server-side; no client-side React state
- **Secure by Default**: Password never reaches client; image not in public directory
- **SSR**: Fully server-rendered for better security and SEO
