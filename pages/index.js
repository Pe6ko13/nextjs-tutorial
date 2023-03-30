import MeetupList from '@/components/meetups/MeetupList';
import { MongoClient } from 'mongodb';

const MEETUPS = [
    {
        id: 'm1',
        title: 'First meetup',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSICzacKq49KhqONP0w6tx9f1Tuu1obkriWQ9sSMBxsm9mbTE4jQVZ6SLEdT0OrvaZOX3w&usqp=CAU',
        address: 'Krakow',
        description: 'This is first meetup',
    },
    {
        id: 'm2',
        title: 'Second meetup',
        image: 'https://a.cdn-hotels.com/gdcs/production163/d345/47e14d8a-051b-4932-85d1-8f5c0363fde7.jpg',
        address: 'Budapest',
        description: 'This is second meetup',
    },
    {
        id: 'm3',
        title: 'Third meetup',
        image: 'https://withlocals-com-res.cloudinary.com/image/upload/w_360,h_202,c_fill,g_auto,q_auto,dpr_3.0,f_auto/v1/destinations/Romania/Bucharest/AdobeStock_503175206',
        address: 'Bucharest',
        description: 'This is third meetup',
    },
];

const HomePage = (props) => {
    return <MeetupList meetups={props.meetups} />;
};

export async function getStaticProps() {
    const client = await MongoClient.connect(
        'mongodb+srv://pe6ko13:NSpVNwOotfEMDWo6@pe6ko13.vdbvpbl.mongodb.net/meetups?retryWrites=true&w=majority'
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
