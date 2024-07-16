import gif from '../assets/Spinner@1x-1.0s-200px-200px.gif';
// import { Container, Box } from '@mui/material';

const Loader = () => {
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh', 
                }}
            >
                <img src={gif} alt="loading" />
            </div>
        </div>
    );
};

export default Loader;
