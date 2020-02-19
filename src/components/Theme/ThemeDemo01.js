import React from 'react';
import styles from './ThemeDemo01.module.scss';
import {themeIconPrimary} from '../../statics/scss/theme/_variables.scss'

const ThemeDemo01 = () => {

  const changeTheme = e => {
    let theme = e.currentTarget.id
    document.body.setAttribute("data-theme", theme)
  }
  console.log(themeIconPrimary)
  return (
    <div className="m-5">
      <button id="light" className="btn btn-primary px-4 mx-2" onClick={changeTheme}>
        light
      </button>
      <button id="dark" className="btn btn-primary px-4 mx-2" onClick={changeTheme}>
        dark
      </button>

      <div className={`mt-5 p-5 border ${styles.testBg}`}>

      </div>
    </div>
  );
}

export default ThemeDemo01;