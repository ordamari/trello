import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { onLogin, onLogout, onSignup} from '../actions/userActions'
import Signup from '../cmps/Signup';
import { useForm } from '../services/customHooks';
import Login from '../cmps/Login';
import { cloudinaryService } from '../services/cloudinaryService';
import Navbar from '../cmps/Navbar';
import { eventBusService } from '../services/eventBusService';
import bgLeft from '../assets/imgs/login-bg-left.png'
import bgRight from '../assets/imgs/login-bg-right.png'
import logo from '../assets/imgs/logo.png'

function _LoginSignup(props) {
    const [loginInfo, handleChangeLogin] = useForm({ username: '', password: '' });
    const [registerInfo, handleChangeSignup] = useForm({ username: '', password: '' })
    const [imgUrl, setImgUrl] = useState("https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg");
    const [isLoader, setIsLoader] = useState(false);
    const [isRegister, setIsRegister] = useState(false);


    useEffect(() => {
        eventBusService.emit('set-curr-page', 'login');
        setIsRegister(window.location.hash.split('#/')[1] !== 'login')
    }, [])

    useEffect(() => {
        setIsRegister(window.location.hash.split('#/')[1] !== 'login')
    }, [window.location.hash])

    useEffect(() => {
        if(props.loggedInUser) props.history.push('/userBoards')
    }, [props.loggedInUser])



    async function onLogin(ev) {
        ev.preventDefault()
        if (!loginInfo.username || !loginInfo.password) alert('please enter username and pasword') // change the alert
        else {
            await props.onLogin(loginInfo);
            const fromPage = props.match.params.from;
            if (fromPage === 'edit') props.history.push('/edit/web')
        }
    }

    async function onSignup(ev, signupBy) {
        if (ev) ev.preventDefault()
        if (!registerInfo.username || !registerInfo.password) alert('please enter username and pasword') // change the alert
        else {
            props.onSignup({ ...registerInfo, imgUrl: imgUrl, signupBy });
            const fromPage = props.match.params.from;
            if (fromPage === 'edit') props.history.push('/edit/web')
        }
    }

    async function SocialSignup(user) {
        props.onSignup(user);
        const fromPage = props.match.params.from;
        if (fromPage === 'edit') props.history.push('/edit/web')
    }

    async function onLogout(ev) {
        await props.onLogout();
    }

    async function uploadImg(ev) {
        setIsLoader(true);
        try {
            const newImg = await cloudinaryService.uploadImg(ev);
            setIsLoader(false)
            setImgUrl(newImg.url)
        } catch (err) {
        }
    }

    function toggleIsRegister() {
        setIsRegister(!isRegister);
    }

    return (
        <div className='login-signup'>
            <Navbar />
            <div className="bg">
                <img src={bgLeft} alt="background img left" />
                <img src={bgRight} alt="background img right" />
            </div>

            <div className="logo" onClick={()=>{props.history.push('/')}} >
                <img src={logo} alt="logo" />
                <p>Trello</p>
            </div>
            { !props.loggedInUser && isRegister && (
                <Signup
                    SocialSignup={SocialSignup}
                    toggleIsRegister={toggleIsRegister}
                    registerInfo={registerInfo}
                    handleChange={handleChangeSignup}
                    imgUrl={imgUrl}
                    uploadImg={uploadImg}
                    onSignup={onSignup}
                    history={props.history}
                />
            )}
            { !props.loggedInUser && !isRegister && (
                <Login
                    SocialSignup={SocialSignup}
                    toggleIsRegister={toggleIsRegister}
                    loginInfo={loginInfo}
                    handleChange={handleChangeLogin}
                    onLogin={onLogin}
                    history={props.history}

                />
            )}
        </div>
    )

}

const mapStateToProps = state => {
    return {
        loggedInUser: state.user.loggedinUser
    }
}
const mapDispatchToProps = {
    onLogin,
    onLogout,
    onSignup,

}
export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup)


