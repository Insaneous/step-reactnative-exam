import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser, logoutUser, getUser } from '../../api/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkUser = createAsyncThunk('auth/getUser', async (emailOrUsername) => {
  const response = await getUser(emailOrUsername);
  return response.data;
});

export const login = createAsyncThunk('auth/login', async (userData) => {
  const response = await loginUser(userData);
  return response.data;
});

export const register = createAsyncThunk('auth/register', async (userData) => {
  const response = await registerUser(userData);
  return response.data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutUser();
  await AsyncStorage.removeItem('access_token');
  return {};
});

export const loadToken = createAsyncThunk('auth/loadToken', async () => {
  const token = await AsyncStorage.getItem('access_token');
  return token;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userExists: null,
    user: null,
    token: null,
  },
  reducers: {
    resetUserExists: (state) => {
      state.userExists = null;
    },
    setUser(state, action) {
      state.userExists = action.payload.userExists;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUser.fulfilled, (state, action) => {
        state.userExists = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        const { user, access_token } = action.payload;
        state.user = user;
        state.token = access_token;
        AsyncStorage.setItem('access_token', access_token);
      })
      .addCase(login.fulfilled, (state, action) => {
        const { data: user, access_token } = action.payload;
        state.user = user;
        state.token = access_token;
        AsyncStorage.setItem('access_token', access_token);
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      })
      .addCase(loadToken.fulfilled, (state, action) => {
        state.token = action.payload;
      });
  },
});

export const { setUser, resetUserExists } = authSlice.actions;
export default authSlice.reducer;
