import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import Post from '../models/Post';

const router = express.Router();

// POST /api/posts - Create a new post
router.post('/', auth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;
    
    // Convert req.userId to ObjectId for author
    const newPost = new Post({
      title,
      content,
      author: new mongoose.Types.ObjectId(req.userId),
    });

    const savedPost = await newPost.save();
    await savedPost.populate('author', 'email');
    console.log('Saved Post:', savedPost);
    res.status(201).json({ post: savedPost, message: 'Post created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/posts - Get posts (optionally by author)
// GET /api/posts - Get posts (optionally by author)
router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
      const { author } = req.query;
      let posts;
  
      if (author) {
        // Validate if author is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(author as string)) {
          res.status(400).json({ message: 'Invalid author ID' });
          return;
        }
  
        posts = await Post.find({ author: new mongoose.Types.ObjectId(author as string) })
                          .populate('author', 'email')
                          .sort({ createdAt: -1 });
      } else {
        posts = await Post.find()
                          .populate('author', 'email')
                          .sort({ createdAt: -1 });
      }
  
      res.json(posts);
    } catch (err) {
      console.error('Error occurred:', err);
      res.status(500).json({ message: 'Server error', error: err });
    }
  });
  
  export default router;