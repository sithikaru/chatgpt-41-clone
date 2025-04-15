# ChatGPT-4.1 Private Web UI

A private, open-source ChatGPT web client built with Next.js 14 (App Router, React, Tailwind), designed to look and feel like the official ChatGPT app.  
**Connects to OpenAI's GPT-4.1 model using your own OpenAI API key** – perfect for personal or educational usage when you want access to GPT-4.1 before it appears in the official web UI.

![screenshot](/ss.jpeg)

---

## Features

- ✔️ Looks and feels like chat.openai.com
- ✔️ Runs on [GPT-4.1](https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo) using your own API key  
- ✔️ Markdown and code highlighting in chat
- ✔️ Private (no auth; you are the sole user)
- ✔️ Easy Vercel deployment
- ✔️ Secure – API key is kept on the server-side

---

## Usage & Installation

### 1. Clone This Repo

```bash
git clone https://github.com/sithikaru/chatgpt-41-clone.git
cd chatgpt-41-clone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Your OpenAI API Key

Create a **`.env.local`** file in the root folder with only this line:
```
OPENAI_API_KEY=sk-...
```
> You can create and manage your OpenAI API keys [here](https://platform.openai.com/api-keys).  
> **Never share or commit your API key!**

### 4. (Optional) Add Custom Avatars

- Place a ChatGPT avatar image in `public/gpt.png` (or use the default).
- Place a user avatar in `public/user.png` (or use the emoji default).

### 5. Run Locally

```bash
npm run dev
```
- Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Deploy to Vercel (recommended)

1. [Sign up for Vercel](https://vercel.com/signup) and connect your GitHub account.
2. Click "New Project", select your repo.
3. When prompted, **add your `OPENAI_API_KEY`** in the Environment Variables tab.
4. Click "Deploy".

---

## How It Works

- **Frontend**: Built with Next.js (`/app/chat/page.tsx`), provides a modern ChatGPT-style interface, including code rendering via markdown.
- **Backend**: API calls from UI are **proxied through `/api/chat`** server route so your OpenAI API key is never exposed to the browser.
- Uses model `gpt-4-1106-preview` which is equivalent to GPT-4.1 as per [OpenAI docs](https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo).

---

## Frequently Asked Questions

### Is my API key safe?

Your API key is never sent to the client/browser. It is only used on the server (Next.js API route).

### Can I use GPT-4.0, or GPT-4-turbo instead?

Just edit the model in `pages/api/chat.ts` – change the `model` property to the OpenAI model you want (e.g. `gpt-4`, `gpt-4-turbo`, etc.).

### Does this support streaming (typing effect)?

This release uses plain (non-streaming) responses for simplicity.  
You can add streaming easily with the OpenAI API – see [Next.js streaming docs](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#streaming) and OpenAI's docs for `/v1/chat/completions`.

### Can multiple people use this instance?

This version is designed for personal use. You can adapt it for team use by adding authentication.

---

## Contributing

Pull Requests welcome! Please open an issue if you have questions or feedback.

---

## License

MIT – use freely for any educational/non-commercial/personal project.

---

### Credits

- Chat UI inspired by [ChatGPT by OpenAI](https://chat.openai.com/)
- Built with [Next.js](https://nextjs.org/)
- Markdown via [react-markdown](https://github.com/remarkjs/react-markdown)

---

**Enjoy chatting with GPT-4.1!**

```

---