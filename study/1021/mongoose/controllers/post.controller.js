import Post from "../models/post.model.js";

// 전체 조회
export const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({createdAt: -1});
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        next(error);
    }
};

// 특정 게시글 조회
export const getPostById = async (req, res, next) => {
    try{
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(404).json({ success: false, message: "post not found" });
            } else {
            res.json({ success: true, data: post });
            }
    } catch(error) {
        next(error);
    }
};

// 생성
export const createPost = async (req, res, next) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(201).json({ success: true, data: newPost });
    } catch(error) {
        next(error);
    }
};

// 수정
export const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.json({ success: true, data: post });
    } catch(error) {
        next(error);
    }
};

// 삭제
export const deletePost = async(req, res, nexy) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "게시글 삭제 완료" });
    } catch(error) {
        next(error);
    }
};