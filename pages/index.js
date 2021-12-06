import Head from 'next/head'//alows to add head ele. to head section of your page wrap it around ur jsx code
import {MongoClient} from 'mongodb';
import MeetupList from "../components/meetups/MeetupList";
import React from 'react';
//to control fetching data from backend//we need to manage some state for useEffect

function HomePage(props) {
  return (
    <React.Fragment>
      <Head>
        <title>Indo-Canadian meetup</title>
        <meta
          name="description"
          content="Browse a huge list of highly active indo canadian meetups"//in serach engine it will showup
        />  
      </Head>
      <MeetupList meetups={props.meetups} />
    </React.Fragment>
  );
}

// //this is an alternative to getStaticProps //differnce is isnt not gonna run in build process instead always on the server after deployement
// export async function getServerSideProps(context){
//   const req = context.req;
//   const res = context.res;

//   return{
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }//any code you write here is server side not gonns execute on client side
// }

//DATA FETCHING FROM API(mongoDB)FOR PRE RENDERING:consider it only your data is't frequently changing else above approach
export async function getStaticProps() { //code in here never executes on clint side or visitor
    const client =  await MongoClient.connect('mongodb+srv://Manjula:manjula91@cluster0.zljlr.mongodb.net/meetups?retryWrites=true&w=majority');
   const db = client.db();

   const meetupsCollection = db.collection('meetups');
  
   const meetups = await meetupsCollection.find().toArray();

   client.close();
  return{
    props: {
      meetups: meetups.map(meetup => ({
        title:meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      }))
    },
    revalidate: 1, //after build we dont need to again build n deploy for each time new loaded data it reload data in 3600 sec or as per our need
  } //this function can only be exported from page component
} //by using it we can load data before this component executes

export default HomePage;

/*first time the home page component was rendered loadedMeetups will be an empty array then Effect function 
will execute. it will then update the state then this component funcion will execute again bcoz the state changed
it will then rerednder the list with the actual data but we will have 2 component render cycle
 -> First time the component renders the loaded meetup state will be initial state..the empthy array
 -> so its not search engine optimization
 so we have to fetch data for prerendering
 
 so there r 2 forms of pre-rendering i.e. statis generation n server side rendering*/
