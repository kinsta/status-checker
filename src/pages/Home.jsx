import { Link } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <div className="app-container">
            <Header />
            <div className="container">
                <div className="container-title">
                    <h1 className="title">Status Checker with Kinsta API</h1>
                    <p className="description">
                        This is a React app that uses the Kinsta API to check the
                        status of all sites, applications and databases on MyKinsta.
                    </p>
                </div>
                <div className="services">
                    <Link to='/service/wp-site'>
                        <div className="service">
                            <h2 className="service-title">WordPress Sites</h2>
                            <p className="service-description">
                                Use the Kinsta API to check the status of all WordPress sites on
                                MyKinsta.
                            </p>
                        </div>
                    </Link>
                    <Link to='/service/application'>
                        <div className="service">
                            <h2 className="service-title">Applications</h2>
                            <p className="service-description">
                                Use the Kinsta API to check the status of all applications on
                                MyKinsta.
                            </p>
                        </div>
                    </Link>
                    <Link to='/service/database'>
                        <div className="service">
                            <h2 className="service-title">Databases</h2>
                            <p className="service-description">
                                Use the Kinsta API to check the status of all databases on
                                MyKinsta.
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default Home