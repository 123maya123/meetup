//our-domain/new-meetup
import React from 'react';
import { useRouter } from "next/router";
import Head from 'next/head';
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage(){
    const router = useRouter();//to navigate away after storing data in DB
    async function addMeetupHandler(enteredMeetupData){
        const response = await fetch('/api/new-meetup',{
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
              'Content-Type': 'application/json' 
            }
        });//it will send req to api file
        const data = await response.json();
        console.log(data);

        router.push('/');//it will navigate us to the starting page
    }//you can write x insted of enteredMeetupData its your function

    //onAddMeetup  prop is defined in NewMeetupForm.js
    return (
      <React.Fragment>
        <Head>
          <title>Add a New meetup</title>
          <meta
            name="description"
            content="Add your meetups n create amazing network" //in serach engine it will showup
          />
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
      </React.Fragment>
    );
}
export default NewMeetupPage;