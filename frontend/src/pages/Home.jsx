import React from 'react';
import { Outlet, Link } from 'react-router-dom';

class Home extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    // componentDidMount(props) {
    //     console.log(props);
    // }

    render() {
        return (
            <div className='container text-center'>
                <div className='row p-5'>
                    <h1>DM Gen</h1>
                </div>
                <div className='row p-3'>
                    <h6>
                        A D&D website that helps DMs populate their worlds faster while allowing to them share the
                        information with their players
                    </h6>
                </div>
                <div className='row p-5'>
                    <div className='col'>
                        <a className='btn btn-primary' href='/login' role='button'>
                            Login
                        </a>
                    </div>
                    <div className='col'>
                        <a className='btn btn-primary' href='/register' role='button'>
                            Register
                        </a>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <a className='btn btn-primary' href='/about' role='button'>
                            See How It Works
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
