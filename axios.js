import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://localhost:3001/api'
    baseURL: 'https://text-editor-backend.herokuapp.com/api'
})

export default instance;