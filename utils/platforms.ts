// https://ourcodeworld.com/articles/read/525/how-to-check-if-your-code-is-being-executed-in-electron-or-in-the-browser
export const isElectron = () => {
    // Renderer process
    if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
        return true;
    }

    // Main process
    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
        return true;
    }

    // Detect the user agent when the `nodeIntegration` option is set to true
    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
        return true;
    }

    return false;
}

export const isElectronMain = () => typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron;

export const isCordova = () => {
    let result;
    // TODO consider removing try catch block (safer) or if (isBrowser) block (which is clearer), redundants..
    try {
        // On mobile devices using a local database the api will run from the browser
        if (isBrowser()) {
            const isPlatform = require('@ionic/react').isPlatform;

            result = isPlatform("cordova");
        } else result = false
    } catch(e) {
        result = false;
    }
    return result;
}

// TODO Check if no issues?
export const isBrowser = () => typeof window !== 'undefined';

export const isServerless = () => !isElectron() && !isCordova() && !isBrowser()
