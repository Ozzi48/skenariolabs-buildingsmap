import { createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './rootReducer';
const persistConfig = {
    key: 'buildings',
    storage: storage,
    whitelist: ['buildings'], // which reducer want to store
    version: 2
};
const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(pReducer, compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));
const persistor = persistStore(store);
export { persistor, store };