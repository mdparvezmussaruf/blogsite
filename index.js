import express from 'express';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let posts = [];

// Home Page - Show all blogs
app.get("/", (req, res) => {
    res.render("index", { blogs: posts });
});

// Contact Page
app.get("/contact", (req, res) => {
    res.render("contact");
});

// Create a New Blog Post
app.post("/blogs", (req, res) => {
    const { title, content } = req.body;
    posts.push({ title, content });
    res.redirect("/");
});

// Show Edit Form
app.get("/edit/:id", (req, res) => {
    const postId = req.params.id;
    const post = posts[postId]; // Fetch post by ID (assuming posts is an array)

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("edit", { post, id: postId });
});


// Update Blog Post
app.post("/update/:id", (req, res) => {
    const id = req.params.id;
    posts[id] = { title: req.body.title, content: req.body.content };
    res.redirect("/");
});

// Delete Blog Post
app.post("/delete/:id", (req, res) => {
    const id = req.params.id;
    posts.splice(id, 1);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
