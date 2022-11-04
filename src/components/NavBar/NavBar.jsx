import React, { useContext } from 'react'
import './NavBar.scss'
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { DarkModeContext } from '../../context/darkModeContext';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
const NavBar = () => {
    const { toggle, darkMode } = useContext(DarkModeContext)
    return (
        <div className="navbar">

            <div className="left">
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <h2>All<span>y</span></h2>
                </Link>
                <HomeOutlinedIcon></HomeOutlinedIcon>
                {
                    darkMode ? <WbSunnyOutlinedIcon onClick={() => toggle()} /> : <DarkModeOutlinedIcon onClick={() => toggle()} />
                }
                <GridViewOutlinedIcon />
                <div className="search" >
                    <SearchOutlinedIcon />
                    <input type="text" name="" id="" placeholder='search...' />
                </div>
            </div>
            <div className="right">
                <PersonOutlineOutlinedIcon />
                <EmailOutlinedIcon />
                <NotificationsNoneOutlinedIcon />
                <div className="user">
                    <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    <span>Jhon</span>
                </div>
            </div>
        </div>
    )
}

export default NavBar