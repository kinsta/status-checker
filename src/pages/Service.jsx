import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Service = () => {
    let [uniqueName, setUniqueName] = useState('');
    let [status, setStatus] = useState('');
    let [name, setName] = useState('');
    let [error, setError] = useState('');

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

    const CheckQuery = async (name) => {
        if (slug === 'wp-site') {
            await CheckSites(name);
        } else if (slug === 'application') {
            await CheckApplications(name);
        } else if (slug === 'database') {
            await CheckDatabases(name);
        }
    }

    const CheckSites = async (name) => {
        setName('');
        setStatus('');
        setError('');
        const query = new URLSearchParams({
            company: `${process.env.REACT_APP_KINSTA_COMPANY_ID}`,
        }).toString();

        const resp = await fetch(
            `${KinstaAPIUrl}/sites?${query}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_KINSTA_API_KEY}`
                }
            }
        );

        const data = await resp.json();
        let sitesData = data.company.sites;
        let site = sitesData.find(site => site.name === name || site.display_name === name);
        if (site) {
            setName(site.display_name);
            if (site.status === 'live') {
                setStatus('🟢 Running');
            } else if (site.status === 'staging') {
                setStatus('🟡 Staging');
            } else {
                setStatus('🟡 Unknown');
            }
            setUniqueName('');
        } else {
            setError('No such site found for your account');
            setUniqueName('');
        }
    }

    const CheckApplications = async (name) => {
        setName('');
        setStatus('');
        setError('');
        const query = new URLSearchParams({
            company: `${process.env.REACT_APP_KINSTA_COMPANY_ID}`,
        }).toString();

        const resp = await fetch(
            `${KinstaAPIUrl}/applications?${query}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_KINSTA_API_KEY}`
                }
            }
        );

        const data = await resp.json();
        let appsData = data.company.apps.items;
        let app = appsData.find(app => app.unique_name === name || app.name === name || app.display_name === name);
        if (app) {
            setName(app.display_name);
            if (app.status === 'deploymentSuccess') {
                setStatus('🟢 Running');
            } else if (app.status === 'deploymentFailed') {
                setStatus('🔴 Failed');
            } else if (app.status === 'deploymentPending') {
                setStatus('🟡 Pending');
            } else if (app.status === 'deploymentInProgress') {
                setStatus('🟡 In Progress');
            } else {
                setStatus('🟡 Unknown');
            }
            setUniqueName('');
        } else {
            setError('No such app found for your account');
            setUniqueName('');
        }

    }

    const CheckDatabases = async (name) => {
        setName('');
        setStatus('');
        setError('');
        const query = new URLSearchParams({
            company: `${process.env.REACT_APP_KINSTA_COMPANY_ID}`,
        }).toString();

        const resp = await fetch(
            `${KinstaAPIUrl}/databases?${query}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_KINSTA_API_KEY}`
                }
            }
        );

        const data = await resp.json();
        let databasesData = data.company.databases.items;
        let database = databasesData.find(database => database.name === name || database.display_name === name);
        if (database) {
            setName(database.display_name);
            if (database.status === 'ready') {
                setStatus('🟢 Running');
            } else if (database.status === 'creating') {
                setStatus('🟡 Creating');
            } else {
                setStatus('🟡 Unknown');
            }
            setUniqueName('');
        } else {
            setError('No such database found for your account');
            setUniqueName('');
        }
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
                    <input type="button" value="Search" className='btn' onClick={() => CheckQuery(uniqueName)} />
                </div>
                {status !== '' && (
                    <div className="services">
                        <div className="details">
                            <div className="name-details">
                                <span className="tag">Name: </span>
                                <span className="value">{name}</span>
                            </div>
                            <div className="status-details">
                                <span className="tag">Status: </span>
                                <span className="value"> {status}</span>
                            </div>
                        </div>
                    </div>
                )}
                {error !== '' && (
                    <div className="services">
                        <div className="details">
                            <p>{error}</p>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div >
    )
}

export default Service