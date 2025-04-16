const express = require("express");
const { Pool } = require("pg");
const cors = require('cors');
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = 3000;

// PostgreSQL connection
const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT),
  database: process.env.PG_DATABASE,
});

app.use(express.json());
app.use(cors());

// Authentication middleware
const authenticateToken = (req, res, next) => {
  // Skip authentication for GET requests
  if (req.method === 'GET') {
    return next();
  }
  
  const token = req.headers.authorization;
  
  // Check if token exists and matches
  if (!token || token !== `Bearer ${process.env.AUTH_TOKEN}`) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing token' });
  }
  
  next();
};

// Add the middleware to your Express app
app.use(authenticateToken);

// Your existing routes remain the same
// ...

// Create a new post with tags
app.post("/posts", async (req, res) => {
  try {
    const { title, short_name, markdown_content, tags } = req.body;

    if (!title || !short_name || !markdown_content || !Array.isArray(tags)) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    // Insert post
    const postResult = await pool.query(
      "INSERT INTO posts (title, short_name, markdown_content) VALUES ($1, $2, $3) RETURNING id",
      [title, short_name, markdown_content]
    );
    const postId = postResult.rows[0].id;

    // Insert tags if they don't exist
    const tagIds = [];
    for (const tag of tags) {
      const tagResult = await pool.query(
        "INSERT INTO tags (name) VALUES ($1) ON CONFLICT (name) DO UPDATE SET name=EXCLUDED.name RETURNING id",
        [tag]
      );
      tagIds.push(tagResult.rows[0].id);
    }

    // Link post to tags
    for (const tagId of tagIds) {
      await pool.query(
        "INSERT INTO post_tags (post_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
        [postId, tagId]
      );
    }

    res.status(201).json({ message: "Post created", postId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Creata a new tag
app.post("/tags", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const result = await pool.query(
      "INSERT INTO tags (name) VALUES ($1) RETURNING id",
      [name]
    );

    res.status(201).json({ message: "Tag created", tagId: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch all tags
app.get("/tags", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tags");

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch all posts with tags
app.get("/posts", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT posts.id, posts.title, posts.short_name, posts.markdown_content, 
      posts.date, array_agg(tags.name) AS tags
      FROM posts
      LEFT JOIN post_tags ON posts.id = post_tags.post_id
      LEFT JOIN tags ON post_tags.tag_id = tags.id
      GROUP BY posts.id;
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch posts by tag
app.get("/posts/tags/:tag", async (req, res) => {
  const { tag } = req.params;

  try {
    const result = await pool.query(`
      SELECT posts.id, posts.title, posts.short_name, posts.markdown_content, 
      posts.date, array_agg(tags.name) AS tags
      FROM posts
      LEFT JOIN post_tags ON posts.id = post_tags.post_id
      LEFT JOIN tags ON post_tags.tag_id = tags.id
      WHERE tags.name = $1
      GROUP BY posts.id;
    `, [tag]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No posts found for this tag" });
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch posts sorted by date (newest to oldest)
app.get("/posts/date", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT posts.id, posts.title, posts.short_name, posts.markdown_content, 
      posts.date, array_agg(tags.name) AS tags
      FROM posts
      LEFT JOIN post_tags ON posts.id = post_tags.post_id
      LEFT JOIN tags ON post_tags.tag_id = tags.id
      GROUP BY posts.id
      ORDER BY posts.date DESC;  -- Newest to oldest
    `);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch a post by short_name
app.get("/posts/shortname/:short_name", async (req, res) => {
  const { short_name } = req.params;

  try {
    const result = await pool.query(`
      SELECT posts.id, posts.title, posts.short_name, posts.markdown_content, 
      posts.date, array_agg(tags.name) AS tags
      FROM posts
      LEFT JOIN post_tags ON posts.id = post_tags.post_id
      LEFT JOIN tags ON post_tags.tag_id = tags.id
      WHERE posts.short_name = $1
      GROUP BY posts.id;
    `, [short_name]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(result.rows[0]); // Return the first post (should be unique by short_name)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
