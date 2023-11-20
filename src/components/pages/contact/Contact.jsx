import {useRef, useState} from 'react';
import './contact.css';
import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const formRef = useRef();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_CONTACT_SERVICE,
        process.env.REACT_APP_CONTACT_TEMPLATE,
        formRef.current,
        process.env.REACT_APP_CONTACT_API_KEY
      )
      .then(
        (result) => {
          setSuccess(true);
          e.target.reset();
        },
        (error) => {
          setError(true);
        }
      );
  };

  return (
    <>
      <Header />
      <div className='contact'>
        <div className='contactWrapper'>
          <h1 className='contactTitle'>Contact</h1>
          <form onSubmit={sendEmail} className='contactForm' ref={formRef}>
            <div className='contactGrupInput'>
              <label htmlFor='firstName'>First and Last Name</label>
              <input
                type='text'
                name='name'
                id='firstName'
                required={true}
                autoFocus={true}
                placeholder='John Clarke'
              />
            </div>
            <div className='contactGrupInput'>
              <label htmlFor='email'>Your email</label>
              <input
                type='email'
                name='email'
                id='email'
                required={true}
                placeholder='ion@yahoo.com'
              />
            </div>

            <div className='contactGrupInput'>
              <label htmlFor='message'>Message</label>
              <textarea
                className='contactInputTextarea'
                name='message'
                id='message'
                cols='40'
                rows='6'
                required={true}
                placeholder='your story...'
              ></textarea>
            </div>
            <button className='contactButtonSubmit' type='submit'>
              Send message
            </button>
            {error && (
              <span className='contactError'>Error sending email...</span>
            )}
            {success && <span className='contactSuccess'>Email is sent!</span>}
          </form>
        </div>
        <Sidebar />
      </div>
    </>
  );
}
