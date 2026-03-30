---
title: "Crypto 101"
date: "2025-12-11"
description: "Learning enough crypto to be dangerous"
tags: ["cryptography", "notes"]
toc: true
---

I'm taking a cryptography class for the Fall 2025 semester at Université de Montréal. What follows is a dump of what I've learnt about cryptography for personal future reference.

## A little bit of history

Humans have long sought secure ways to keep their communication confidential. This search has been the source of a long battle between those that create codes and those that try to break them.

One of the first known techniques for hiding the content of a message is steganography (5th century BCE).

## Private key (or symmetric key) cryptography

Symmetric key cryptography methods usually involve two functions:

- $E_K(M) = C$, encrypts the message $M$ with the key $K$
- $D_K(C) = M$, decrypts the code or ciphertext $C$ with the key $K$

The idea is that the message should not be known from the code without the key.

Symmetric key cryptography gets its name from the fact that the key used to encrypt and decrypt is the same.

### One-time pad

The one time pad is an encryption technique that provides perfect secrecy. It is mathematically impossible to break when used correctly. Here's how it works:

- Generate a truly random key that is at least as long as the message.
- Combine each bit of the message with the corresponding bit of the key using a XOR operation. i.e. $E_K(M) = M \oplus K$
- The recipient who has an identical copy of the key reverses the process to decrypt the code. i.e. $D_K(C) = C \oplus K$

The one time pad solves the cryptographic challenge of information-theoretic security. Unlike most encryption techniques like AES which are computationally secure (meaning that would require impractical amounts of resources to break with current technology), the one time pad is impossible to break even with infinite resources. This is because every possible message of the same length is possible given the ciphertext.

The one time pad is impractical for real world use cases because of its constraints:

- The key must be truly random not pseudorandom
- The key must be at least as long as the message
- The key can never be reused (hence "one-time")
- Both parties must securely exchange the key beforehand.

### DES

DES (Data Encryption Standard) is a symmetric key block cipher (meaning that it operates on fixed-size chunks aka blocks of data) that was prevalent in the 1970s through the 1990s. It was the first, publicly available standardized encryption algorithm.

#### Key facts

| Parameter  | Value  |
| ---------- | ------ |
| Block Size | 64 bit |
| Key Size   | 56 bit |
| Rounds     | 16     |

#### How it works

DES uses a Feistel network structure which works like this:

- The 64-bit plaintext block is rearranged according to a fixed table (called Initial Permutation)
- For each of the 16 rounds of processing:
  - The block is split into left and right halves of 32 bits each
  - The right half goes through a function that involves expanding it from 32 bits to 48 bits. A XOR operation with a 48 bit subkey derived from the main key. The shrinking from 48 bits to 32 bits using eight lookup tables (called substitution boxes or S-boxes). Finally a permutation where the bits are rearranged.
    ![Feistel function](/images/posts/crypto/Data_Encription_Standard_Flow_Diagram.svg.png)
  - The output is XORed with the left half
  - The halves are swapped for the next round
- Reverse the initial permutation (called Final Permutation)

> **Note:** Lookup tables (S-boxes) are used because they provide a non linear mapping between input and outputs. This makes it hard for an attacker to find a mathematical relationship between the plaintext, the ciphertext and the key.

#### Weakness

The main weakness of DES is that the 56-bit key is too short. Using a brute force attack it is relatively easy with modern hardware to do an exhaustive search of the key space.

### AES

AES (Advanced Encryption Standard) is an encryption algorithm that replaced DES and is widely used to this day.

#### Key facts

| Key Size | Rounds |
| -------- | ------ |
| 128 bits | 10     |
| 192 bits | 12     |
| 256 bits | 14     |

Block size is always 128 bits.

#### How it works

AES uses a substitution-permutation network where the entire block is transformed each round (rather than splitting in half).

- The 128-bit block is arranged in a 4x4 grid
- Each round except the last, applies these four steps:
  - SubBytes: Each byte is replaced using a single S-box lookup table.
  - ShiftRows: Each row of the grid is rotated.
    - Row 0: no shift
    - Row 1: shift left by 1
    - Row 2: shift left by 2
    - Row 3: shift left by 3
    ![ShiftRows](/images/posts/crypto/AES-ShiftRows.svg.png)
  - MixColumns: Each column is transformed through matrix multiplication using a fixed matrix.
  - AddRoundKey: The block is XORed with a subkey (also called round key) derived from the main key through Rijndael's key schedule.

The final round skips MixColumns.

### Notes on block ciphers

A block cipher is an encryption algorithm that operates on fixed-size chunks (blocks) of data. In most cases, a real message rarely fits evenly in fixed size blocks. Various padding schemes exist to handle this and ensure padding can be removed after decryption. Both AES and DES are block ciphers.

#### Mode of operation

A raw cipher block only handles one block. To encrypt longer messages, you need a mode of operation:

- Electronic Codebook (ECB): A naive approach would be to divide the padded message into blocks of the size the cipher can handle (e.g. 128-bit for AES) and encrypt each block independently. This is insecure as identical plaintext blocks will produce identical ciphertext blocks revealing information about the original message.
![ECB](/images/posts/crypto/ecb.png)
- Cipher Block Chaining (CBC): Each plaintext block is XORed with the previous ciphertext block before encryption. This hides patterns but can't be parallelized. A random starting value (initialization vector) is used for the first XOR operation so that identical messages produce different codes each time.
![CBC](/images/posts/crypto/CBC_encryption.svg.png)
- Counter Mode (CTR): Concatenates a nonce/IV with a sequential counter for each block, encrypts that counter value with the key, and XORs the result with the plaintext. This is fully parallelizable (so better for performance) however reusing a nonce with the same key breaks security. This method does not protect integrity, flipping a bit in the ciphertext flips the corresponding bit in the plaintext predictably resulting in a corrupted message (aka tampering).
![CTR](/images/posts/crypto/CTR_encryption_2.svg.png)
- Galois/Counter Mode (GCM): GCM combines CTR mode with an authentication tag. The tag is computed using the ciphertext and additional unencrypted data that needs to be authenticated. On decryption, if the tag doesn't match then data was tampered with.

