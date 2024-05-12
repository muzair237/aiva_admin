import React from 'react';
// import Head from 'next/head';
import withAuthProtection from '../components/Common/withAuthProtection';

const Dashboard = () => <div>index</div>;

export default withAuthProtection(Dashboard);
