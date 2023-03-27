import { useRouter } from 'next/router';
import React from 'react';

function DetailPage() {
    const router = useRouter();
    console.log(router.query);
    return <div>Details Page</div>;
}

export default DetailPage;
