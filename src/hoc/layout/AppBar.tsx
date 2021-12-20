import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { drawerConst } from '../../constants/drawer.const';
import { AppBarProps } from '../../models/props/app-bar.props';

const AppBar = styled(MuiAppBar, {
    shouldForwardProp : (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition : theme.transitions.create(['margin', 'width'], {
        easing   : theme.transitions.easing.sharp,
        duration : theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width      : `calc(100% - ${drawerConst}px)`,
        marginLeft : `${drawerConst}px`,
        transition : theme.transitions.create(['margin', 'width'], {
            easing   : theme.transitions.easing.easeOut,
            duration : theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default AppBar;
