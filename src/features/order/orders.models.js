

export default class OrderModel{
    constructor(userID, totalAmount, timeStamp, id){

        this.userID = userID;
        this.totalAmount = totalAmount;
        this.timeStamp = timeStamp;
        this._id = id;
    }
}