# Svelte Toggle Switch Demo

This is the interactive demo application for [svelte-toggle-switch](https://github.com/ishansasika/svelte-toggle-switch).

## Features

- **Interactive Playground**: Test all component props in real-time
- **Live Code Generation**: See the code for your configuration
- **Comprehensive Documentation**: Full API reference and examples
- **Quick Examples**: Pre-configured examples for common use cases

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **SvelteKit 2.0** - Application framework
- **Tailwind CSS 3.4** - Styling
- **TypeScript 5.7** - Type safety
- **Vite 6.4** - Build tool

## Structure

```
demo/
├── src/
│   ├── lib/
│   │   ├── components/     # Reusable components
│   │   ├── data/           # Component metadata
│   │   ├── stores/         # Svelte stores
│   │   └── utils/          # Utility functions
│   └── routes/             # SvelteKit pages
├── static/                 # Static assets
└── package.json
```

## Deployment

The demo is built as a static site using `@sveltejs/adapter-static` and can be deployed to any static hosting service:

- Vercel
- Netlify
- Firebase Hosting
- GitHub Pages
- Cloudflare Pages

## License

MIT
