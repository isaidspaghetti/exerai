import React, { useEffect, useState } from 'react';
import axios from 'axios';
import env from 'react-dotenv';
import { Loading } from '../components/Loading';
import 'react-toastify/dist/ReactToastify.css';
import { MovementCard } from '../components/MovementCard';
import { MovementsList } from '../components/MovementsList';

const Home = () => <MovementsList />;

export { Home };
