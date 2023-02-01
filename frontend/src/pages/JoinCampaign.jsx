import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateCampaign, reset } from '../features/campaigns/campaignSlice';
import Spinner from '../components/Spinner';

const JoinCampaign = () => {
    const [formData, setFormData] = useState({
        campaign_code: '',
    });

    const { campaign_code } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const joinCode = campaign_code;

        dispatch(updateCampaign(joinCode));
        navigate('/campaigns');
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className=''>
                <h1>Join a Campaign</h1>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='campaign_code'
                            name='campaign_code'
                            value={campaign_code}
                            placeholder='Enter the campaign code for the campaign you wish to join'
                            onChange={onChange}
                        />
                    </div>

                    <div className='form-group'>
                        <button type='submit' className='btn btn-primary'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>

            <div>
                <p>Already in a campaign?</p>

                <Link to='/campaigns' className='btn btn-primary'>
                    Go to My Campaigns
                </Link>
            </div>

            <Link to='/' className='btn btn-primary'>
                Home
            </Link>
        </>
    );
};

export default JoinCampaign;
