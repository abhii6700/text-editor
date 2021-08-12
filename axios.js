import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://text-editor-backend.herokuapp.com/api'
})

export default instance;