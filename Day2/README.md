# Project - Day 2

## Challenge

As a team, create a short javascript console app that will "crack" an encrypted string using an encryption algorithm. Your solution should support multiple encryption algorithms and will be tested using an unknown one.

The encryption algorithm will provided as a class that implements:

```typescript
interface EncryptionAlgorithm {
  
  encrypt(plaintext: string, key: string) : string 

  decrypt(cyphertext: string, key: string) : string
}
```

There are only a few constraints. They are:
* The key will be exactly four characters
* The key will be all alphabetical lower case characters ([a-z])
* The encrypted text will be in english

## Expected Output

Your solution should log to the console "Key Found: 'abcd'" where abcd is the cracked key or "Key Not Found" if no key can be determined. How you structure your application is up to you, but it must be able to be configured with an encryption algorithm, and then "crack" and reveal the secret keys that were used to encrypt several strings.
Document the API for your solution well enough (just include a README file) that I can run your code without needing to look at the source.

## Sample Data

### Algorithm

The sample ciphertext is encrypted with the following algorithm:

To encrypt: the key will cycle through, so for a four character key of "abcd", to encrypt the first character of the plaintext you would use "a", then "b" for the second character, and so on. For the fifth character of the plaintext, you would cycle back to "a". For each character, convert the character and it's correspoding key character to their numerical codes (UTF-16) and add the key to the plaintext character codes. The output should be a comma separated list of numbers representing each character.

To decrypt: Do the opposite and subtract the key.

### Example

plaintext: "abcd"
key: "efgh"

the first character is "a", which has a corresponding key of "e". Those have key codes of 97 and 101 respecively. So the encrypted first character would be 198.

The final output would be "198,200,202,204"

### Reference

```javascript

// Get the ASCII character code of "a" (97)
"a".charCodeAt(0);

// Do the opposite and return "a"
String.fromCharCode(97); 

// Convert a string to an Array
Array.from("abcd");

// Combine and array back into a string (one of several methods)
["a","b","c","d"].join("");

// Iterate each character in a string (or array)
for (let char of "somestring") {
  //...
}

```

### Data

<pre>198,209,201,133,198,216,217,215,146,205,201,133,184,219,197,211,213,206,144,133,230,209,201,133,185,210,214,212,146,205,139,174,230,202,208,206,211,137,197,211,214,137,186,218,215,213,216,198,146,202,132,170,229,217,197,342,211,137,209,198,221,206,132,218,226,137,199,222,213,213,205,211,217,144,215,133,226,219,201,216,230,210,203,206,225,222,215,145,146,221,204,215,215,206,145,220,215,206,207,146,222,216,210,204,146,176,214,198,224,205,132,185,225,222,214,216,173,137,216,205,215,137,184,212,231,219,132,206,229,137,216,205,215,137,211,209,214,206,215,217,146,202,210,201,146,208,201,211,215,219,197,209,222,226,132,200,225,215,215,206,214,206,214,202,214,137,216,205,215,137,209,212,229,221,132,213,228,206,215,217,219,208,205,212,231,220,132,212,216,137,216,205,215,137,216,205,228,206,201,133,212,226,132,203,211,215,215,133,211,215,200,133,228,210,200,202,228,220,132,198,222,210,207,202,160,137,184,215,211,205,205,217,219,216,210,198,222,213,221,145,146,221,204,202,146,219,197,200,215,137,205,216,146,209,201,209,214,137,212,215,219,214,197,215,219,213,221,133,219,215,132,217,218,206,132,210,225,215,216,205,146,216,202,133,188,222,208,222,160,137,187,205,219,213,201,133,230,209,201,133,228,216,217,217,215,137,199,205,211,215,203,202,229,137,201,198,213,209,132,222,215,202,214,145,146,221,204,202,146,207,211,215,223,202,216,133,225,207,132,217,218,206,132,215,211,204,201,133,229,221,197,222,229,137,216,205,215,137,215,198,223,206,132,220,219,221,204,133,230,209,201,133,211,217,212,202,211,219,197,211,213,206,132,212,216,137,216,206,223,206,132,217,228,210,197,209,229,149,132,217,218,206,132,213,211,220,215,198,217,206,132,217,218,219,211,218,217,209,132,217,218,206,132,210,225,222,210,217,211,210,210,133,213,209,197,206,224,220,132,212,216,137,216,205,215,137,180,222,228,206,210,202,215,220,132,198,224,205,132,217,218,206,132,166,222,217,215,145,146,202,210,201,146,221,204,202,146,207,205,211,219,220,204,133,225,215,132,217,218,206,132,168,218,202,209,213,229,150,301,209,235,220,333,202,229,137,205,211,146,185,197,215,219,220,146,133,198,209,201,133,223,216,200,202,228,215,132,202,214,210,216,206,225,215,215,133,225,207,132,217,218,206,132,185,225,222,214,133,214,206,132,171,228,202,210,200,215,137,199,212,224,220,205,216,230,137,211,203,146,155,149,133,214,202,221,146,222,216,210,204,146,220,201,204,223,206,210,217,229,137,140,216,230,202,203,202,229,146,132,212,232,206,214,133,211,137,150,152,159,205,197,222,146,217,201,215,219,216,200,133,211,215,200,133,213,216,218,202,228,137,197,215,225,222,210,201,146,156,144,154,162,153,132,208,219,213,211,210,215,221,214,202,229,137,140,151,158,155,148,149,146,214,205,142,160,137,184,205,215,137,214,198,213,206,132,198,222,221,201,215,224,202,216,202,229,137,198,202,230,224,201,202,224,137,199,209,225,204,207,220,219,220,201,133,211,215,200,133,213,216,217,211,230,206,214,200,222,216,199,208,233,210,215,202,146,204,205,215,213,222,205,217,229,137,211,203,146,175,214,198,224,204,201,147</pre>

## Bounus Points
* Optimize performance
* Support configuration for any specified key length (I.E. if the constraints changed to define keys as 5 characters)
* Support configuration for any specified key characters (I.E. if the constraints changed to allow for numbers as well)
