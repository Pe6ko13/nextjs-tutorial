import MeetupList from '@/components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

const HomePage = (props) => {
    console.log(process.env.REACT_APP_PASSWORD);
    return (
        <>
            <Head>
                <title>React meetups</title>
                <meta name='description' content='Browse a huge list of meetups' />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    );
};

export async function getStaticProps() {
    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.REACT_APP_USERNAME}:${process.env.REACT_APP_PASSWORD}@pe6ko13.vdbvpbl.mongodb.net/meetups?retryWrites=true&w=majority`
    );
    const db = client.db();
    const meetupCollection = db.collection('meetups');

    const meetups = await meetupCollection.find().toArray();
    client.close();

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                id: meetup._id.toString(),
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
            })),
        },
        revalidate: 1,
    };
}

export default HomePage;
