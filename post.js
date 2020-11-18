
const post_data = require('data-store')({path:process.cwd() + '/data/posts.json'});

class Post{
    constructor(id, date, locationID, review){
        this.id= id;
        this.date = date;
        this.locationID =locationID;
        this.review = review;
    }

    update(){
        post_data.set(this.id.toString(), this);
    }

    delete(){
        post_data.del(this.id.toString());
    }
}

Post.getALLIDs = () => {
    return Object.keys(post_data.data).map((id=> {return parseInt(id);}));

}

Post.findByID = (id) => {
    let pdata = post_data.get(id);
    if(pdata!= null){
        return new Post(pdata.id, pdata.data, pdata.locationID, pdata.review)
    } 
    return null;
}

Post.next_id = Post.getALLIDs().reduce((max, next_id) => {
    if(max < next_id){
        return next_id;
    }
    return max;
}, -1) +1;

Post.create = (date, locationID, review) =>{
    let id = Post.next_id;
    Post.next_id += 1;
    let p = new Post(id, date, locationID, review);
    post_data.set(id.toString(), p);
    return p;
}

module.exports = Post;