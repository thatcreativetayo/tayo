import axios from 'axios';

const API_URL = "https://blog-api-r99q.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface BlogPostData {
  title: string;
  description: string;
  body: string;
  tags: string[];
  coverImage?: string;
}

export interface BlogResponse {
  success: boolean;
  data: unknown;
  message?: string;
}

// Blog CRUD
export const createBlog = async (data: BlogPostData) => {
  const response = await api.post('/blogs', {
    title: data.title,
    description: data.description,
    body: data.body,
    tags: data.tags,
    coverImageBase64: data.coverImage, // base64 string, backend uploads to Cloudinary
  });
  return response.data;
};

export const getAllBlogs = async (params?: {
  search?: string;
  tags?: string;
  page?: number;
  limit?: number;
}) => {
  const response = await api.get('/blogs', { params });
  return response.data;
};

export const getBlogBySlug = async (slug: string) => {
  const response = await api.get(`/blogs/${slug}`);
  return response.data;
};

export const updateBlog = async (slug: string, data: Partial<BlogPostData>, coverImageFile?: File) => {
  const formData = new FormData();
  
  if (data.title) formData.append('title', data.title);
  if (data.description) formData.append('description', data.description);
  if (data.body) formData.append('body', data.body);
  if (data.tags) formData.append('tags', JSON.stringify(data.tags));
  if (coverImageFile) formData.append('coverImage', coverImageFile);

  const response = await axios.put(`${API_URL}/blogs/${slug}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  
  return response.data;
};

export const deleteBlog = async (slug: string) => {
  const response = await api.delete(`/blogs/${slug}`);
  return response.data;
};

// Engagement
export const likeBlog = async (slug: string) => {
  const response = await api.post(`/blogs/${slug}/like`);
  return response.data;
};

export const shareBlog = async (slug: string) => {
  const response = await api.post(`/blogs/${slug}/share`);
  return response.data;
};

// Comments
export const addComment = async (slug: string, author: string, content: string) => {
  const response = await api.post(`/blogs/${slug}/comments`, { author, content });
  return response.data;
};

export const likeComment = async (slug: string, commentId: string) => {
  const response = await api.post(`/blogs/${slug}/comments/${commentId}/like`);
  return response.data;
};

export const addReply = async (slug: string, commentId: string, author: string, content: string) => {
  const response = await api.post(`/blogs/${slug}/comments/${commentId}/replies`, { author, content });
  return response.data;
};

// Image Upload
export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  
  return response.data;
};
