import React from 'react';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Footer.css';

// Import Images
import bg from '../../header-bk.png';

export function Footer() {
  return (
    <div style={{ background: `#FDF url(${bg}) center` }} className={styles.footer}>
      <p>&copy; 2017 &middot; Blog Made by Cheraws </p>
    </div>
  );
}

export default Footer;
