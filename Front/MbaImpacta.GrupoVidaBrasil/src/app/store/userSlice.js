/* eslint import/no-extraneous-dependencies: off */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "@history";
import _ from "@lodash";
import { setInitialSettings } from "app/store/fuse/settingsSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import settingsConfig from "app/configs/settingsConfig";
import jwtService from "../auth/services/jwtService";

export const setUser = createAsyncThunk(
  "user/setUser",
  async (user, { dispatch, getState }) => {
    const dataUser = {
      role: "user",
      data: {
        uniqueName: user.unique_name,
        displayName: user.given_name,
        idPessoa: user.id_pessoa,
        email: user.email,
      },
    };
    if (user.loginRedirectUrl) {
      settingsConfig.loginRedirectUrl = user.loginRedirectUrl; // for example '/apps/academy'
    }

    return dataUser;
  }
);

export const updateUserSettings = createAsyncThunk(
  "user/updateSettings",
  async (settings, { dispatch, getState }) => {
    const { user } = getState();
    const newUser = _.merge({}, user, { data: { settings } });

    return newUser;
  }
);

export const logoutUser = () => async (dispatch, getState) => {
  const { user } = getState();

  if (!user.role || user.role.length === 0) {
    // is guest
    return null;
  }

  history.push({
    pathname: "/",
  });

  dispatch(setInitialSettings());

  return dispatch(userLoggedOut());
};

export const updateUserData = (user) => async (dispatch, getState) => {
  if (!user.role || user.role.length === 0) {
    // is guest
    return;
  }

  jwtService
    .updateUserData(user)
    .then(() => {
      dispatch(showMessage({ message: "User data saved with api" }));
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.message }));
    });
};

const initialState = {
  role: [], // guest
  data: {
    uniqueName: "",
    idPessoa: "",
    displayName: "",
    email: "",
    foto: null,
    usuarioMontadora: false,
    dpo: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedOut: (state, action) => initialState,
  },
  extraReducers: {
    [updateUserSettings.fulfilled]: (state, action) => action.payload,
    [setUser.fulfilled]: (state, action) => action.payload,
  },
});

export const { userLoggedOut } = userSlice.actions;

export const selectUser = ({ user }) => user;

export default userSlice.reducer;
