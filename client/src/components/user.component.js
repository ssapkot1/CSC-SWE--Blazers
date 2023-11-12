import React, { useState } from 'react';
import LoginComponent from './login.component';
import CreateUserComponent from './create-user.component';

const UserComponent = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const switchModeHandler = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div>
      {isLoginMode ? (
        <LoginComponent onSwitchMode={switchModeHandler} />
      ) : (
        <CreateUserComponent onSwitchMode={switchModeHandler} />
      )}
    </div>
  );
};

export default UserComponent;