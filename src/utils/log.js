import INTERNALS from './internals';

const NATIVE_LOGGERS = {};

const getModuleKey = module => `${module.app.name}:${module.namespace}`;

export const getLogger = module => {
    const key = getModuleKey(module);
    return NATIVE_LOGGERS[key];
};

export const LEVELS = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
};

export const initialiseLogger = (module, logNamespace) => {
    const key = getModuleKey(module);
    if (!NATIVE_LOGGERS[key]) {
        const prefix = `🔥 ${logNamespace.toUpperCase()}`;
        NATIVE_LOGGERS[key] = {
            debug(...args) {
                if (__DEV__ && LEVELS.debug >= LEVELS[INTERNALS.OPTIONS.logLevel]) console.log(...[prefix, ...args]);
            },
            info(...args) {
                if (__DEV__ && LEVELS.info >= LEVELS[INTERNALS.OPTIONS.logLevel]) console.log(...[prefix, ...args]);
            },
            warn(...args) {
                if (__DEV__ && LEVELS.warn >= LEVELS[INTERNALS.OPTIONS.logLevel]) console.warn(...args);
            },
            error(...args) {
                console.error(...args);
            },
        };
    }
};
