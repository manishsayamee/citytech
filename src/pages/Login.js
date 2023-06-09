import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUserSession } from '../utils/common';
import axios from 'axios';

const Login = props => {
  const history = useNavigate();
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('https://jp-dev.cityremit.global/web-api/config/v1/auths/login', {
      login_id: username.value, login_password: password.value,
      ip_address: "27.111.20.170"
    }).then(response => {
      setLoading(false);
      setUserSession(response.data["data"][0]["jwt_token"], response.data["data"][0]["login_id"]);
      history('/dashboard');
    }).catch(error => {
      setLoading(false);
      if (error.response?.status === 403) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label for="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
              <div className="mt-2">
                <input id="login_id" {...username} name="login_id" type="text" autocomplete="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                </div>
              </div>
              <div className="mt-2">
                <input id="password" name="password" {...password} type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign In</button>
            </div>
          </form>

        </div>
      </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;