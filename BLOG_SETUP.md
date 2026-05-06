# Blog System Setup Guide

## Overview
World-class blog system with rich text editing, API backend, and full engagement features.

## Features

### Rich Text Editor (75+ Features)
- **Text Formatting**: Bold, Italic, Underline, Strikethrough, Subscript, Superscript
- **Headings**: H1, H2, H3 with custom styling
- **Text Styling**: 
  - 10 text colors
  - 10 highlight colors
  - 9 font families (Inter, Georgia, Times New Roman, Arial, Courier New, Verdana, Comic Sans MS, Impact, Trebuchet MS)
- **Alignment**: Left, Center, Right, Justify
- **Lists**: Bullet lists, Numbered lists, Task lists with checkboxes
- **Blocks**: Blockquotes, Code blocks with syntax highlighting (JavaScript, TypeScript, Python, CSS, HTML)
- **Tables**: Insertable tables with add/remove columns and rows
- **Media**:
  - Image upload to Cloudinary
  - YouTube video embeds
  - Links with custom URLs
- **Advanced**: 
  - Horizontal rules
  - Inline code
  - Character and word count
  - Undo/Redo
  - Drag and drop cursor
  - Gap cursor for better navigation

### Backend API
- Full CRUD operations for blog posts
- MongoDB database with Mongoose
- Cloudinary image storage
- Search and filter by tags
- Pagination support
- Engagement tracking (likes, shares, reads)
- Comment system with nested likes
- Automatic slug generation
- Full-text search

### Frontend Features
- Real-time blog listing with search and filters
- Individual blog post pages with full engagement
- Like, share, bookmark functionality
- Comment system with author names
- Responsive design
- Smooth animations with Framer Motion
- Loading states
- Error handling

## Setup Instructions

### 1. Backend Setup (blog-api)

1. Navigate to blog-api folder:
```bash
cd blog-api
```

2. Install dependencies:
```bash
pnpm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your credentials:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/blog
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

5. Start MongoDB (if running locally):
```bash
mongod
```

6. Start the API server:
```bash
pnpm dev
```

The API will run on `http://localhost:5000`

### 2. Frontend Setup (portfolio)

1. Navigate to portfolio folder:
```bash
cd portfolio
```

2. Install dependencies (if not already installed):
```bash
pnpm install
```

3. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

4. Start the development server:
```bash
pnpm dev
```

The frontend will run on `http://localhost:3000`

### 3. Cloudinary Setup

1. Sign up for a free account at [cloudinary.com](https://cloudinary.com)
2. Get your credentials from the dashboard:
   - Cloud Name
   - API Key
   - API Secret
3. Add them to `blog-api/.env`

### 4. MongoDB Setup

**Option A: Local MongoDB**
1. Install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/blog`

**Option B: MongoDB Atlas (Cloud)**
1. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`

## Usage

### Writing a Blog Post

1. Navigate to `/blog/write`
2. Add a cover image (click the upload area)
3. Enter title and description
4. Add tags (press Enter after each tag)
5. Use the rich text editor toolbar for formatting:
   - Text formatting buttons (B, I, U, S)
   - Headings (H1, H2, H3)
   - Colors and highlights (🎨 button)
   - Font families dropdown
   - Alignment buttons
   - Lists (bullet, numbered, task)
   - Blockquotes and code blocks
   - Tables
   - Images (🖼 button - uploads to Cloudinary)
   - Links (🔗 button)
   - YouTube videos (▶ button)
6. Click "Publish" when done

### Viewing Blog Posts

1. Navigate to `/blog` to see all posts
2. Use search bar to find specific posts
3. Filter by tags
4. Click any post to read full content
5. Like, share, and comment on posts

## API Endpoints

### Blogs
- `POST /api/blogs` - Create blog post
- `GET /api/blogs` - Get all blogs (with search, tags, pagination)
- `GET /api/blogs/:slug` - Get single blog by slug
- `PUT /api/blogs/:slug` - Update blog post
- `DELETE /api/blogs/:slug` - Delete blog post

### Engagement
- `POST /api/blogs/:slug/like` - Like a blog post
- `POST /api/blogs/:slug/share` - Increment share count

### Comments
- `POST /api/blogs/:slug/comments` - Add comment
- `POST /api/blogs/:slug/comments/:commentId/like` - Like comment

### Upload
- `POST /api/upload` - Upload image to Cloudinary

## Tech Stack

### Frontend
- Next.js 16.2.4
- React 19
- TypeScript
- Tiptap (Rich Text Editor)
- Framer Motion (Animations)
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- Cloudinary
- Multer (File uploads)
- TypeScript

## Troubleshooting

### API Connection Issues
- Ensure backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in frontend `.env.local`
- Verify CORS is enabled in backend

### Image Upload Issues
- Verify Cloudinary credentials in backend `.env`
- Check file size limits (default: 10MB)
- Ensure proper file formats (jpg, jpeg, png, gif, webp)

### MongoDB Connection Issues
- Verify MongoDB is running
- Check connection string in `.env`
- Ensure database user has proper permissions

## Production Deployment

### Backend
1. Set `NODE_ENV=production` in `.env`
2. Deploy to services like:
   - Heroku
   - Railway
   - DigitalOcean
   - AWS EC2
3. Update frontend `NEXT_PUBLIC_API_URL` with production URL

### Frontend
1. Build the application:
```bash
pnpm build
```
2. Deploy to:
   - Vercel (recommended for Next.js)
   - Netlify
   - AWS Amplify

## Support

For issues or questions, check:
- API logs in terminal
- Browser console for frontend errors
- MongoDB logs for database issues
- Cloudinary dashboard for upload issues
