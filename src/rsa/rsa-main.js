import { useState } from "react";
import { TextBeforeKeygen, KeygenDescription } from "./rsa-text";
import "../App.css";
import { numToText, textToNum, isAllUppercase } from "./rsa-helper-functions";
import { TextForm, KeygenForm, EncryptDecryptSignForm, VerifyForm } from "./rsa-components";
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
  //getKeys and sendAndReceiveMessage need to be declared up here so that they can update the state. They'll be
  //passed as props to the components where they'll actually be used. 
  async function getKeys(digits){
    const url = "https://gfmjhvb3yd.execute-api.us-east-2.amazonaws.com/default/RSAKeygen?digits=" + digits;
    console.log(url)
    const response = await fetch(url, {method: "POST", mode: "cors"});
    const responseData = await response.json();
    updatePrime1(responseData.p);
    updatePrime2(responseData.q);
    updatePublicExp(responseData.public_exp);
    updatePrivateExp(responseData.private_exp);
    updateModulus(responseData.modulus);
    updateShowKeyDisplay(true);
  }
  
  async function sendAndReceiveMessage(message, key, modulus, encrypt, sign){
    const url = "https://x0eii833df.execute-api.us-east-2.amazonaws.com/default/RSADemoEncryptDecrypt?exp=" + key + 
                "&message=" + message + "&modulus=" + modulus;
    console.log(url);
    const response = await fetch(url, {method: "POST", mode: "cors"});
    const responseData = await response.json();
    console.log(responseData.message);
    if (sign) {
      updateSignedMessage(responseData.message);
      updateExpectedMessage(message);
      updateShowSignedMessage(true);
    } else if (encrypt){
      updateEncryptedMessage(responseData.message);
      updateShowEncryptedMessage(true);
    } else {
      updateDecryptedMessage(responseData.message);
      updateShowDecryptedMessage(true);
    } 
  }
  function handleTextTranslation(e){
    e.preventDefault();
    const text = e.target.textInput.value;
    console.log(isAllUppercase(text));
    if (!isAllUppercase(text)){
      alert("Your text does not consist only of uppercase letters.");
      console.log("TEST");
    } else {
      updateTranslatedText(textToNum(text));
      updateShowText(true);
    }
  }

  return (
    <div className="center-container">
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



