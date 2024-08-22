import { useState } from "react";
import { TextBeforeKeygen, KeygenDescription } from "../rsa/rsa-text";
import "../App.css"; 
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
      <TextForm translatedText={translatedText} showText= {showText} handleTextTranslation = {handleTextTranslation}/>
      <KeygenForm prime1 = {prime1} prime2={prime2} publicExp={publicExp} privateExp={privateExp} modulus={modulus} 
      getKeys={getKeys} showKeyDisplay={showKeyDisplay}/>
      <EncryptDecryptSignForm publicExp={publicExp} privateExp={privateExp} modulus={modulus} returnedMessage={encryptedMessage} 
      sendAndReceiveMessage={sendAndReceiveMessage} encrypt={true} sign = {false} show = {showEncryptedMessage}/>
      <EncryptDecryptSignForm publicExp={publicExp} privateExp={privateExp} modulus={modulus} returnedMessage={decryptedMessage} 
      sendAndReceiveMessage={sendAndReceiveMessage} encrypt={false} sign = {false} show = {showDecryptedMessage} />
      <EncryptDecryptSignForm publicExp={publicExp} privateExp={privateExp} modulus={modulus} returnedMessage={signedMessage} 
      sendAndReceiveMessage={sendAndReceiveMessage} encrypt={false} sign = {true} show = {showSignedMessage}/>
      <VerifyForm publicExp={publicExp} modulus={modulus} signedMessage={signedMessage} expectedMessage={expectedMessage}/>
      <TextBeforeKeygen />
    </div>
  )
}


function isAllUppercase(str) {
  for (let i = 0; i < str.length; i++) {
      if (!/[A-Z]/.test(str[i])) {
          return false;
      }
  }
  return true;
}

function textToNum(text) {
  if (!isAllUppercase(text)){
    alert("Your text does not consist only of uppercase letters.");

  } else {
    let num = 0;
    for (let i = 0; i < text.length; i++){
      num += (text.charCodeAt(i) - 'A'.charCodeAt(0) + 1) * (100 ** i);
    }
    return num;
  }
}
function numToText(num){
  let text = "";
  while (num > 0){
    let last_two_digits = num % 100;
    text = text + "ABCDEFGHIJKLMNOPQRSTUVWXYZ".at(last_two_digits);
    num = Math.floor(num / 10);
  }
  return text;
}

function TextForm({translatedText, showText, handleTextTranslation}){
  return (
    <form onSubmit = {handleTextTranslation}>
      <label>(Optional) Text (uppercase letters only): <input name = "textInput" type = "text" />
      </label>
      <button type = "submit" className="navbar-button">Translate Text</button>
      {showText ? <p>{translatedText}</p> : null}
    </form>
  )
}
  
function KeygenForm({prime1, prime2, publicExp, privateExp, modulus, getKeys, showKeyDisplay}){
  function submitNumDigits(e){
    e.preventDefault();
    const digits = e.target.keygenInput.value;
    getKeys(digits);
  }
  return (
      <form method = "POST" onSubmit = {submitNumDigits}>
        <label>
          Number of digits in each prime: <input name = "keygenInput" type = "number" defaultValue={10}/>
        </label>
        <button type = "submit" className="navbar-button">Generate keys</button>
        {showKeyDisplay ? 
        <KeyDisplay p = {prime1} q = {prime2} publicExp = {publicExp} privateExp = {privateExp} modulus = {modulus} /> : null}
      </form>
  );
}
function KeyDisplay({p, q, publicExp, privateExp, modulus}){
  return (
    <>
      <p>Bob's first secret prime, p: {p}</p>
      <p>Bob's second secret prime, q: {q}</p>
      <p>Bob then computes the modulus: pq = {p} * {q} = {modulus}</p>
      <p>For the public key, Bob chooses an integer E with gcd(E, (p-1)(q-1)) = 1; {publicExp} works.</p>
      <p>For the private key, Bob solves the equation ED ≡ 1 (mod (p-1)(q-1)) and gets D = {privateExp}.</p>
    </>
  )
}

export function EncryptDecryptSignForm({publicExp, privateExp, modulus, returnedMessage, sendAndReceiveMessage, encrypt, sign, show}){
  function submitMessage(e){
    e.preventDefault();
    const message = e.target.messageInput.value;
    const key = (sign ? privateExp : (encrypt ? publicExp : privateExp));
    sendAndReceiveMessage(message, key, modulus, encrypt, sign);
  }
  //Encryption and decryption are identical except for which key is used, and decryption and signing are completely identical
  //except for which messages should be displayed in the form. The "encrypt" and "sign" parameters control this.

  const actionName = (sign ? "sign" : (encrypt ? "encrypt" : "decrypt"));
  return (
    <>
        <form method = "POST" onSubmit={submitMessage}>
          <label>
            Message to {actionName}: 
            <input name = "messageInput" type = "number" />
          </label>
          <button label = "submit" className="navbar-button">{actionName.charAt(0).toUpperCase() + actionName.substring(1)} message</button>
        </form>
        {show ? <p>Your {actionName}ed message: {returnedMessage}</p> : null}
    </>
  )
}

export function VerifyForm({publicExp, modulus, signedMessage, expectedMessage}){
  const [verificationResult, updateVerificationResult] = useState("");
  const [verifiedMessage, updateVerifiedMessage] = useState("");
  const [showVerificationResult, updateShowVerificationResult] = useState(false);
  /*
  async function verifyMessage(publicKey, modulus, signedMessage, expectedMessage){
    const url = "https://vivqmgynyj.execute-api.us-east-2.amazonaws.com/default/RSADemoVerify?public_exp=" + publicKey +
                "&modulus=" + modulus + "&signed_message=" + signedMessage + "&expected_message=" + expectedMessage;
    const response = await fetch(url, {method: "POST", mode: "cors"});
    const responseData = await response.json();
    console.log(responseData.verification_result);
    updateVerificationResult(responseData.verification_result);
  }
  */
  async function verifyMessage(publicKey, modulus, signedMessage, expectedMessage){
    const url = "https://x0eii833df.execute-api.us-east-2.amazonaws.com/default/RSADemoEncryptDecrypt?exp=" + publicKey + 
                "&message=" + signedMessage + "&modulus=" + modulus;
    console.log(url);
    const response = await fetch(url, {method: "POST", mode: "cors"});
    const responseData = await response.json();
    console.log(responseData.message.toString());
    console.log(expectedMessage.toString());
    console.log(expectedMessage.toString() === responseData.message.toString());
    updateVerifiedMessage(responseData.message);
    updateVerificationResult(expectedMessage.toString() === responseData.message.toString());
    updateShowVerificationResult(true);
  }

  function submitMessage(e){
    e.preventDefault();
    verifyMessage(publicExp, modulus, signedMessage, expectedMessage);
  }

  return (
    <>
      <form method = "POST" onSubmit = {submitMessage}>
        <button label = "submit" className="navbar-button">Verify signed message using public key</button>
      </form>
      {(showVerificationResult ? 
      <>
      <p>Verified message: {verifiedMessage}</p>
      <p>Verification result: {(verificationResult ? "True" : "False")}</p> 
      </>: null)}
      
    </>
  )
}