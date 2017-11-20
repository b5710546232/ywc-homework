import axios from 'axios'

export const getInterviewees = () => {
    const API = 'https://ywc15.ywc.in.th/api/interview'
    return new Promise((resolve, reject) => axios.get(API)
        .then((response) => {
            console.log(response)
            return resolve(response.data)
        }).catch((error) => {
            console.error(error)
            reject(error)
        })
    )
}