import { BinarySearchTree } from "./bst/bst";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

const getRandomNumbers = (count) => {
  const nums = [];
  while (nums.length < count) {
    const r = Math.floor(Math.random() * 100);
    if (!nums.includes(r)) nums.push(r);
  }
  return nums;
};

const initialData = getRandomNumbers(15);
const tree = new BinarySearchTree(initialData);

console.log("--- Initial Tree Created ---");
prettyPrint(tree.root);

console.log("\nIs tree balanced?", tree.isBalanced());

const printOrders = (t) => {
  const level = [];
  const pre = [];
  const post = [];
  const inOrd = [];

  t.levelOrderForEach((val) => level.push(val));
  t.preOrderForEach((val) => pre.push(val));
  t.postOrderForEach((val) => post.push(val));
  t.inOrderForEach((val) => inOrd.push(val));

  console.log("Level Order:", level.join(", "));
  console.log("Pre Order:  ", pre.join(", "));
  console.log("Post Order: ", post.join(", "));
  console.log("In Order:   ", inOrd.join(", "));
};

printOrders(tree);

console.log("\n--- Adding values > 100 to unbalance ---");
tree.insert(150);
tree.insert(200);
tree.insert(250);
tree.insert(300);
tree.insert(350);

prettyPrint(tree.root);

console.log("\nIs tree balanced?", tree.isBalanced());

console.log("\n--- Rebalancing Tree ---");
tree.rebalance();
prettyPrint(tree.root);

console.log("\nIs tree balanced?", tree.isBalanced());

printOrders(tree);
