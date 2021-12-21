import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import { drawerConst } from '../../constants/drawer.const';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import AppBar from './AppBar';
import DrawerHeader from './DrawerHeader';
import MainContent from './MainContent';
import { Router, useRouter } from 'next/router';
import { routesConfig } from '../../config/route.config';
import { RouteModel } from '../../models/route.model';
import Link from 'next/link';
import { isBrowser } from '@emotion/utils';
import withAuth from '../with-auth';

function Portal ({ children }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const router = useRouter();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display : 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr : 2, ...(open && { display : 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        { routesConfig.find(route => route.route === router.route).name ?? '...' }
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width                : drawerConst,
                    flexShrink           : 0,
                    '& .MuiDrawer-paper' : {
                        width     : drawerConst,
                        boxSizing : 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader sx={{
                    justifyContent : 'space-between',
                    paddingLeft    : '16px',
                }}>
                    <Typography variant="h4" component="div">
                        Меню
                    </Typography>

                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <List>
                    {
                        routesConfig.filter(route => route.route !== '/').map((route: RouteModel, index) => (
                            <Link href={route.route} key={route.name}>
                                <ListItem button selected={route.route === router?.route}>

                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={route.name} />
                                </ListItem>
                            </Link>
                        ))
                    }
                </List>
            </Drawer>
            <MainContent open={open}>
                <DrawerHeader />

                {children}
            </MainContent>
        </Box>
    );
}

export default withAuth(Portal);
