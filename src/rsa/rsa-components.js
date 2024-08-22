import { useState } from "react";
import { numToText, textToNum, isAllUppercase } from "./rsa-helper-functions";
export function TextForm({translatedText, showText, handleTextTranslation}){
    return (
      <form onSubmit = {handleTextTranslation}>
        <label>(Optional) Text (uppercase letters only): <input name = "textInput" type = "text" />
        </label>
        <button type = "submit" className="navbar-button">Translate Text</button>
        {showText ? <p>{translatedText}</p> : null}
      </form>
    )
}
    
export function KeygenForm({prime1, prime2, publicExp, privateExp, modulus, getKeys, showKeyDisplay}){
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
export function KeyDisplay({p, q, publicExp, privateExp, modulus}){
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
  
export function EncryptDecryptSignForm({publicExp, privateExp, modulus, returnedMessage, sendAndReceiveMessage, encrypt, sign, show, translatedText}){
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
              <input name = "messageInput" type = "number" value={(encrypt ? translatedText : 0)}/>
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