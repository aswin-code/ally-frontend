import React, { useContext } from 'react'
import './NavBar.scss'
import { Link, useNavigate } from 'react-router-dom';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { DarkModeContext } from '../../context/darkModeContext';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { ModalContext } from '../../context/CreatePostContext';
import IconButton from '@mui/material/IconButton';
import useAuth from '../../hooks/useAuth';
import useAction from '../../hooks/useActon';
const NavBar = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const { action, setActon } = useAction()
    console.log(user)
    const { toggle, darkMode } = useContext(DarkModeContext)
    const { setIsOpen } = useContext(ModalContext)
    const handleNavigate = (id) => {
        navigate(`profile/${id}`, { state: id })
        setActon(prev => prev + 1)
    }

    return (
        <div className="navbar">

            <div className="left">
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <h2>All<span>y</span></h2>
                </Link>
                {
                    darkMode ? <WbSunnyOutlinedIcon onClick={() => toggle()} /> : <DarkModeOutlinedIcon onClick={() => toggle()} />
                }
                <IconButton onClick={() => setIsOpen(true)} >
                    <AddAPhotoRoundedIcon style={{ cursor: 'pointer', color: '#000' }} />
                </IconButton>
                <div className="search" >
                    <SearchOutlinedIcon />
                    <input type="text" name="" id="" placeholder='search...' />
                </div>
            </div>
            <div className="right">
                <PersonOutlineOutlinedIcon />
                <EmailOutlinedIcon />
                <NotificationsNoneOutlinedIcon />
                <div className="user" onClick={() => handleNavigate(user.user._id)}>
                    <img src={user.user?.profilePic} alt="" />
                    <span>{user.user?.name}</span>
                </div>
            </div>
        </div>
    )
}

export default NavBar