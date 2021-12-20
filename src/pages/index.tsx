import type { NextPage } from 'next';

import { Box, Container, Input } from '@mui/material';
import Auth from '../components/Auth';

const IndexPage: NextPage = () => {
    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Box
                sx={{
                    width: 400,
                }}
            >
                <Auth/>
            </Box>
        </Box>
    );
};

export default IndexPage;
