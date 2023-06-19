import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const Service = () => {
    let [uniqueName, setUniqueName] = useState('');
    const { slug } = useParams();
    const navigate = useNavigate();
    const title = useRef('');
    const KinstaAPIUrl = 'https://api.kinsta.com/v2';

    if (slug === 'wp-site') {
        title.current = 'WordPress Sites';
    } else if (slug === 'application') {
        title.current = 'Applications';
    } else if (slug === 'database') {
        title.current = 'Databases';
    }

    const CheckApplications = async (name) => {
        const response = await fetch(`${KinstaAPIUrl}/applications/${name}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            }
        });
        const data = await response.json();
        console.log(data);
        setUniqueName = '';
    }

    useEffect(() => {
        if (slug !== 'wp-site' && slug !== 'application' && slug !== 'database') {
            return navigate('/');
        }
    }, [slug, navigate]);


    return (
        <div className="app-container">
            <Link to="/">
                <img src="./../kinsta-logo.png" alt="Kinsta Logo" className="kinsta-logo" />
            </Link>
            <div className="container">
                <div className="container-title">
                    <h1 className="title">Status Checker with Kinsta API</h1>
                    <p className="description">
                        This React app uses the Kinsta API to check the
                        status of your {title.current} on MyKinsta.
                    </p>
                </div>
                <div className="search-container">
                    <input type="text" placeholder="Type in a unique name..." value={uniqueName} className="search-input" onChange={(e) => setUniqueName(e.target.value)} />
                    <input type="button" value="Search" className='btn' onClick={() => CheckApplications(uniqueName)} />
                </div>
                <div className="services">
                    <div className="service">

                    </div>
                </div>
            </div>
            <div className="footer">
                <p className="footer-text">
                    Made with ❤️ by{' '}
                    <a href="" target="_blank">
                        Kinsta
                    </a>
                    . Use{' '}
                    <a href="" target="_blank">
                        Kinsta API
                    </a>{' '}
                    in your projects for free.
                </p>
            </div>
        </div >
    )
}

export default Service