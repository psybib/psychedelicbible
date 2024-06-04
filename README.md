# Psychedelic Bible

Open Source Psychedelic Research Project...

## Getting Started

### Prerequisites

- Node.js (version X.X.X or higher)
- npm (version X.X.X or higher)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/psychedelic-bible.git
   ```

2. Navigate to the project directory:

   ```
   cd psychedelic-bible
   ```

3. Install the required Node.js modules:

   ```
   npm install
   ```

### Configuration

1. Update the `siteMetadata.js` file in the `data` folder to add information to your site. The `siteMetadata` object contains various properties and settings related to the site's metadata, analytics, commenting system, and more. Refer to the code comments for details on each property.

2. Create a `.env` file in the project root directory to enable analytics and other features. Add the necessary environment variables based on your chosen providers. Example:

   ```
   NEXT_PUBLIC_GISCUS_REPO=
   NEXT_PUBLIC_GISCUS_REPOSITORY_ID=
   NEXT_PUBLIC_GISCUS_CATEGORY=
   NEXT_PUBLIC_GISCUS_CATEGORY_ID=
   NEXT_PUBLIC_UTTERANCES_REPO=
   NEXT_PUBLIC_DISQUS_SHORTNAME=

   MAILCHIMP_API_KEY=
   MAILCHIMP_API_SERVER=
   MAILCHIMP_AUDIENCE_ID=

   # ... add more environment variables as needed
   ```

### Usage

1. Start the development server:

   ```
   npm run dev
   ```

2. Open your browser and visit `http://localhost:3000` to see the site.

### Building for Production

1. Build the project:

   ```
   npm run build
   ```

   This command will generate a static site in the `.next` directory.

2. Serve the static site:

   ```
   npm run serve
   ```

### Adding Blog Posts

1. Add a new blog post by creating a markdown file in the `./data/blog/` directory with the following frontmatter:

   ```markdown
   ---
   title: ''
   date: 'YYYY-MM-DD'
   tags: ['', '', '', '', '']
   draft: false
   summary: ''
   ---

   Write your post content here...
   ```

2. Run the build command to generate the static site:

   ```
   npm run build
   ```

### Scripts

The `scripts` folder contains scripts to automate various tasks:

- Automatically push changes to GitHub
- Create new blog post templates
- Create prompts for blog posts

### Deploy

The easiest way to deploy the template is to use the [Vercel Platform](https://vercel.com) from the creators of Next.js. Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

Feel free to clone the repository, make changes, or add new content. Submit a pull request with your changes, and they will be reviewed and merged if appropriate.

## License

This project is open source and available under the [MIT License](LICENSE).

---

Make sure to replace `your-username` with your actual GitHub username in the clone URL. Also, replace `X.X.X` with the actual version numbers for Node.js and npm that are required for your project.

For more details on the available configuration options, scripts, and deployment methods, please refer to the original documentation and comments in the provided code.



```
"scripts": {
    "start": "cross-env SOCKET=true node ./scripts/next-remote-watch.js ./data",
    "dev": "next dev",
    "build": "next build && node ./scripts/generate-sitemap",
    "serve": "next start",
    "analyze": "cross-env ANALYZE=true next build",
    "lint": "next lint --fix --dir pages --dir components --dir lib --dir layouts --dir scripts",
    "prepare": "husky install",
    "commit": "git add . && git commit -m 'production push' && git push"

  },
  ```

  /



  autopush.py


  trav.py



  autogen.py

  