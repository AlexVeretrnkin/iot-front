import { useRouter } from "next/router";
import { isBrowser } from '../utils/browser.util';
import { getJwtFromLocalStorage, removeToken, setAuthorisationHeader } from '../core/auth';

const withAuth = (WrappedComponent) => {
    return (props) => {
        if (isBrowser()) {
            const Router = useRouter();

            const accessToken: string = getJwtFromLocalStorage();

            setAuthorisationHeader(accessToken);

            if (!accessToken) {
                removeToken();

                Router.replace("/");
            }

            return <WrappedComponent {...props} />;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
