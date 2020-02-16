export default class Like {
    constructor(){
        this.likes = [];
    };

    addLike(id, author, title, img){
        const like = {
            id, 
            title,
            author,
            img
        };
        this.likes.push(like);
        
        // Persist data in storage
        this.persistData();

        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        if (index !== -1) this.likes.splice(index, 1);

        // Persist data in storage
        this.persistData();
    }

    isLiked(id){
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes(){
        return this.likes.length;
    }


    /**
     * USE STORAGE TO PERSIST DATA
     */

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        console.log(storage);
        //Restoring likes from the localStorage
        if (storage) this.likes = storage;
    }
}