### Message Authentication Code

A message authentication code (MAC) is a small piece of data that proves a message has not been tampered with and came from someone who knows the secret key. MACs leverage symmetric key cryptography to ensure message integrity and authentication.

Main difference between a MAC and a checksum is that only those with the key can compute a mac but anyone can compute a checksum.

#### How it works

- Both parties share a secret key
- The sender computes a tag with the message using the key and sends both the ciphertext and the tag
- The receiver gets the ciphertext and decrypts it with the key. Computes a tag with the message and the key then compares the result with the tag received from the sender. If the tags don't match then the message has been tampered with.

#### Order of operations

It is generally recommended to encrypt then authenticate (Encrypt-then-MAC) because with MAC-then-encrypt you must decrypt before you can verify the tag (which means processing potentially malicious data). With Encrypt-then-MAC, you verify first and reject any tampered ciphertext without having to decrypt it.

#### Common implementations

- Hash-based MAC (HMAC): Combines a cryptographic hash function with the key using this formula:

$$
HMAC(K, M) = Hash((K \oplus opad) \| Hash((K \oplus ipad) \| M))
$$

- CBC-MAC / CMAC: uses a block cipher instead of a hash function. The message is processed through CBC mode and the final block becomes the tag.

### Hash functions

A hash function is a function that takes an input of any size and produces an output of fixed size called hash or digest. The same input should always produce the same output. It should not be possible to determine the input from the output.

Hash functions work by dividing the message into blocks then applying a fixed-size compression function iteratively. Most classic functions use the Merkle-Damgård construction:

- Pad the message to a multiple of the block size
- Start with a fixed IV
- Process each block through a compression function that takes the current state and message block, producing a new state of a fixed size (the digest size).
- The final state is the output

#### Attack vectors

Due to the birthday paradox, it is easier to find two different inputs that produce the same hash (collision attack) than finding a message that produces a specific hash (preimage attack). On average it takes $2^n$ attempts for a preimage attack vs $2^{n/2}$ for collision attack.

## Public (or asymmetric) key cryptography

In symmetric cryptography, we can ensure the confidentiality of a message if the sender and recipient share a secret key. How can we ensure confidentiality of a message without sharing a secret key before hand? Asymmetric key cryptography is the answer.

Asymmetric key cryptography involves two keys:

- A private key that decrypts ciphertext.
- A public key that encrypts messages. Anyone who knows this key can encrypt a message that can only be decrypted using the associated private key.

### Security conditions

- Given that everyone knows the public key, it should be hard (computationally impossible) to find the secret key from the public key
- It should be easy to derive the public key from the secret key. This allows for easy key generation.
- Asymmetric key systems are vulnerable to exhaustive search so keys should be longer than keys in symmetric key systems.

### RSA

Developed in 1977 by Rivest, Shamir & Adleman, it is one of the most widely used public-key cryptosystems.

#### How it works

- Choose two large prime numbers $p$ and $q$
- Define $n = pq$ and $e > 2$ such that $\gcd(e, (p-1)(q-1)) = 1$
- Compute $d$ as $e^{-1} \mod (p-1)(q-1)$
- Public key is $(n, e)$
- Private key is $d$
- The encryption function is $E(M) = M^e \pmod{n}$
- The decryption function is $D(M) = M^d \pmod{n}$

#### Modular exponentiation

RSA's encryption and decryption both rely on modular exponentiation: computing $M^e \pmod{n}$ or $C^d \pmod{n}$. Even though $e$ and $d$ can be very large numbers, modular exponentiation can be computed efficiently using the [square-and-multiply algorithm](https://en.wikipedia.org/wiki/Exponentiation_by_squaring), which runs in $O(\log e)$ multiplications rather than $e - 1$ multiplications.

#### Integer factorisation

RSA's security relies on the difficulty of factoring large numbers. Given $n = pq$, it is computationally infeasible to recover $p$ and $q$ (and therefore $d$) when $p$ and $q$ are sufficiently large primes.

#### Textbook RSA

The raw mathematical RSA operation without any padding has a few security flaws:

- The same plaintext always produces the same ciphertext. This reveals information about the original message when a message is sent multiple times. This is even worse when the message space is small as an attacker can just encrypt all possible values and compare.
- An attacker can manipulate ciphertext in predictable ways without knowing the plaintext.
- If the message $m$ is small and $e$ is small, the encryption might not wrap around the modulus. For $c = m^3 \mod n$, if $m^3 < n$ then $c = m^3$ with no modular reduction.

The solution to these flaws is padding. In practice, RSA implementations use padding schemes to add randomness before encryption so the same message encrypts differently each time. The modern standard for padding is optimal asymmetric encryption padding (OAEP).

### RSA signatures

- Hash data to be signed to create a digest
- Encrypt digest with RSA private key
- Result is the signature
- Signature is attached to data

To verify signature:

- Hash data to create digest
- Decrypt signature with public key
- Compare results

