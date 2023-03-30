import MeetupDetails from '../../components/meetups/MeetupDetails';
import { MongoClient, ObjectId } from 'mongodb';

export default function MeetupDetail(props) {
    console.log(props.meetupData);
    return (
        <MeetupDetails
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(
        'mongodb+srv://pe6ko13:NSpVNwOotfEMDWo6@pe6ko13.vdbvpbl.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();
    const meetupCollection = db.collection('meetups');

    const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        paths: meetups.map((meet) => ({
            params: {
                meetupId: meet._id.toString(),
            },
        })),
        fallback: false,
    };
}

export async function getStaticProps(content) {
    const meetupId = content.params.meetupId;

    const client = await MongoClient.connect(
        'mongodb+srv://pe6ko13:NSpVNwOotfEMDWo6@pe6ko13.vdbvpbl.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();
    const meetupCollection = db.collection('meetups');

    const selectedMeetup = await meetupCollection.findOne({ _id: new ObjectId(meetupId) });

    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                address: selectedMeetup.address,
                description: selectedMeetup.description,
            },
        },
    };
}
