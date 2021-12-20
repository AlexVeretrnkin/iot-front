import { styled } from '@mui/material/styles';
import { drawerConst } from '../../constants/drawer.const';
import { AppBarProps } from '../../models/props/app-bar.props';

const MainContent = styled(
    'main',
    {
        shouldForwardProp : (prop: PropertyKey) => prop !== 'open',
    },
)<AppBarProps>(({ theme, open }) => ({
    flexGrow   : 1,
    padding    : theme.spacing(3),
    transition : theme.transitions.create('margin', {
        easing   : theme.transitions.easing.sharp,
        duration : theme.transitions.duration.leavingScreen,
    }),
    marginLeft : `-${drawerConst}px`,
    ...(open && {
        transition : theme.transitions.create('margin', {
            easing   : theme.transitions.easing.easeOut,
            duration : theme.transitions.duration.enteringScreen,
        }),
        marginLeft : 0,
    }),
}));

export default MainContent;
