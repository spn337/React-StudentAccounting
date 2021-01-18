export const googleAPI = {
    initialize() {
        const googleInit = () => {
            window.gapi.auth2
                .init({
                    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID
                })
                .then(() => console.log('google init OK'))
                .catch(() => console.log('google init Error'))
        }
        return window.gapi.load('auth2', googleInit);
    },

    login() {
        const googleInstance = window.gapi.auth2.getAuthInstance();
        return googleInstance.signIn({
            score: 'profile email'
        })
    },

    logout() {

    }
}