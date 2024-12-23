import express from 'express';
import cookieParset from 'cookie-parser';

import authRoute from './routes/auth.route.js';
import postRoute from './routes/post.route.js';
import userRoute from './routes/user.route.js';


const app = express();
const port = 8800;

app.use(express.json());
app.use(cookieParset());






app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);





























app.get('/', (req, res) => {
    res.send('Welcome to real state server');
    console.log("hone");
});
app.listen(port, () => {
    console.log("Server is runnig on port: ", port);
})