export class BinarySearchTree {
  constructor(array) {
    this.root = this.#buildTree(array);
  }

  #buildTree(array) {
    let uniqueArray = [...new Set(array)];
    let sortedArray = uniqueArray.toSorted((a, b) => a - b);
    return this.#recursiveBuild(sortedArray, 0, sortedArray.length - 1);
  }

  #recursiveBuild(array, start, end) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);
    let node = new Node(array[mid]);

    node.left = this.#recursiveBuild(array, start, mid - 1);
    node.right = this.#recursiveBuild(array, mid + 1, end);

    return node;
  }

  includes(value) {
    return this.#recursiveInclude(this.root, value);
  }

  #recursiveInclude(node, value) {
    if (node === null) return false;
    if (node.value === value) return true;

    if (value > node.value) {
      return this.#recursiveInclude(node.right, value);
    } else if (value < node.value) {
      return this.#recursiveInclude(node.left, value);
    }
    return false;
  }

  insert(value) {
    this.root = this.#recursiveInsert(this.root, value);
  }

  #recursiveInsert(node, value) {
    if (node === null) return new Node(value);
    if (value === node.value) return node;

    if (value < node.value) {
      node.left = this.#recursiveInsert(node.left, value);
    } else if (value > node.value) {
      node.right = this.#recursiveInsert(node.right, value);
    }
    return node;
  }

  deleteItem(value) {
    this.root = this.#recursiveDelete(this.root, value);
  }

  #recursiveDelete(node, value) {
    if (node === null) return null;

    if (value < node.value) {
      node.left = this.#recursiveDelete(node.left, value);
    } else if (value > node.value) {
      node.right = this.#recursiveDelete(node.right, value);
    } else {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;
      node.value = this.#findMin(node.right);
      node.right = this.#recursiveDelete(node.right, node.value);
    }
    return node;
  }

  #findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node.value;
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }
    if (this.root === null) return;

    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();
      callback(node.value);

      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  }

  inOrderForEach(callback) {
    if (!callback) throw new Error("A callback function is required.");
    this.#recursiveInOrder(this.root, callback);
  }

  #recursiveInOrder(node, callback) {
    if (node === null) return;

    this.#recursiveInOrder(node.left, callback);
    callback(node.value);
    this.#recursiveInOrder(node.right, callback);
  }

  preOrderForEach(callback) {
    if (!callback) throw new Error("A callback function is required.");
    this.#recursivePreOrder(this.root, callback);
  }

  #recursivePreOrder(node, callback) {
    if (node === null) return;

    callback(node.value);
    this.#recursivePreOrder(node.left, callback);
    this.#recursivePreOrder(node.right, callback);
  }

  postOrderForEach(callback) {
    if (!callback) throw new Error("A callback function is required.");
    this.#recursivePostOrder(this.root, callback);
  }

  #recursivePostOrder(node, callback) {
    if (node === null) return;

    this.#recursivePostOrder(node.left, callback);
    this.#recursivePostOrder(node.right, callback);
    callback(node.value);
  }

  find(value) {
    return this.#recursiveFind(this.root, value);
  }

  #recursiveFind(node, value) {
    if (node === null) return null;
    if (node.value === value) return node;

    if (value < node.value) {
      return this.#recursiveFind(node.left, value);
    } else {
      return this.#recursiveFind(node.right, value);
    }
  }

  height(value) {
    const node = this.find(value);
    if (!node) return undefined;

    return this.#recursiveHeight(node);
  }

  #recursiveHeight(node) {
    if (node === null) return -1;

    const leftHeight = this.#recursiveHeight(node.left);
    const rightHeight = this.#recursiveHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(value) {
    return this.#recursiveDepth(this.root, value, 0);
  }

  #recursiveDepth(node, value, currentDepth) {
    if (node === null) return undefined;
    if (node.value === value) return currentDepth;

    if (value < node.value) {
      return this.#recursiveDepth(node.left, value, currentDepth + 1);
    } else {
      return this.#recursiveDepth(node.right, value, currentDepth + 1);
    }
  }

  isBalanced() {
    return this.#checkBalance(this.root);
  }

  #checkBalance(node) {
    if (node === null) return true;

    const leftHeight = this.#recursiveHeight(node.left);
    const rightHeight = this.#recursiveHeight(node.right);

    const isCurrentBalanced = Math.abs(leftHeight - rightHeight) <= 1;

    return (
      isCurrentBalanced &&
      this.#checkBalance(node.left) &&
      this.#checkBalance(node.right)
    );
  }

  rebalance() {
    const sortedValues = [];

    this.inOrderForEach((value) => {
      sortedValues.push(value);
    });
    this.root = this.#buildTree(sortedValues);
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
