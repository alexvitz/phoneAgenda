import React from 'react';
import Drawer from 'react-modern-drawer';
import '../../styles/styles.scss';
import 'react-modern-drawer/dist/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLocationDot,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const ContactDetailsDrawer = ({ contact, closeDrawer, showDetails }) => {
  return (
    <div>
      <Drawer
        open={showDetails}
        onClose={closeDrawer}
        direction="right"
        size={`${25}vw`}
        overlayOpacity={0.5}
      >
        <div className="d-flex justify-content-center flex-column p-2">
          <h2 className="text-center">Contact Details</h2>
          <div className="contactLetter">
            {!contact?.firstName ? (
              <FontAwesomeIcon icon={faUser} size="xl" />
            ) : (
              <div className="d-flex align-self-center">
                {contact.firstName.charAt(0) + ' ' + contact.lastName.charAt(0)}
              </div>
            )}
          </div>
          <div className="detailsRow">
            <FontAwesomeIcon icon={faUser} className="mr-1 iconColor" />
            First name: {contact?.firstName}
          </div>
          <div className="detailsRow">
            <FontAwesomeIcon icon={faUser} className="mr-1 iconColor" />
            Last name: {contact?.lastName}
          </div>
          <div className="detailsRow">
            <FontAwesomeIcon icon={faPhone} className="mr-1 iconColor" />
            Phone number: {contact?.number}
          </div>
          <div className="detailsRow">
            <FontAwesomeIcon icon={faEnvelope} className="mr-1 iconColor" />
            Email: {contact?.email}
          </div>
          <div className="detailsRow">
            <FontAwesomeIcon icon={faLocationDot} className="mr-1 iconColor" />
            Adress: {contact?.adress}
          </div>
          {contact?.notes ? (
            <div className="detailsRow">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="mr-1 iconColor"
              />
              Notes: {contact?.notes}
            </div>
          ) : null}
        </div>
      </Drawer>
    </div>
  );
};

export default ContactDetailsDrawer;
