import React from 'react';
import {Link} from 'react-router-dom';

//404 page
const NotFoundPage = () => (
    <div>
        404! <Link to='/'>Go Home</Link>
    </div>
);

export default NotFoundPage;