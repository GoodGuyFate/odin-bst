import { BinarySearchTree } from "./bst";

describe("BinarySearchTree", () => {
  describe("initialization and building", () => {
    test("should initialize with a null root", () => {
      const bst = new BinarySearchTree();
      expect(bst.root).toBe(null);
    });

    test("should build a balanced tree from [1, 2, 3]", () => {
      const bst = new BinarySearchTree([1, 2, 3]);
      expect(bst.root.value).toBe(2);
      expect(bst.root.left.value).toBe(1);
      expect(bst.root.right.value).toBe(3);
    });

    test("should have correct children for a larger tree", () => {
      const bst = new BinarySearchTree([1, 2, 3, 4, 5, 6, 7]);

      expect(bst.root.value).toBe(4);
      expect(bst.root.left.value).toBe(2);
      expect(bst.root.right.value).toBe(6);
    });
  });

  describe("search operations", () => {
    test("includes should return true for existing values and false for missing ones", () => {
      const bst = new BinarySearchTree([1, 2, 3]);
      expect(bst.includes(2)).toBe(true);
      expect(bst.includes(5)).toBe(false);
    });
  });

  describe("modification operations", () => {
    test("insert should add a new value to the tree", () => {
      const bst = new BinarySearchTree([1, 2, 3]);
      bst.insert(4);
      expect(bst.includes(4)).toBe(true);
    });

    test("insert should maintain BST properties", () => {
      const bst = new BinarySearchTree();
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);

      expect(bst.root.value).toBe(10);
      expect(bst.root.left.value).toBe(5);
      expect(bst.root.right.value).toBe(15);
    });

    test("deleteItem should delete a leaf node (no children)", () => {
      const bst = new BinarySearchTree([1, 2, 3]);
      bst.deleteItem(1);
      expect(bst.includes(1)).toBe(false);
      expect(bst.root.left).toBe(null);
    });

    test("deleteItem should delete a node with one child", () => {
      const bst = new BinarySearchTree([10, 20, 30]);
      bst.insert(25); // 30 will now have a left child (25)
      bst.deleteItem(30);
      expect(bst.includes(30)).toBe(false);
      expect(bst.root.right.value).toBe(25);
    });

    test("deleteItem should delete a node with two children and maintain structure", () => {
      // 4 is root, 2 is left, 6 is right. 5 and 7 are children of 6.
      const bst = new BinarySearchTree([1, 2, 3, 4, 5, 6, 7]);
      bst.deleteItem(6);

      expect(bst.includes(6)).toBe(false);
      // after deleting 6, the in order successor (7) should move up
      expect(bst.root.right.value).toBe(7);
      expect(bst.root.right.left.value).toBe(5);
    });
  });

  describe("traversal operations", () => {
    test("levelOrderForEach should visit nodes level by level", () => {
      // tree structure:
      //      4
      //    /   \
      //   2     6
      //  / \   / \
      // 1   3 5   7
      const bst = new BinarySearchTree([1, 2, 3, 4, 5, 6, 7]);
      const result = [];

      bst.levelOrderForEach((value) => result.push(value));

      // expected: [4, 2, 6, 1, 3, 5, 7]
      expect(result).toEqual([4, 2, 6, 1, 3, 5, 7]);
    });

    test("levelOrderForEach should handle an empty tree", () => {
      const bst = new BinarySearchTree();
      const result = [];

      bst.levelOrderForEach((value) => result.push(value));

      expect(result).toEqual([]);
    });

    test("levelOrderForEach should throw an error if no callback is provided", () => {
      const bst = new BinarySearchTree([1, 2, 3]);

      expect(() => bst.levelOrderForEach()).toThrow(
        "A callback function is required.",
      );
    });

    test("inOrderForEach should visit nodes in sorted order", () => {
      // tree structure:
      //      4
      //    /   \
      //   2     6
      //  / \   / \
      // 1   3 5   7
      const bst = new BinarySearchTree([1, 2, 3, 4, 5, 6, 7]);
      const result = [];

      bst.inOrderForEach((value) => result.push(value));

      // in order traversal of a BST always yields sorted results
      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    test("inOrderForEach should handle an empty tree", () => {
      const bst = new BinarySearchTree();
      const result = [];

      bst.inOrderForEach((value) => result.push(value));

      expect(result).toEqual([]);
    });

    test("inOrderForEach should throw an error if no callback is provided", () => {
      const bst = new BinarySearchTree([1, 2, 3]);

      expect(() => bst.inOrderForEach()).toThrow(
        "A callback function is required.",
      );
    });

    test("preOrderForEach should visit nodes in Root-Left-Right order", () => {
      // tree structure for both tests:
      //      4
      //    /   \
      //   2     6
      //  / \   / \
      // 1   3 5   7
      const bst = new BinarySearchTree([1, 2, 3, 4, 5, 6, 7]);
      const result = [];

      bst.preOrderForEach((value) => result.push(value));

      // root(4), then leftSubtree(2,1,3), then rightSubtree(6,5,7)
      expect(result).toEqual([4, 2, 1, 3, 6, 5, 7]);
    });

    test("preOrderForEach should throw error if no callback is provided", () => {
      const bst = new BinarySearchTree([1, 2, 3]);
      expect(() => bst.preOrderForEach()).toThrow(
        "A callback function is required.",
      );
    });

    test("postOrderForEach should visit nodes in Left-Right-Root order", () => {
      // tree structure for both tests:
      //      4
      //    /   \
      //   2     6
      //  / \   / \
      // 1   3 5   7
      const bst = new BinarySearchTree([1, 2, 3, 4, 5, 6, 7]);
      const result = [];

      bst.postOrderForEach((value) => result.push(value));

      // leftSubtree(1,3,2), then rightSubtree(5,7,6), then root(4)
      expect(result).toEqual([1, 3, 2, 5, 7, 6, 4]);
    });

    test("preOrderForEach should throw error if no callback is provided", () => {
      const bst = new BinarySearchTree([1, 2, 3]);
      expect(() => bst.postOrderForEach()).toThrow(
        "A callback function is required.",
      );
    });
  });

  describe("height and depth", () => {
    const treeData = [1, 2, 3, 4, 5, 6, 7];
    // tree structure:
    //      4
    //    /   \
    //   2     6
    //  / \   / \
    // 1   3 5   7

    test("height should return the correct height for various nodes", () => {
      const bst = new BinarySearchTree(treeData);

      expect(bst.height(4)).toBe(2); // root
      expect(bst.height(2)).toBe(1); // internal node
      expect(bst.height(1)).toBe(0); // leaf node
    });

    test("height should return undefined for a non-existent value", () => {
      const bst = new BinarySearchTree(treeData);
      expect(bst.height(10)).toBeUndefined();
    });

    test("depth should return the correct depth for various nodes", () => {
      const bst = new BinarySearchTree([1, 2, 3, 4, 5, 6, 7]);

      expect(bst.depth(4)).toBe(0); // root
      expect(bst.depth(2)).toBe(1); // one level down
      expect(bst.depth(7)).toBe(2); // two levels down
    });

    test("depth should return undefined for a non-existent value", () => {
      const bst = new BinarySearchTree([1, 2, 3, 4, 5, 6, 7]);
      expect(bst.depth(10)).toBeUndefined();
    });
  });

  describe("Balance", () => {
    test("isBalance should return true for a balanced tree", () => {
      const bst = new BinarySearchTree([1, 2, 3, 4, 5, 6, 7]);
      expect(bst.isBalanced()).toBe(true);
    });

    test("isBalance should return false for an unbalanced tree", () => {
      const bst = new BinarySearchTree();
      bst.insert(10);
      bst.insert(20);
      bst.insert(30); // this creates a straight line: 10 -> 20 -> 30

      expect(bst.isBalanced()).toBe(false);
    });

    test("isBalance should return true for an empty tree", () => {
      const bst = new BinarySearchTree();
      expect(bst.isBalanced()).toBe(true);
    });

    test("reBalance should turn an unbalanced tree into a balanced one", () => {
      // create a heavily unbalanced tree: 1 -> 2 -> 3 -> 4 -> 5
      const bst = new BinarySearchTree();
      bst.insert(1);
      bst.insert(2);
      bst.insert(3);
      bst.insert(4);
      bst.insert(5);

      expect(bst.isBalanced()).toBe(false);

      bst.rebalance();

      expect(bst.isBalanced()).toBe(true);
      // after rebalancing [1, 2, 3, 4, 5], 3 should be the new root
      expect(bst.root.value).toBe(3);
    });
  });
});
