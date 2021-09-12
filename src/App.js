import React, { useState } from "react";
import Layout from "./components/layout";
import NoSearch from "./components/no-search";
import Profile from "./components/profile";
import Repositories from "./components/repositories";
import useGithub from "./hooks/github-hooks";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./global/theme";
import { ResetCSS } from "./global/resetCSS";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './global/styles.css';

const App = () => {
  const [theme, changeTheme] = useState(darkTheme);
  
  const options = [
    { value: 'lighttheme', label: 'Light Theme', className: 'select-lightheme' },
    { value: 'darktheme', label: 'Dark Theme', className: 'select-darktheme' }
  ]

  const toggleTheme = (option) => {
    switch (option.value) {
      case 'lighttheme':
        changeTheme(lightTheme);
        break;
      case 'darktheme':
        changeTheme(darkTheme);
      break;
    }
  };

  const { githubState } = useGithub();
  return (
    <ThemeProvider theme={theme}>
      <ResetCSS />
        <Layout>
          <Dropdown className="dropdown-geral" options={options} value="Dark Theme" onChange={toggleTheme}/>
          {githubState.hasUser ? (
            <>
              {githubState.loading ? (
                <p>Loading</p>
              ) : (
                <>
                  <Profile />
                  <Repositories />
                </>
              )}
            </>
          ) : (
            <NoSearch />
          )}
      </Layout>
    </ThemeProvider>
  );
};

export default App;
