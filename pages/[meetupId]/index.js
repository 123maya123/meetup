import React from "react";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient, ObjectId} from 'mongodb';

//putting [] means its a dynamic id
function MeetupDetails(props) {
  return (
    <React.Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name="description"
          content={props.meetupData.description} //in serach engine it will showup
        />
      </Head>
      <MeetupDetail
        image={props.meetupData.image} //meetupData obj. defined below n it holds meetup item
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </React.Fragment>
  );
}

export async function getStaticPaths() {
  //connect to DB with below code
  const client = await MongoClient.connect(
    "mongodb+srv://Manjula:manjula91@cluster0.zljlr.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  //to get all meetup data below code:
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); //_id:1 means instructionTo include id noOther field
  client.close();

  return {
    fallback: 'blocking', //this a way of nextjs saying there might be more pages
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })), //map every meetup item to object,where every obj has params key
  };
}

//DATA FETCHING FOR PRE RENDERING:consider it only your data is't frequently changing else getServerSideProps
export async function getStaticProps(context){
  const meetupId = context.params.meetupId;//meetupId bcoz thats what we have between sqaure brackets
  //connect to DB with below code as did above
  const client = await MongoClient.connect(
    "mongodb+srv://Manjula:manjula91@cluster0.zljlr.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  //to get all meetup data below code:
  const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)});
  client.close();

  return{
    props: {
      meetupData:{
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description
      } 
    },
  };
}
 
export default MeetupDetails;
