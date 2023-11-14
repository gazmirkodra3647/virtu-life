/** 
 * Filename: advancedEncryption.js
 * Description: JavaScript code for advanced encryption using RSA algorithm
 * Author: John Doe
 */

// Generate a random prime number
function generatePrimeNumber() {
  let isPrime = false;
  let num = 0;
    
  while (!isPrime) {
    num = Math.floor(Math.random() * 1000) + 1;
    isPrime = true;
        
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }
  }
  
  return num;
}

// Find greatest common divisor (GCD)
function gcd(a, b) {
  if (b === 0) {
    return a;
  }
  
  return gcd(b, a % b);
}

// Compute multiplicative inverse
function multiplicativeInverse(e, phi) {
  let m1 = phi, m2 = e, t1 = 0, t2 = 1, r, q;
  
  while (m2 !== 0) {
    q = Math.floor(m1 / m2);
    r = m1 - (q * m2);
    
    t1 = t1 - (q * t2);
    [m1, m2] = [m2, r];
    [t1, t2] = [t2, t1];
  }
  
  if (t1 < 0) {
    t1 = t1 + phi;
  }
  
  return t1;
}

// Generate RSA keys
function generateRSAKeys() {
  const p = generatePrimeNumber();
  const q = generatePrimeNumber();
  const n = p * q;
  const phi = (p - 1) * (q - 1);
  let e = 2;
  
  while (e < phi) {
    if (gcd(e, phi) === 1) {
      break;
    }
    e++;
  }
  
  const d = multiplicativeInverse(e, phi);
  
  return { publicKey: { n, e }, privateKey: { n, d } };
}

// Encrypt message using RSA public key
function encrypt(message, publicKey) {
  const { n, e } = publicKey;
  let encryptedMessage = '';
  
  for (let i = 0; i < message.length; i++) {
    let charCode = message.charCodeAt(i);
    let encryptedCharCode = Math.pow(charCode, e) % n;
    encryptedMessage += String.fromCharCode(encryptedCharCode);
  }
  
  return encryptedMessage;
}

// Decrypt message using RSA private key
function decrypt(message, privateKey) {
  const { n, d } = privateKey;
  let decryptedMessage = '';
  
  for (let i = 0; i < message.length; i++) {
    let charCode = message.charCodeAt(i);
    let decryptedCharCode = Math.pow(charCode, d) % n;
    decryptedMessage += String.fromCharCode(decryptedCharCode);
  }
  
  return decryptedMessage;
}

// Test the RSA encryption
function testRSAEncryption() {
  // Generate RSA keys
  const rsaKeys = generateRSAKeys();
  
  // Secret message to encrypt
  const message = 'Hello, World!';
  
  console.log('Original Message:', message);
  
  // Encryption using public key
  const encryptedMessage = encrypt(message, rsaKeys.publicKey);
  console.log('Encrypted Message:', encryptedMessage);
  
  // Decryption using private key
  const decryptedMessage = decrypt(encryptedMessage, rsaKeys.privateKey);
  console.log('Decrypted Message:', decryptedMessage);
}

// Run the test
testRSAEncryption();
