import React from 'react';

import { ContactItem } from '../ContactItem';

export const ContactList = ({ list, onDeleteContact }) => {
  return (
    <ul>
      {list.map(item => (
        <ContactItem
          key={item.id}
          item={item}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </ul>
  );
};
