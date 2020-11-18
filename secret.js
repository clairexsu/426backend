const secret_data= require('data-store')({path:process.cwd() + '/data/secret.json'});
// name of database right now is users.json ^^

class Secret {
    constructor(id, username, secret){
        this.id=id;
        this.username= username;
        this.secret = secret;
        // this.myPosts = myPosts;
        // this.savedPosts = savedPosts;
    }

    update() {
        secret_data.set(this.id.toString(), this);
    }

    delete(){
        secret_data.del(this.id.toString());
    }
}

Secret.getAllIDs = () => {
    //return array of all user ids
    return Object.keys(secret_data.data).map((id=> {return parseInt(id);}));
}

Secret.getAllIDsForUser = (username) => {
    // should this be checking anything with passwords?
    return Object.keys(secret_data.data).filter(id => secret_data.get(id).username == username).map(id => parseInt(id));
}

Secret.findByID = (id) => {
    // uses data store value of user_data to find user
    let sdata = secret_data.get(id);
    if(sdata != null) {
        // returns a new instance of a User... not sure if this is right
        return new Secret(sdata.id, sdata.username, sdata.secret);
    }
    return null;
}

Secret.next_id = Secret.getAllIDs().reduce((max, next_id) => {
    if (max < next_id) {
        return next_id;
    }
    return max;
}, -1) + 1;

Secret.create = (username, secret) => {
    let id = Secret.next_id;
    Secret.next_id += 1;
    let u = new Secret(id, username, secret);
    secret_data.set(u.id.toString(), u);
    return u;
}
module.exports = Secret;
// next: 
// need to connect posting and liking with this user
// need a function to append post objects to their two properties: likedPosts and previousPosts