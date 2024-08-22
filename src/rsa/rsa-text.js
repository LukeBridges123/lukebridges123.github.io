import "../index.css"
export function TextBeforeKeygen(){

    return (
        
        <div className="center-container">
            <div>
            <h1>Demo of RSA Encryption</h1>
            <p>The following page contains a brief introduction to the RSA encryption system and an interactive demo of its use. We'll go over key generation, encrypting and decrypting messages, and digital signatures. The implementation discussed and used here will be a fairly naive one, but we will discuss a handful of important security issues and how they are dealt with in practice.</p>
            <p>Note that this is certainly not intended to be actually used for encryption.</p>
            <h2>Key Generation</h2>
            <p>RSA is an asymmetric, public-key encryption system. Unlike e.g. a onetime pad, where the same key is used to both encrypt and decrypt the message, RSA has two different keys, a "public key" used to encrypt the message and a "private key" used to decrypt the message. Before we discuss how messages are encrypted and decrypted in RSA, we'll discuss what these keys are and how they're generated.</p>
            <p>First, two primes p and q of a given bit length are randomly generated. This is done by randomly generating integers of that bit length until primes come up, using a fast probabilistic primality test (e.g. Miller-Rabin) to determine when a prime has been generated. From this, the first part of the public key can be generated: the "modulus" n = pq. As will be seen later, RSA encryption involves doing arithmetic mod n, hence the name. When people talk about, say, "2048-bit" or "4096-bit" RSA, they're referring to the length of this modulus.</p>
            <p>Larger keys are more secure but slower to generate and use. They also allow for longer messages (as messages must be positive integers less than the modulus), although given that RSA is mainly used to send short messages such as keys for symmetric cryptosystems, this is less relevant to what key length is used than speed and security considerations.</p>
            <p>Now the rest of the keys can be generated: the "encrypting exponent" E and the "decrypting exponent" D. The roles of these will be explained more fully later, but for now, just note that these are just two integers such that ED ≡ 1 (mod (p-1)(q-1)). There are many possible pairs of numbers that could work, but usually E is chosen as an arbitrary small integer with gcd(E, (p-1)(q-1)) (in this implementation, it's just the smallest odd integer greater than one that has this property). Once E has been fixed, the existence and uniqueness of D is guaranteed, and D can be found using the extended Euclidean algorithm.</p>
            </div>
        </div>

    )
}
export function KeygenDescription(){
    return (
        
        <div className="center-container">
            <p>Use the form below to enter the number of digits in each prime. Real RSA keys use primes with 1024 to 2048 bits each (roughly 300-600 digits), but for the purposes of the demo, a key with 5-10 digits (about 16-32 bits) will be fine. (In fact, I would recommend against large keys, since the key generation function is hosted on an AWS Lambda instance which doesn't enough resources for fast generation of large keys and will time out if it takes more than a few seconds to find keys.)</p>
        </div>
    )
}

export function TextBeforeEncryption(){
    return (
        <>
        <h2>Encryption and Decryption</h2>
        <p>The basic idea behind RSA is this</p>
        </>
    )
}