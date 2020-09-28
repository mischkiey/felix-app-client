export default {
  // Deployment automation script
  API_ENDPOINT: (process.env.REACT_APP_ENV === 'production')
    ? 'https://glacial-falls-81805.herokuapp.com/api'
    : 'http://localhost:8000/api',

  TOKEN_KEY: process.env.REACT_APP_TOKEN_KEY || 'felix-felicis' // Temporary
}

