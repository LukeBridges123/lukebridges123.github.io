import { useState } from "react";
import { numToText, textToNum, isAllUppercase } from "./rsa-helper-functions";
import { ErrorMessage, LoadingMessage } from "../components/ErrorMessage";

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
      
      // Validate input
      if (!digits || digits < 1 || digits > 20) {
        return; // Error will be handled by parent component
      }
      
      getKeys(digits);
    }
    return (
      <div className="center-container">
        <form method = "POST" onSubmit = {submitNumDigits} className="center-container" style={{gap : "10px", padding : "10px"}}>
          <label>
            Number of digits in each prime (5-20 digits allowed): <input name = "keygenInput" type = "number" defaultValue={10} min="5" max="20"/>
          </label>
          <button type = "submit" className="navbar-button">Generate keys</button>
        </form>
        {showKeyDisplay ? 
          <KeyDisplay p = {prime1} q = {prime2} publicExp = {publicExp} privateExp = {privateExp} modulus = {modulus} /> : null}
      </div>
    );
}
export function KeyDisplay({p, q, publicExp, privateExp, modulus}){
    return (
        <div className="center-container">
        <p>Bob's first secret prime, p: {p}</p>
        <p>Bob's second secret prime, q: {q}</p>
        <p>Bob then computes the modulus: pq = {p} * {q} = {modulus}</p>
        <p>For the public key, Bob chooses an integer E with gcd(E, (p-1)(q-1)) = 1; {publicExp} works.</p>
        <p>For the private key, Bob solves the equation ED ≡ 1 (mod (p-1)(q-1)) and gets D = {privateExp}.</p>
        </div>
    )
}
  
export function EncryptDecryptSignForm({publicExp, privateExp, modulus, returnedMessage, sendAndReceiveMessage, encrypt, sign, show}){
    function submitMessage(e){
      e.preventDefault();
      const message = e.target.messageInput.value;
      
      // Validate input
      if (!message || message < 0 || message >= modulus) {
        return; // Error will be handled by parent component
      }
      
      const key = (sign ? privateExp : (encrypt ? publicExp : privateExp));
      sendAndReceiveMessage(message, key, modulus, encrypt, sign);
    }
    //Encryption and decryption are identical except for which key is used, and decryption and signing are completely identical
    //except for which messages should be displayed in the form. The "encrypt" and "sign" parameters control this.
  
    const actionName = (sign ? "sign" : (encrypt ? "encrypt" : "decrypt"));
    const computeMessage = (encrypt && !sign ? "Alice " : "Bob ") + "raises the given message to the power " + 
    (encrypt && !sign ? publicExp : privateExp) + 
    " and reduces mod " + modulus + ". They get " + returnedMessage + ".";
    return (
      <div className="center-container">
          <form method = "POST" onSubmit={submitMessage} className="center-container" style={{gap : "10px", padding : "10px"}}>
            <label>
              Message to {actionName}: 
              <input name = "messageInput" type = "number" min={0} max = {modulus}/>
            </label>
            <button label = "submit" className="navbar-button">{actionName.charAt(0).toUpperCase() + actionName.substring(1)} message</button>
          </form>
          {show ? <div className="center-container">
                  <p>{computeMessage}</p>
                  <p>Your {actionName}ed message: {returnedMessage}</p> 
                  </div>: null}
      </div>
    )
}
  
export function VerifyForm({publicExp, modulus, signedMessage, expectedMessage}){
    const [verificationResult, updateVerificationResult] = useState("");
    const [verifiedMessage, updateVerifiedMessage] = useState("");
    const [showVerificationResult, updateShowVerificationResult] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function verifyMessage(publicKey, modulus, signedMessage, expectedMessage){
      setIsLoading(true);
      setError(null);
      
      try {
        const url = "https://x0eii833df.execute-api.us-east-2.amazonaws.com/default/RSADemoEncryptDecrypt?exp=" + publicKey + 
                    "&message=" + signedMessage + "&modulus=" + modulus;
        const response = await fetch(url, {method: "POST", mode: "cors"});
        const responseData = await response.json();
        
        if (!response.ok) {
          setError({
            message: `Verification failed: ${responseData.error || 'Server error occurred. Please try again.'} (Status: ${response.status})`,
            type: 'error'
          });
          return;
        }
        
        updateVerifiedMessage(responseData.message);
        updateVerificationResult(expectedMessage.toString() === responseData.message.toString());
        updateShowVerificationResult(true);
        
        setError({
          message: expectedMessage.toString() === responseData.message.toString() 
            ? "Signature verification successful! The message is authentic." 
            : "Signature verification failed! The message may have been tampered with.",
          type: expectedMessage.toString() === responseData.message.toString() ? 'success' : 'error'
        });
      } catch (err) {
        setError({
          message: "Network error: Unable to connect to the verification service. Please check your internet connection and try again.",
          type: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    }
  
    function submitMessage(e){
      e.preventDefault();
      
      if (!signedMessage || !expectedMessage) {
        setError({
          message: "Please sign a message first before attempting verification.",
          type: 'warning'
        });
        return;
      }
      
      verifyMessage(publicExp, modulus, signedMessage, expectedMessage);
    }
  
    return (
      <>
        {error && (
          <ErrorMessage 
            message={error.message} 
            type={error.type} 
            onClose={() => setError(null)}
          />
        )}
        
        {isLoading && (
          <LoadingMessage message="Verifying signature..." />
        )}
        
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