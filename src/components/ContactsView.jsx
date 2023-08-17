import { useCallback, useEffect, useState } from 'react';
import ContactDisplay from './contactDisplay/ContactDisplay';
import ContactDetailsDrawer from './drawers/ContactDetailsDrawer';
import {
  addData,
  deleteData,
  getStoreData,
  initDB,
  updateData,
} from '../utils/db';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import CreateNewContactDrawer from './drawers/CreateNewContactDrawer';
import Button from './button/Button';

const ContactsView = () => {
  const [newContactVisible, setNewContactVisible] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedContact, setSelectedContact] = useState();
  const [isDBReady, setIsDBReady] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleInitDB = async () => {
    const status = await initDB();
    setIsDBReady(status);
  };

  useEffect(() => {
    handleInitDB();
  }, []);

  const addContact = async (newContact) => {
    if (isDBReady) {
      addData(newContact);
    }
  };

  const fetchContacts = useCallback(() => {
    if (isDBReady) {
      getStoreData().then((data) => {
        const filteredContacts = data.filter((contact) => {
          const fullName = `${contact.firstName} ${contact.lastName}`;
          return (
            fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.number.includes(searchQuery)
          );
        });
        setContacts(filteredContacts);
      });
    }
  }, [isDBReady, searchQuery]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const editContact = async (contact) => {
    if (isDBReady) {
      return updateData(contact).then((data) => data);
    }
  };

  const closeDetailsDrawer = () => {
    setSelectedContact();
    toggleDrawer();
    setShowDetails(false);
  };

  const closeNewContactDrawer = () => {
    setSelectedContact();
    toggleDrawer();
    setNewContactVisible(false);
  };

  const handleSaveContact = (newContact, shouldEditContact = false) => {
    if (shouldEditContact) {
      const hasBeenEdited = editContact(newContact);
      if (hasBeenEdited) {
        fetchContacts();
      } else {
        console.error('error while updating');
      }
    } else {
      addContact(newContact);
      fetchContacts();
    }
  };

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSelectContact = (contact, type) => {
    setSelectedContact(contact);

    if (type === 'Edit') {
      toggleDrawer();
      setNewContactVisible(true);
    } else {
      toggleDrawer();
      setShowDetails(true);
    }
  };

  const handleDeleteContact = (contactToDelete) => {
    if (isDBReady) {
      return deleteData(contactToDelete.id).then((data) => {
        fetchContacts();
      });
    }
  };

  return (
    <div className="d-flex p-5 flex-column">
      <div className="d-flex w-100 justify-content-start align-items-center mb-5">
        <h1 className="d-flex text-center mr-auto">
          <img
            src="https://cdn4.iconfinder.com/data/icons/business-finance-vol-12-2/512/1-512.png"
            alt="phone"
            className="agendaImg"
          />
          Contacts
        </h1>
        <div className="d-flex justify-content-start align-items-center mr-2 w-25 p-2 searchDiv">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="lg"
            className="mr-1 iconColor"
          />
          <input
            className="searchInput"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-end align-items-center">
          <Button
            name="New Contact"
            className="newContactBtn"
            onClick={() => {
              setNewContactVisible((prevState) => !prevState);
            }}
          >
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
          </Button>
        </div>
      </div>
      <div className="contactDisplayContainer">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <ContactDisplay
              key={contact.id}
              contact={contact}
              index={contact.id}
              handleSelectContact={handleSelectContact}
              handleDeleteContact={handleDeleteContact}
            />
          ))
        ) : (
          <h3 className="text-center">No contacts found!</h3>
        )}
      </div>
      <CreateNewContactDrawer
        newContactVisible={newContactVisible}
        closeDrawer={closeNewContactDrawer}
        handleSaveContact={handleSaveContact}
        preselectedContact={selectedContact}
        contactsNumber={
          contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 0
        }
      />
      <div className="d-flex justify-content-center m-1 ">
        <ContactDetailsDrawer
          open={isOpen}
          contact={selectedContact}
          closeDrawer={closeDetailsDrawer}
          showDetails={showDetails}
        />
      </div>
    </div>
  );
};

export default ContactsView;
