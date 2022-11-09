import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('hello');
    }

    render() {
        return (
            <div className='container text-center'>
                <div className='row'>
                    <h1>Login</h1>
                </div>

                <form>
                    <div class='mb-3'>
                        <label for='exampleInputEmail1' class='form-label'>
                            Username
                        </label>
                        <input type='email' class='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' />
                        <div id='emailHelp' class='form-text'>
                            We'll never share your credentials with anyone else.
                        </div>
                    </div>
                    <div class='mb-3'>
                        <label for='exampleInputPassword1' class='form-label'>
                            Password
                        </label>
                        <input type='password' class='form-control' id='exampleInputPassword1' />
                    </div>

                    <button type='submit' class='btn btn-primary'>
                        Submit
                    </button>
                </form>

                <a className='btn btn-primary' href='/' role='button'>
                    Home
                </a>

                <div>
                    <p>New User?</p>

                    <a className='btn btn-primary' href='/register' role='button'>
                        Register
                    </a>

                    <a className='btn btn-primary' href='/campaigns/:uid' role='button'>
                        Campaigns
                    </a>
                </div>
            </div>
        );
    }
}

export default Login;
