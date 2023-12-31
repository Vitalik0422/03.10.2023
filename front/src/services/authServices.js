import instance from "../apiQuery/instance"
import {userAuth} from '../slicer/authSlice'

const registration = (dispatch) =>  async (email, password) => {
    const {data} = await instance.post('/registration', {email,password})
    console.log(data);
    dispatch(userAuth(data.user));
    localStorage.setItem('token', data.tokens);
}

 const login = (dispatch) =>  async (email, password) => {
    console.log('work');
    const {data} =  await instance.post('/login', {email,password})
    console.log(data);
    dispatch(userAuth(data.user.email));
    localStorage.setItem('token', data.tokens);
  };

const logout = async () => {
    const {data} = instance.post('/logout')
    return data
}

const refresh = async () => {
    const {data} = instance.post('/refresh')
    return data
}

const authActions = {
    registration,
    login,
    logout,
    refresh
}

export default authActions





