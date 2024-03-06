import React from 'react';

import styles from './styles.module.css';

export const ContactItem = ({ item, onDeleteContact }) => {
  return (
    <li className={styles.item}>
      <p>{item.name}:</p>
      <div className={styles.number}>{item.number}</div>
      <button onClick={() => onDeleteContact(item.id)}> delete</button>
    </li>
  );
};
