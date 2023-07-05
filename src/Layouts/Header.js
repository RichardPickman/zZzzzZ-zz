import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle, Form } from 'reactstrap';

//import images
import logoSm from '../assets/images/logo-sm.png';
import logoDark from '../assets/images/logo-dark.png';
import logoLight from '../assets/images/logo-light.png';

//import Components
// import SearchOption from '../Components/Common/SearchOption';
import LanguageDropdown from '../Components/Common/LanguageDropdown';
import WebAppsDropdown from '../Components/Common/WebAppsDropdown';
import MyCartDropdown from '../Components/Common/MyCartDropdown';
import FullScreenDropdown from '../Components/Common/FullScreenDropdown';
import NotificationDropdown from '../Components/Common/NotificationDropdown';
import ProfileDropdown from '../Components/Common/ProfileDropdown';
import LightDark from '../Components/Common/LightDark';

const Header = ({ onChangeLayoutMode, layoutModeType, headerClass }) => {
    return (
        <React.Fragment>
            <header
                id="page-topbar"
                className={headerClass}
                style={{ left: 0 }}
            >
                <div className="layout-width">
                    <div className="navbar-header">
                        <div className="d-flex">
                            <div className="navbar-brand-box horizontal-logo">
                                <Link
                                    to="/"
                                    className="logo logo-dark"
                                >
                                    <span className="logo-sm">
                                        <img
                                            src={logoSm}
                                            alt=""
                                            height="22"
                                        />
                                    </span>
                                    <span className="logo-lg">
                                        <img
                                            src={logoDark}
                                            alt=""
                                            height="17"
                                        />
                                    </span>
                                </Link>

                                <Link
                                    to="/"
                                    className="logo logo-light"
                                >
                                    <span className="logo-sm">
                                        <img
                                            src={logoSm}
                                            alt=""
                                            height="22"
                                        />
                                    </span>
                                    <span className="logo-lg">
                                        <img
                                            src={logoLight}
                                            alt=""
                                            height="17"
                                        />
                                    </span>
                                </Link>
                            </div>
                        </div>

                        <div className="d-flex align-items-center">
                            {/* LanguageDropdown */}
                            <LanguageDropdown />

                            {/* WebAppsDropdown */}
                            <WebAppsDropdown />

                            {/* MyCartDropdwon */}
                            <MyCartDropdown />

                            {/* FullScreenDropdown */}
                            <FullScreenDropdown />

                            {/* Dark/Light Mode set */}
                            <LightDark
                                layoutMode={layoutModeType}
                                onChangeLayoutMode={onChangeLayoutMode}
                            />

                            {/* NotificationDropdown */}
                            <NotificationDropdown />

                            {/* ProfileDropdown */}
                            <ProfileDropdown />
                        </div>
                    </div>
                </div>
            </header>
        </React.Fragment>
    );
};

export default Header;
