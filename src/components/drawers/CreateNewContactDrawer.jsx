import React, { useEffect, useState } from 'react';
import Button from '../button/Button';
import '../../styles/styles.scss';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const CreateNewContactDrawer = ({
  newContactVisible,
  closeDrawer,
  handleSaveContact,
  preselectedContact,
  contactsNumber,
}) => {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    number: '',
    email: '',
    adress: '',
    notes: '',
    id: 0,
  });

  useEffect(() => {
    setNewContact((prevState) => ({ ...prevState, id: contactsNumber }));
  }, [contactsNumber]);

  useEffect(() => {
    preselectedContact ? setNewContact(preselectedContact) : clearState();
  }, [preselectedContact]);

  useEffect(() => {
    const regexEmail = new RegExp(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    );
    const regexNumber = new RegExp(/^\d+$/);

    if (newContact.email !== '') {
      if (!regexEmail.test(newContact.email)) {
        setIsEmailValid(false);
      } else {
        setIsEmailValid(true);
      }
    }

    if (newContact.number !== '') {
      if (!regexNumber.test(newContact.number)) {
        setIsPhoneValid(false);
      } else {
        setIsPhoneValid(true);
      }
    }
  }, [newContact.email, newContact.number]);

  const clearState = () => {
    setNewContact({
      firstName: '',
      lastName: '',
      number: '',
      email: '',
      adress: '',
      notes: '',
      id: 0,
    });
  };

  return (
    <div>
      <Drawer
        open={newContactVisible}
        onClose={closeDrawer}
        direction="right"
        size={`${25}vw`}
        overlayOpacity={0.5}
      >
        <div className="d-flex justify-content-center align-items-center flex-column p-2">
          <div className="contactLetter">
            {!newContact.firstName ? (
              <FontAwesomeIcon icon={faUser} size="xl" />
            ) : (
              <div className="d-flex align-self-center">
                {newContact.firstName.charAt(0) +
                  ' ' +
                  newContact.lastName.charAt(0)}
              </div>
            )}
          </div>
          <div className="w-100">
            <input
              type="text"
              placeholder="First Name"
              className="inputs"
              id="firstName"
              value={newContact.firstName}
              onChange={(e) => {
                setNewContact((prevState) => ({
                  ...prevState,
                  firstName: e.target.value,
                }));
              }}
            ></input>
          </div>
          <div className="w-100">
            <input
              type="text"
              placeholder="Last Name"
              className="inputs"
              value={newContact.lastName}
              onChange={(e) => {
                setNewContact((prevState) => ({
                  ...prevState,
                  lastName: e.target.value,
                }));
              }}
            ></input>
          </div>
          <div className="w-100">
            <input
              type="text"
              placeholder="Number"
              value={newContact.number}
              onChange={(e) => {
                setNewContact((prevState) => ({
                  ...prevState,
                  number: e.target.value,
                }));
              }}
              className={isPhoneValid ? 'inputs' : 'inputsInvalid'}
            ></input>
          </div>
          <div className="w-100">
            <input
              type="text"
              placeholder="Email"
              value={newContact.email}
              onChange={(e) => {
                setNewContact((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }));
              }}
              className={isEmailValid ? 'inputs' : 'inputsInvalid'}
            ></input>
          </div>
          <div className="w-100">
            <input
              type="text"
              placeholder="Adress"
              className="inputs"
              value={newContact.adress}
              onChange={(e) => {
                setNewContact((prevState) => ({
                  ...prevState,
                  adress: e.target.value,
                }));
              }}
            ></input>
          </div>
          <div className="w-100">
            <input
              type="text"
              placeholder="Notes"
              className="inputs"
              value={newContact.notes}
              onChange={(e) => {
                setNewContact((prevState) => ({
                  ...prevState,
                  notes: e.target.value,
                }));
              }}
            ></input>
          </div>
          <Row className="d-flex justify-content-center w-75">
            <Col className="d-flex justify-content-center">
              <Button
                onClick={() => {
                  handleSaveContact(
                    newContact,
                    preselectedContact ? true : false
                  );
                  closeDrawer();
                  clearState();
                }}
                className="saveButton"
                name="Save"
              />
            </Col>
            <Col className="d-flex justify-content-center">
              <Button
                onClick={closeDrawer}
                className="cancelButton"
                name="Cancel"
              />
            </Col>
          </Row>
        </div>
      </Drawer>
    </div>
  );
};

export default CreateNewContactDrawer;
