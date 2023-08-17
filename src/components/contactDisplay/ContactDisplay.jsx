import React from 'react';
import { Col, Row } from 'react-bootstrap';
import '../../styles/styles.scss';
import Button from '../button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faEnvelope,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const contactInfo = ({
  contact,
  index,
  handleSelectContact,
  handleDeleteContact,
}) => {
  return (
    <div className="contactBox" key={'contact-' + index}>
      <Row className="d-flex w-100">
        <Col md={10} className="d-flex justify-content-end">
          <div className="contactLetter">
            {!contact.firstName ? (
              <FontAwesomeIcon icon={faUser} size="xl" />
            ) : (
              <div className="d-flex align-self-center">
                {contact.firstName.charAt(0) + ' ' + contact.lastName.charAt(0)}
              </div>
            )}
          </div>
        </Col>
        <Col md={2}>
          <div className="dropdown ">
            <div
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                size="lg"
                className="iconColor"
              />
            </div>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <div className="p-2">
                <Button
                  className="buttons"
                  onClick={() => {
                    handleSelectContact(contact, 'Details');
                  }}
                  name="Details"
                />
                <Button
                  className="buttons"
                  onClick={() => {
                    handleSelectContact(contact, 'Edit');
                  }}
                  name="Edit"
                />
                <Button
                  className="buttons"
                  onClick={() => {
                    handleDeleteContact(contact);
                  }}
                  name="Delete"
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <div className="d-flex justify-content-center align-items-center flex-column w-100 p-0">
        {contact.firstName || contact.lastName ? (
          <div className="d-flex justify-content-center align-items-center w-100">
            <Row className="w-100 m-1 align-items-center">
              <FontAwesomeIcon icon={faUser} className="mr-2 iconColor" />
              <p className="contactInfo">
                {contact.firstName + ' ' + contact.lastName}
              </p>
            </Row>
          </div>
        ) : null}
        {contact.number ? (
          <div className="d-flex justify-content-center align-items-center w-100">
            <Row className="w-100 m-1 align-items-center">
              <FontAwesomeIcon icon={faPhone} className="mr-2 iconColor" />
              <div className="contactInfo">{contact.number}</div>
            </Row>
          </div>
        ) : null}
        {contact.email ? (
          <div className="d-flex justify-content-center align-items-center w-100">
            <Row className="w-100 m-1 align-items-center">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2 iconColor" />
              <div className="contactInfo">{contact.email}</div>
            </Row>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default contactInfo;
