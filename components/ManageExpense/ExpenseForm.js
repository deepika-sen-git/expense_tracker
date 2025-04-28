import { StyleSheet, View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import Input from './Input'
import Button from '../UI/Button';
import getFormattedDate from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

export default function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
    // const [amountValue, setAmountValue] = useState(0);
    // function amountChangeHandler(enteredAmount) {
    //     setAmountValue(enteredAmount);
    // }


    // const [inputValues, setInputValues] = useState({
    const [inputs, setInputs] = useState({
        // amount: defaultValues ? defaultValues.amount.toString() : '',
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            // isValid: defaultValues ? true : false // if editing set true and if adding new value then set false initially 
            // isValid: !!defaultValues
            isValid: true // intially we will set it true to avoid error message just after we open manageScreen for adding 
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        }
    });

    function inputValuesHandler(inputIdentifier, enteredInput) {
        setInputs((currInputs) => {
            return {
                ...currInputs,
                // [inputIdentifier]: enteredInputValue
                [inputIdentifier]: { value: enteredInput, isValid: true } // set isValid to true, we will validate it later 
            }
        });
    }

    function submitHandler() {

        const expenseData = {
            amount: +inputs.amount.value, //by adding plus sign, it gets converted to a number
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };

        //for validation we will create variables to check seperate fields.
        const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const isDateValid = expenseData.date.toString() !== 'Invalid Date'; // as on converting any invalid date to string we get "Invalid Date" in console.
        const isDescriptionValid = expenseData.description.trim().length > 0;

        if (!isAmountValid | !isDateValid | !isDescriptionValid) {
            // Alert.alert("Invalid data entered", "Please check before confirming");

            setInputs(currInputs => {
                return {
                    amount: { value: currInputs.amount.value, isValid: isAmountValid },
                    description: { value: currInputs.description.value, isValid: isDescriptionValid },
                    date: { value: currInputs.date.value, isValid: isDateValid }
                }
            })
            return;
        }

        onSubmit(expenseData);
    }

    const isFormHasInvalidData = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;



    return (
        <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Register Your Expense Here</Text>
            <View style={styles.rowInput}>
                <Input label='Amount' style={styles.inputInRow}
                    isInvalid={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        // onChangeText: amountChangeHandler,
                        // value: amountValue,
                        onChangeText: inputValuesHandler.bind(this, 'amount'),
                        value: inputs.amount.value,

                    }} />
                <Input label='Date' style={styles.inputInRow}
                    isInvalid={!inputs.date.isValid}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputValuesHandler.bind(this, 'date'),
                        value: inputs.date.value,

                    }} />
            </View>
            <Input label='Description'
                isInvalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    numberOfLines: 10,
                    autoCorrect: false,
                    autoCapitalize: 'none',
                    onChangeText: inputValuesHandler.bind(this, 'description'),
                    value: inputs.description.value,

                }} />

            {isFormHasInvalidData && (<Text style={styles.invalidData}>Please enter valid data</Text>)}


            <View style={styles.buttons}>
                <Button style={styles.button} mode='flat' onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>
                    {/* Update */}
                    {submitButtonLabel}
                </Button>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 60,
    },
    formTitle: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        marginVertical: 30,
    },
    rowInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputInRow: {
        flex: 1,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    invalidData: {
        color: GlobalStyles.colors.error500,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    }
})