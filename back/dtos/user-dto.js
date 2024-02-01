module.exports = class UserDto {
    username;
    email;
    id;
    bio;
    avatar
    constructor(model){
        this.username = model.username
        this.email = model.email
        this.id = model._id,
        this.bio = model.bio,
        this.avatar = model.avatar
    }
}