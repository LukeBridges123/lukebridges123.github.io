import { useState } from "react";
import { TextBeforeKeygen, KeygenDescription } from "./rsa-text";
import "../App.css";
import { numToText, textToNum, isAllUppercase } from "./rsa-helper-functions";
import { TextForm, KeygenForm, EncryptDecryptSignForm, VerifyForm } from "./rsa-components";
import { ErrorMessage, LoadingMessage } from "../components/ErrorMessage";

export function RSADemo(){
  const [prime1, updatePrime1] = useState("");
  const [prime2, updatePrime2] = useState("");
  const [publicExp, updatePublicExp] = useState("");
  const [privateExp, updatePrivateExp] = useState("");
  const [modulus, updateModulus] = useState("");
  const [showText, updateShowText] = useState(false);
  const [translatedText, updateTranslatedText] = useState(0);
  const [encryptedMessage, updateEncryptedMessage] = useState("");
  const [decryptedMessage, updateDecryptedMessage] = useState("");
  const [signedMessage, updateSignedMessage] = useState("");
  const [expectedMessage, updateExpectedMessage] = useState("");
  const [showKeyDisplay, updateShowKeyDisplay] = useState(false);
  const [showEncryptedMessage, updateShowEncryptedMessage] = useState(false);
  const [showDecryptedMessage, updateShowDecryptedMessage] = useState(false);
  const [showSignedMessage, updateShowSignedMessage] = useState(false);
  
  // Error and loading states
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  //getKeys and sendAndReceiveMessage need to be declared up here so that they can update the state. They'll be
  //passed as props to the components where they'll actually be used. 
  async function getKeys(digits){
    // Validate input before making API call
    if (!digits || isNaN(digits) || digits < 1 || digits > 20) {
      setError({
        message: "Invalid input: Please enter a number between 1 and 20 for the number of digits.",
        type: 'error'
      });
      return;
    }
    
    setIsLoading(true);
    setLoadingMessage("Generating RSA keys... This may take a moment for larger key sizes.");
    setError(null);
    
    try {
      const url = "https://gfmjhvb3yd.execute-api.us-east-2.amazonaws.com/default/RSAKeygen?digits=" + digits;
      const response = await fetch(url, {method: "POST", mode: "cors"});
      const responseData = await response.json();
      
      if (response.status === 400){
        setError({
          message: `Key generation failed: ${responseData.error || 'Invalid input parameters. Please try a different number of digits.'}`,
          type: 'error'
        });
        return;
      }
      
      if (!response.ok) {
        setError({
          message: `Server error: Unable to generate keys. Please try again later. (Status: ${response.status})`,
          type: 'error'
        });
        return;
      }
      
      // Validate response data
      if (!responseData.p || !responseData.q || !responseData.public_exp || !responseData.private_exp || !responseData.modulus) {
        setError({
          message: "Invalid response: The server returned incomplete key data. Please try again.",
          type: 'error'
        });
        return;
      }
      
      updatePrime1(responseData.p);
      updatePrime2(responseData.q);
      updatePublicExp(responseData.public_exp);
      updatePrivateExp(responseData.private_exp);
      updateModulus(responseData.modulus);
      updateShowKeyDisplay(true);
      
      setError({
        message: "RSA keys generated successfully!",
        type: 'success'
      });
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError({
          message: "Network error: Unable to connect to the key generation service. Please check your internet connection and try again.",
          type: 'error'
        });
      } else {
        setError({
          message: `Unexpected error: ${err.message || 'An unknown error occurred during key generation.'}`,
          type: 'error'
        });
      }
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  }
  
  async function sendAndReceiveMessage(message, key, modulus, encrypt, sign){
    // Validate inputs before making API call
    if (!message || isNaN(message) || message < 0) {
      setError({
        message: "Invalid message: Please enter a valid non-negative number.",
        type: 'error'
      });
      return;
    }
    
    if (!key || isNaN(key)) {
      setError({
        message: "Invalid key: Please generate RSA keys first.",
        type: 'error'
      });
      return;
    }
    
    if (!modulus || isNaN(modulus) || modulus <= 0) {
      setError({
        message: "Invalid modulus: Please generate RSA keys first.",
        type: 'error'
      });
      return;
    }
    
    if (message >= modulus) {
      setError({
        message: `Invalid message: The message (${message}) must be less than the modulus (${modulus}).`,
        type: 'error'
      });
      return;
    }
    
    setIsLoading(true);
    setLoadingMessage(sign ? "Signing message..." : (encrypt ? "Encrypting message..." : "Decrypting message..."));
    setError(null);
    
    try {
      const url = "https://x0eii833df.execute-api.us-east-2.amazonaws.com/default/RSADemoEncryptDecrypt?exp=" + key + 
                  "&message=" + message + "&modulus=" + modulus;
      const response = await fetch(url, {method: "POST", mode: "cors"});
      const responseData = await response.json();
      
      if (!response.ok) {
        setError({
          message: `Operation failed: ${responseData.error || 'Server error occurred. Please try again.'} (Status: ${response.status})`,
          type: 'error'
        });
        return;
      }
      
      // Validate response data
      if (responseData.message === undefined || responseData.message === null) {
        setError({
          message: "Invalid response: The server returned an empty or invalid result. Please try again.",
          type: 'error'
        });
        return;
      }
      
      if (sign) {
        updateSignedMessage(responseData.message);
        updateExpectedMessage(message);
        updateShowSignedMessage(true);
        setError({
          message: "Message signed successfully!",
          type: 'success'
        });
      } else if (encrypt){
        updateEncryptedMessage(responseData.message);
        updateShowEncryptedMessage(true);
        setError({
          message: "Message encrypted successfully!",
          type: 'success'
        });
      } else {
        updateDecryptedMessage(responseData.message);
        updateShowDecryptedMessage(true);
        setError({
          message: "Message decrypted successfully!",
          type: 'success'
        });
      }
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError({
          message: "Network error: Unable to connect to the encryption service. Please check your internet connection and try again.",
          type: 'error'
        });
      } else {
        setError({
          message: `Unexpected error: ${err.message || 'An unknown error occurred during the operation.'}`,
          type: 'error'
        });
      }
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  }
  
  function handleTextTranslation(e){
    e.preventDefault();
    const text = e.target.textInput.value;
    
    if (!text.trim()) {
      setError({
        message: "Please enter some text to translate.",
        type: 'warning'
      });
      return;
    }
    
    if (!isAllUppercase(text)){
      setError({
        message: "Text validation failed: Your text must consist only of uppercase letters (A-Z). Please remove any lowercase letters, numbers, spaces, or special characters.",
        type: 'error'
      });
      return;
    }
    
    const result = textToNum(text);
    if (result.error) {
      setError({
        message: result.message,
        type: 'error'
      });
      return;
    }
    
    updateTranslatedText(result.result);
    updateShowText(true);
    setError({
      message: "Text translated successfully!",
      type: 'success'
    });
  }

  return (
    <div className="center-container">
      {error && (
        <ErrorMessage 
          message={error.message} 
          type={error.type} 
          onClose={() => setError(null)}
        />
      )}
      
      {isLoading && (
        <LoadingMessage message={loadingMessage} />
      )}
      
      <KeygenDescription />
      <KeygenForm prime1 = {prime1} prime2={prime2} publicExp={publicExp} privateExp={privateExp} modulus={modulus} 
      getKeys={getKeys} showKeyDisplay={showKeyDisplay}/>
      <EncryptDecryptSignForm publicExp={publicExp} privateExp={privateExp} modulus={modulus} returnedMessage={encryptedMessage} 
      sendAndReceiveMessage={sendAndReceiveMessage} encrypt={true} sign = {false} show = {showEncryptedMessage} />
      <EncryptDecryptSignForm publicExp={publicExp} privateExp={privateExp} modulus={modulus} returnedMessage={decryptedMessage} 
      sendAndReceiveMessage={sendAndReceiveMessage} encrypt={false} sign = {false} show = {showDecryptedMessage} />
      <EncryptDecryptSignForm publicExp={publicExp} privateExp={privateExp} modulus={modulus} returnedMessage={signedMessage} 
      sendAndReceiveMessage={sendAndReceiveMessage} encrypt={false} sign = {true} show = {showSignedMessage}/>
      <VerifyForm publicExp={publicExp} modulus={modulus} signedMessage={signedMessage} expectedMessage={expectedMessage}/>
      <TextBeforeKeygen />
    </div>
  )
}



