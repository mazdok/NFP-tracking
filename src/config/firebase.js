const prodConfig = {
    apiKey: "AIzaSyD9gqyrl2RvncRxJtdjUxCYfpN3cLb9mDM",
    authDomain: "nfp-tracking.firebaseapp.com",
    databaseURL: "https://nfp-tracking.firebaseio.com",
    projectId: "nfp-tracking",
    storageBucket: "nfp-tracking.appspot.com",
    messagingSenderId: "76818829949"
}

const testConfig = {
    apiKey: "AIzaSyD7Zw2-5T9mDqpZEOq39VzDhNgANlj_eWo",
    authDomain: "fertility-tracking-testing.firebaseapp.com",
    databaseURL: "https://fertility-tracking-testing.firebaseio.com",
    projectId: "fertility-tracking-testing",
    storageBucket: "fertility-tracking-testing.appspot.com",
    messagingSenderId: "669587066091",
    appId: "1:669587066091:web:6dd54e08508e26a03f42ae"
}


export default process.env.NODE_ENV === 'production' ? prodConfig : testConfig;