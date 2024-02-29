import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyCotvmM0c5mrM1VJ-M1M9DP60CRpg_5d8U',
	authDomain: 'novolo-2.firebaseapp.com',
	projectId: 'novolo-2',
	storageBucket: 'novolo-2.appspot.com',
	messagingSenderId: '199525372757',
	appId: '1:199525372757:web:7cf3b01143d1d3fe0c55dc',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
