import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Service = () => {
    let [uniqueName, setUniqueName] = useState('');

    const { slug } = useParams();
    const navigate = useNavigate();
    const title = useRef('');

    if (slug === 'wp-site') {
        title.current = 'WordPress Sites';
    } else if (slug === 'application') {
        title.current = 'Applications';
    } else if (slug === 'database') {
        title.current = 'Databases';
    }

    useEffect(() => {
        if (slug !== 'wp-site' && slug !== 'application' && slug !== 'database') {
            return navigate('/');
        }
    }, [slug, navigate]);


    return (
        <div className="app-container">
            <Header />
            <div className="container">
                <div className="container-title">
                    <h1 className="title">Status Checker with Kinsta API</h1>
                    <p className="description">
                        This React app uses the Kinsta API to check the
                        status of your {title.current} on MyKinsta.
                    </p>
                </div>
                <div className="search-container">
                    <input type="text" placeholder={`Type in a unique name of your ${title.current}...`} value={uniqueName} className="search-input" onChange={(e) => setUniqueName(e.target.value)} />
                    <input type="button" value="Search" className='btn' />
                </div>
                <div className="services">
                    <div className="details">
                        <div className="name-details">
                            <span className="tag">Name: </span>
                            <span className="value">The Project Name</span>
                        </div>
                        <div className="status-details">
                            <span className="tag">Status: </span>
                            <span className="value"> The Project Status</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default Service