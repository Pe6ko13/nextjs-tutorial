import MeetupDetails from '../../components/meetups/MeetupDetails';

export default function MeetupDetail() {
    return (
        <MeetupDetails
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSICzacKq49KhqONP0w6tx9f1Tuu1obkriWQ9sSMBxsm9mbTE4jQVZ6SLEdT0OrvaZOX3w&usqp=CAU'
            title='First Meetup'
            address='Krakow'
            description='This is first meetup'
        />
    );
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { meetupId: 'm1' } },
            { params: { meetupId: 'm2' } },
            { params: { meetupId: 'm3' } },
        ],
        fallback: false,
    };
}

export async function getStaticProps(content) {
    const meetupId = content.params.meetupId;

    return {
        props: {
            meetupData: {
                id: 'm1',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSICzacKq49KhqONP0w6tx9f1Tuu1obkriWQ9sSMBxsm9mbTE4jQVZ6SLEdT0OrvaZOX3w&usqp=CAU',
                title: 'First Meetup',
                address: 'Krakow',
                description: 'This is first meetup',
            },
        },
    };
}
