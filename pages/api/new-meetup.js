//api/new-meetup
//here code will never expose to client so we can write credentials here
//whenever req are sent this fun will trigger
import { MongoClient } from "mongodb";

//when req reaches from new-meetup nextjs will execute this function
async function handler(req, res){
  if(req.method === 'POST'){
    const data = req.body;

   const client =  await MongoClient.connect('mongodb+srv://Manjula:manjula91@cluster0.zljlr.mongodb.net/meetups?retryWrites=true&w=majority');
   const db = client.db();

   const meetupsCollection = db.collection('meetups');

   const result = await meetupsCollection.insertOne(data);//for inserting 1 new document

   console.log(result);

   client.close();

   res.status(201).json({message: 'meetup inserted !'});
}
}
export default handler;