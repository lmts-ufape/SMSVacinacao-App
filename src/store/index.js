import { createStore } from 'redux';
import { Reducers } from './ducks';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from "react-native";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['spaceState']
}

const persistedReducer = persistReducer(persistConfig, Reducers)

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export { store, persistor };
