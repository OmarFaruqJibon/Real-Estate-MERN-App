import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
  const query = req.query;

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: query.bedroom ? parseInt(query.bedroom) : undefined,
        status: query.status || "approved",
        price: {
          gte: query.minPrice ? parseInt(query.minPrice) : 0,
          lte: query.maxPrice ? parseInt(query.maxPrice) : 10000000,
        },
      },
    });
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    let userId;
    const token = req.cookies.token;

    if (!token) {
      userId = null;
    } else {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
          userId = null;
        } else {
          userId = payload.id;
        }
      });
    }

    // const saved = await prisma.savedPost.findUnique({
    //   where: {
    //     userId_postId: {
    //       postId: id,
    //       userId,
    //     },
    //   },
    // });
    // res.status(200).json({ ...post, isSaved: saved ? true : false });

    res.status(200).json({ ...post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        status: "pending", //  always pending by default
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const existingPost = await prisma.post.findUnique({
      where: { id },
      include: { postDetail: true },
    });

    if (!existingPost || existingPost.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    const {
      title,
      price,
      address,
      city,
      type,
      property,
      latitude,
      longitude,
      bedroom,
      bathroom,
      images,
      size,
      postDetail,
    } = req.body;

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        price,
        address,
        city,
        type,
        property,
        latitude,
        longitude,
        bedroom,
        bathroom,
        images,
        size,
        status: "pending", // ✅ force re-approval

        postDetail: {
          update: {
            propertyId: postDetail.propertyId,
            school: postDetail.school,
            bus: postDetail.bus,
            hospital: postDetail.hospital,
            phone: postDetail.phone,
            balcony: postDetail.balcony,
            garage: postDetail.garage,
            availableFloor: postDetail.availableFloor,
            totalFloor: postDetail.totalFloor,
            facing: postDetail.facing,
            furnishing: postDetail.furnishing,
            floorPlans: postDetail.floorPlans,
            amenities: postDetail.amenities,
            status: postDetail.status,
          },
        },
      },
    });

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update post" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const tokenUserRole = req.userRole;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    //  Allow post owner OR admin to delete
    if (post.userId !== tokenUserId && tokenUserRole !== "ADMIN") {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    //  Delete PostDetail first
    await prisma.postDetail.deleteMany({
      where: {
        postId: id,
      },
    });

    //  Then delete Post
    await prisma.post.delete({
      where: { id },
    });

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};

export const updatePostStatus = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const role = req.userRole;

  if (role !== "ADMIN") {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  try {
    await prisma.post.update({
      where: { id },
      data: { status },
    });

    res.status(200).json({ message: "Post status updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update status" });
  }
};

// get Posts By Users
export const getPostsByUser = async (req, res) => {
  const userId = req.params.userId;
  const { status } = req.query;

  try {
    const posts = await prisma.post.findMany({
      where: {
        userId,
        ...(status ? { status } : {}),
      },
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user's posts" });
  }
};

export const getPostById = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { postDetail: true },
    });

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch post" });
  }
};
