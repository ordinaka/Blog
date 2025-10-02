
import express from "express";
import axios from "axios";
import router from "./api.js";

const app = express();
const PORT = process.env.PORT || 3000;
// Set EJS as templating engine
app.set("view engine", "ejs");


// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Use the router for API routes
app.use("/api", router)

// Route to render the main page
app.get("/", async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const response = await axios.get(`${baseUrl}/api/posts`);
    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Route to render the new post page
app.get("/new", (req, res) => {
  res.render("modify.ejs", { heading: "New Post", submit: "Create Post" });
});

// Route to render the edit page in the modify.ejs                                                       
app.get("/edit/:id", async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const response = await axios.get(`${baseUrl}/api/posts/${req.params.id}`);
    console.log(response.data);
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

// Create a new post
app.post("/api/posts", async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    await axios.post(`${baseUrl}/api/posts`, req.body);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// Route to submit the edit post using patch
app.post("/api/posts/:id", async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
     await axios.patch(
      `${baseUrl}/api/posts/${req.params.id}`,
      req.body
    );
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});

// Delete a post
app.get("/api/posts/delete/:id", async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    await axios.delete(`${baseUrl}/api/posts/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
