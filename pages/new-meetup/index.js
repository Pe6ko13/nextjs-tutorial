import NewMeetupForm from '@/components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
import Head from 'next/head';

const NewMeetup = () => {
    const router = useRouter();

    const addNewMeetupHandler = async (enteredMeetupData) => {
        const res = await fetch('api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        console.log(data);

        router.push('/');
    };

    return (
        <>
            <Head>
                <title>Add new meetup</title>
                <meta name='description' content='Add your own meetup' />
            </Head>
            <NewMeetupForm onAddMeetup={addNewMeetupHandler} />
        </>
    );
};

export default NewMeetup;
