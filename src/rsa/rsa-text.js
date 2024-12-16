import "../index.css"
export function TextBeforeKeygen(){

    return (
        
        <div className="center-container">
            <h1>Description of RSA</h1>
            <h2>Key Generation</h2>
            <p>RSA is an asymmetric, public-key encryption system. Unlike e.g. a onetime pad, where the same key is used to both encrypt and decrypt the message, RSA has two different keys, a "public key" used to encrypt the message and a "private key" used to decrypt the message. Before we discuss how messages are encrypted and decrypted in RSA, we'll discuss what these keys are and how they're generated.</p>
            <p>First, two primes p and q of a given bit length are randomly generated. This is done by randomly generating integers of that bit length until primes come up, using a fast probabilistic primality test (e.g. Miller-Rabin) to determine when a prime has been generated. From this, the first part of the public key can be generated: the "modulus" n = pq. As will be seen later, RSA encryption involves doing arithmetic mod n, hence the name. When people talk about, say, "2048-bit" or "4096-bit" RSA, they're referring to the length of this modulus.</p>
            <p>Larger keys are more secure but slower to generate and use. They also allow for longer messages (as messages must be positive integers less than the modulus), although given that RSA is mainly used to send short messages such as keys for symmetric cryptosystems, this is less relevant to what key length is used than speed and security considerations.</p>
            <p>Now the rest of the keys can be generated: the "encrypting exponent" E and the "decrypting exponent" D. The roles of these will be explained more fully later, but for now, just note that these are just two integers such that ED ≡ 1 (mod (p-1)(q-1)). There are many possible pairs of numbers that could work, but usually E is chosen as an arbitrary small integer with gcd(E, (p-1)(q-1)) (in this implementation, it's just the smallest odd integer greater than one that has this property). Once E has been fixed, the existence and uniqueness of D is guaranteed, and D can be found using the extended Euclidean algorithm.</p>
            <h2>Encrypting and Decrypting</h2>
            <p>Once you have these keys, it's easy to describe how they get used. Let m be your message--a number less than the modulus n, or anything which can be encoded as such a number. To encrypt, you raise m to the power E and then reduce mod n--that is, the encrypted message (call it c) is equal to m^E (mod n). To decrypt, you take c^D (mod n).</p>
            <p>Without getting too much into the underlying math, note that, since c = m^E (mod n), we have c^D = (m^E)^D = m^(ED) (mod n). 
                But recall that we chose E and D to satisfy the equation ED = 1 (mod (p-1)(q-1)), or in other words ED = k(p-1)(q-1) + 1 
                for some integer k. Substituting that back into the equation from before, we get c^D = m^(k(p-1)(q-1) + 1) 
                = (m^((p-1)(q-1)))^k * m (mod n). You can prove (it almost follows from Euler's theorem in number theory, 
                though to really prove that you need to handle an annoying extra case where m is divisible by p or q) 
                that m^((p-1)(q-1)) = 1 (mod n), hence (m^((p-1)(q-1)))^k * m = 1^k * m = m (mod n). Thus when we raise c to D and reduce mod n, we get back 
                the original message m. That's all there is to RSA encryption and decryption. </p>
            <h2>Digital Signatures</h2>
            <p>You can also use RSA to make sure that someone who says they're Bob really is Bob-or at least really has Bob's private key.
                If Alice sends some data to Bob, in the form of a number m, then Bob can "sign" it by applying his private key to it, i.e. 
                computing m^D (mod n). Alice can then "verify" the signature by applying Bob's public key to the result, getting (m^D)^E = m^(ED) = m (mod n). On the other hand,
                without knowing Bob's private key, it is hard, for a given value m, to find a number c with c^E = m (mod n). Thus if someone can reliably 
                produce such numbers, for any m that Alice sends, she can know that whoever she's talking to does have Bob's private key. 
            </p>
            <p>We saw earlier that encrypting and decrypting are formally identical--both involve raising a given number to a constant and then
                reducing mod another constant. Here we can see that decrypting and signing are not just formally identical but completely identical.
                This means that, if Bob uses his private key to sign something that's actually a message encrpyed with his public key, he'll get 
                back his original message. (You can test this yourself--encrypt a message, then paste the result into the "sign" form.) 
                Thus if Bob signs any number he's given, he can easily be tricked into decrypting messages sent to him. 
                To get around this, it's standard to hash data before signing it, rather than signing given data directly. 
            </p>
        </div>

    )
}
export function KeygenDescription(){
    return (
        
        <div className="center-container">
            <h1>Demo of RSA Encryption</h1>
            <p>This page contains a brief introduction to the RSA encryption system and an interactive demo of its use. We first discuss how to 
                use the demo, then give the demo itself, then give the introduction. The demo can handle key generation, encrypting and decrypting messages, and digital signatures.
            </p>
            <p>Note that this is certainly not intended to be actually used for encryption, as the implementation discussed and used here is a fairly naive one.</p>
            <p>Use the "generate keys" form below to enter the number of digits in each prime. 
                Real RSA keys use primes with 1024 to 2048 bits each (roughly 300-600 digits), 
                but for the purposes of the demo, a key with 5-10 digits (about 16-32 bits) will be fine. 
                (In fact, I would recommend against large keys, since the key generation function is hosted on an AWS Lambda 
                instance which doesn't enough resources for fast generation of large keys and will time out if it takes
                 more than a few seconds to find keys.)</p>
                <p>Once you've generated keys, pick a number to serve as your message (see the bullet points below for what counts 
                    as a good number). Put it into the form next to the "encrypt message" button below and click that to encrypt. 
                    Then you can paste the result into the "decrypt message" form; you should get back the number you started with.
                </p>
                <p>You can do the same thing with the "sign" form (see the "Digital Signatures" header below the forms for a description of what this does).
                    Once you've produced a signed message, it will be automatically (implicitly) filled into the input used by the "verify" button. 
                </p>

            <p>Some further notes on usage: 
                
                <ul>
                    <li>Make sure to generate keys before using any of the encrypt/decrypt functions, otherwise
                    the latter won't work. (They get automatically fed the keys you generate from the first form.)</li>
                    <li>I've set the encrypt, decrypt, and sign forms to only accept numbers between 0 and the modulus (which is itself set to 0 until you generate keys). If your message is longer than the modulus, it won't get decrypted
                        properly, since decryption involves reducing mod the modulus and so always produces something less than the modulus. (If you use primes with n digits, then the modulus will have about 2n digits, so send messages that are at most that long.)
                        Also, if your message is short compared to the modulus, it won't get encrypted much at all: for instance, if you send a message of 10, with a large 
                        enough modulus and an encrypting exponent of (say) 7, you'll get an "encrypted" message of 10^7 (= 10 million). Your message needs to
                        be long enough that (message)^(encrypting exponent) {'>'} modulus, so that raising it to the encrypting exponent and reducing mod the modulus 
                        gives you something quite different from what you started with, and not easily recognizable.

                        (Incidentally, these are both problems that real implementations of RSA have to deal with.)</li>
      
                </ul>
            </p>
        </div>
    )
}
