import React from 'react';
import Navbar from '../components/Navbar';
import ShopList from '../components/ShopList';
import ConfirmationModal from '../components/ConfirmationModal';

class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    render() {
        return (
            <div>
                <Navbar />

                <div className='row'>
                    <div className='col'>
                        <h1 className='m-3'>Magic Shop #1</h1>
                        <h6 className='m-3'>Owner: Example</h6>
                        <h6 className='m-3'>Location: Example</h6>
                    </div>
                    <div className='d-flex align-items-center justify-content-end col'>
                        <button type='button' className='m-3 btn btn-warning'>
                            Edit Shop
                        </button>
                        <button
                            onClick={() => this.setState({ isOpen: true })}
                            type='button'
                            className='m-3 btn btn-danger'
                        >
                            Delete Shop
                        </button>
                        <ConfirmationModal open={this.state.isOpen} onClose={() => this.setState({ isOpen: false })}>
                            hello
                        </ConfirmationModal>
                    </div>
                </div>
                <div className='row'>
                    <ShopList />
                </div>
            </div>
        );
    }
}

export default Shop;
