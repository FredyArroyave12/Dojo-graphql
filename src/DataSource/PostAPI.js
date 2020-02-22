const {RESTDataSource} = require("apollo-datasource-rest");

class PostApi extends RESTDataSource{
    constructor(){
        super();
        this.baseURL = "https://jsonplaceholder.typicode.com/";
    }

    async getALLPost(){
        const posts = await this.get("posts");
        const postComments = await Promise.all(
            posts.map(async post => await this.getCommentsById(post.id) )
        )
        return this.formatPost(posts, postComments)
    }

    async getCommentsById(postId){
        return await this.get(`posts/${postId}/comments`)
    }

    formatPost(posts, postComments){
        return posts.map((post, index) => ({
            id: post.id,
            title: post.title,
            body: post.body,
            comments: this.formatComment(postComments[index])
        }))
    }

    formatComment(comments){
        return comments.map(Comment => ({
            id: comments.id,
            name: Comment.name,
            email: Comment.email,
            body: Comment.body

                }))
    }


}

module.exports = PostApi;