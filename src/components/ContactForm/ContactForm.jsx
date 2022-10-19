import React from "react";
import { Formik, Form, Field } from 'formik';
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";

import { addContact } from '../../redux/contactsSlice';
import { LabelForm, SpanForm, ButtonForm } from './ContactForm.styled';

export const ContactForm = () => {
    
    const dispatch = useDispatch();
    
    const handleSubmit = (values, { resetForm }) => {
        // console.log(values);
        dispatch(addContact(values));
        resetForm();
    };
    
    const loginInputId = nanoid();

    return (
        <Formik
            initialValues={{ name: '', number: '' }}
            onSubmit={handleSubmit}
        >
            <Form >
                <LabelForm>
                    <SpanForm>Name</SpanForm> 
                    <Field
                        type="text"
                        name="name"
                        id={loginInputId}
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                    />
                </LabelForm>
                <LabelForm>
                    <SpanForm> Number</SpanForm>
                    <Field
                        type="tel"
                        name="number"
                        id={loginInputId}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                    />
                </LabelForm>
                <ButtonForm type="submit" >Add Contact</ButtonForm>
            </Form>
        </Formik>
        
    );
};

