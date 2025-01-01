import express from 'express';
import cookieParset from 'cookie-parser';
import cors from 'cors';

import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import checkRoute from './routes/check.route.js';
import postRoute from './routes/post.route.js';


const app = express();
const port = 8800;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParset());




app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);
app.use("/api/check", checkRoute);





























app.get('/', (req, res) => {
    res.send('Welcome to real state server');
    console.log("hone");
});
app.listen(port, () => {
    console.log("Server is runnig on port: ", port);
})