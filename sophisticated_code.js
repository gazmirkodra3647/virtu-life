/* 
   Filename: sophisticated_code.js
   
   This code is a complex and sophisticated implementation of a data structure called a trie.
   It includes methods to insert, search, and delete words efficiently. The trie is used to store
   a dictionary of words and provides autocomplete suggestions based on user input.
*/

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let currentNode = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!currentNode.children[char]) {
        currentNode.children[char] = new TrieNode();
      }
      currentNode = currentNode.children[char];
    }
    currentNode.isEndOfWord = true;
  }

  search(word) {
    let currentNode = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!currentNode.children[char]) {
        return false;
      }
      currentNode = currentNode.children[char];
    }
    return currentNode.isEndOfWord;
  }

  delete(word) {
    this._deleteHelper(this.root, word, 0);
  }

  _deleteHelper(currentNode, word, index) {
    if (index === word.length) {
      if (!currentNode.isEndOfWord) return;
      currentNode.isEndOfWord = false;
      return Object.keys(currentNode.children).length === 0;
    }

    const char = word[index];
    if (!currentNode.children[char]) return;

    const shouldDeleteCurrentNode = this._deleteHelper(currentNode.children[char], word, index + 1);
    if (shouldDeleteCurrentNode) {
      delete currentNode.children[char];
      return Object.keys(currentNode.children).length === 0;
    }

    return false;
  }

  autocomplete(prefix) {
    let currentNode = this.root;
    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      if (!currentNode.children[char]) {
        return [];
      }
      currentNode = currentNode.children[char];
    }

    const autocompleteList = [];
    this._collectWords(currentNode, prefix, autocompleteList);
    return autocompleteList;
  }

  _collectWords(currentNode, prefix, autocompleteList) {
    if (currentNode.isEndOfWord) {
      autocompleteList.push(prefix);
    }

    for (const char in currentNode.children) {
      this._collectWords(currentNode.children[char], prefix + char, autocompleteList);
    }
  }
}

// Example usage

const trie = new Trie();

// Inserting words into the trie
trie.insert("apple");
trie.insert("application");
trie.insert("approach");
trie.insert("banana");
trie.insert("cat");
trie.insert("dog");

// Searching for words in the trie
console.log(trie.search("apple")); // Output: true
console.log(trie.search("application")); // Output: true
console.log(trie.search("car")); // Output: false

// Deleting words from the trie
trie.delete("approach");
console.log(trie.search("approach")); // Output: false

// Autocomplete suggestions
console.log(trie.autocomplete("appl")); // Output: ["apple", "application"]
console.log(trie.autocomplete("ca")); // Output: ["cat"]
console.log(trie.autocomplete("zoo")); // Output: []