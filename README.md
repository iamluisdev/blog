<div align="center">
  
<h1>Blog</h1>

Dev Blog by Hugo Lin

<div align="center">
  <a href="https://youtu.be/omwBe_uhwFc?si=f0kWVlJnw2xvSOTu">
    <img 
      alt="Hugo Lin Dev" 
      src=".github/cover.webp" 
    />
  </a>
</div>

[🌐 Example Site](https://dev.1chooo.com)

</div>

## Features

- Markdown-powered posts
- Light / Dark theme
- Responsive design
- Syntax highlighting
- SEO Friendly
- View counter
- Vercel Analytics

## Get Started

1. Fork the repository
2. Create Supabase project
3. Set up environment variables in `.env.local`:
    ```bash
    POSTGRES_URL="YOUR_POSTGRES_URL"
    POSTGRES_USER="YOUR_POSTGRES_USER"
    POSTGRES_HOST="YOUR_POSTGRES_HOST"
    SUPABASE_JWT_SECRET="YOUR_SUPABASE_JWT_SECRET"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_NEXT_PUBLIC_SUPABASE_ANON_KEY"
    POSTGRES_PRISMA_URL="YOUR_POSTGRES_PRISMA_URL"
    POSTGRES_PASSWORD="YOUR_POSTGRES_PASSWORD"
    POSTGRES_DATABASE="YOUR_POSTGRES_DATABASE"
    SUPABASE_URL="YOUR_SUPABASE_URL"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_NEXT_PUBLIC_SUPABASE_ANON_KEY"
    NEXT_PUBLIC_SUPABASE_URL="https://kmvqinruhkfqurwnmlxf.supabase.co"
    SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY"
    POSTGRES_URL_NON_POOLING="YOUR_POSTGRES_URL_NON_POOLING"

    # Vercel Analytics is automatically enabled when deployed to Vercel
    # No additional environment variables needed for basic analytics
    ```
4. Run the development server
    ```bash
    pnpm install
    pnpm dev
    ```
5. Open your browser at `http://localhost:3000`
6. Edit your post in the [`src/content/`](src/content/) folder (see [template](src/content/template/) for writing posts)

If you'd like to deploy your blog...

- with Vercel: add environment variables in settings and [follow the docs](https://vercel.com/docs/deployments)
- by yourself: copy above content to .env.local

Deploy the site and login to start blogging!

## Analytics Setup

This project uses Vercel Analytics for tracking page views and user interactions. The analytics setup includes:

### Vercel Analytics Features
- **Automatic page view tracking**: All pages are automatically tracked when deployed to Vercel
- **Custom event tracking**: Blog post views are tracked as custom events with metadata
- **Privacy-focused**: No cookies, fully compliant with privacy regulations
- **Real-time insights**: View analytics data in your Vercel dashboard

### How it works
1. **General Analytics**: The `<Analytics />` component in `layout.tsx` provides automatic page view tracking
2. **Custom Events**: The `ViewCounter` component tracks specific blog post views with additional metadata like slug and path
3. **Dashboard Access**: View your analytics data in the Vercel dashboard under your project's Analytics tab

### Enabling Analytics
1. Deploy your project to Vercel
2. In your Vercel dashboard, go to your project
3. Click on the "Analytics" tab
4. Click "Enable" to activate Vercel Analytics
5. Custom events will automatically start being tracked

### Custom Event Data
Blog post views are tracked with the following data:
- Event name: "Page View"
- Slug: The blog post identifier
- Path: The full path to the blog post
- Title: The document title

No additional configuration is required - analytics work out of the box when deployed to Vercel!

## Content

Create `.mdx` files in the `src/content` directory.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
