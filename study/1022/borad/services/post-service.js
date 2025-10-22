async function writePost(collection, post) {
    post.hits = 0;
    post.createdAt = new Date().toISOString();
    return await collection.insertOne(post);
}

module.exports = {
    writePost,
};