import React, { useState, useEffect } from 'react';
import './App.css';
import { API } from 'aws-amplify';

const GitHubBornOn = () => {

    const [getDate, setDate] = useState({ user: 'unkown', birthDate: 'unknown' }); 

    const fetchData = async () => {

        const data = await API.get('cryptoapi','/born');
        
        setDate({
            user: data.borninfo.login
            , birthDate: data.borninfo.created_at
        });
    };

    useEffect(
        () => {
            fetchData();
        }
        , []
    );

    return (
        <h3>
            { getDate.user } - { getDate.birthDate }
        </h3>

    );

}

export default GitHubBornOn;