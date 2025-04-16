import React from 'react';
import '../asset/css/style.css';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="footer">


            <div>
                <div className="footer-header">
                    <div style={{ paddingLeft: '20px' }}>
                        <span>3rd-4th May, 2025 Codissia, Coimbatore</span>
                        <span>3rd-4th May, 2025</span>
                    </div>
                    <div className="footer-main">
                        <h1 className="footer-title">DISRUPT TO RISE</h1>

                        <div className="footer-bottom">
                            <div className="footer-left">
                                <p>Contact@TNGSS.com</p>
                                <p>All Rights Reserved © 2024</p>
                            </div>

                            <div className="footer-social">
                                <a href="#"><FaFacebookF  color='white'/></a>
                                <a href="#"><FaInstagram color='white'/></a>
                                <a href="#"><FaYoutube color='white'/></a>
                                <a href="#"><FaLinkedinIn color='white'/></a>
                                <a href="#"><FaXTwitter color='white'/></a>
                            </div>

                            <div className="footer-right">
                                <a href="#">Terms & Conditions</a>
                                <a href="#">Privacy Policy</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;