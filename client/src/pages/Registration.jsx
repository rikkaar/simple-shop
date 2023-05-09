import React from 'react';
import {Link} from "react-router-dom";
import avatar from '../assets/profile.png'
import styles from '../styles/Login.module.css'

const Registration = () => {
    return (
        <div className="container mx-auto fixed inset-0 flex justify-center items-center">
            <div className="flex items-center justify-center">
                <div className={styles.glass}>
                    <div className="title flex flex-col items-center">
                        <h4 className="text-3xl font-bold">hello!</h4>
                        <span>
                            Welcome back, samurai
                        </span>

                        <form action="" className={'py-1 w-full'}>
                            <div className="profile flex flex-center py-4 justify-center">
                                <img className={styles.profile_img} src={avatar} alt="Avatar"/>
                            </div>

                            <div className="w-full flex flex-col items-center gap-6">
                                <input className={styles.textBox} type="text" placeholder={"Username"}/>
                                <button className={styles.btn} >Log in</button>
                            </div>

                            <div className="text-center py-4">
                                <span className={'text-gray-300'}>Not a member? <Link className={'text-red-400'} to={'/registration'}>Register now</Link> </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;