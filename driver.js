const Tree = require("./bst.js");

const array = [];
const N = 25;
const MAX = 100;
const MIN = -100;

for (let i = 0; i < N; i++)
  array.push(Math.floor(Math.random() * (MAX - MIN) + MIN));

console.log("Generating balanced tree from random generated array");
tree = Tree(array);
tree.print();

console.log(
  tree.isBalanced() ? "the tree is balanced" : "the tree is not balanced"
);

console.log("Elements in level-order");
tree.levelOrder((node) => console.log(node.data));
console.log("Elements in pre-order");
tree.preOrder((node) => console.log(node.data));
console.log("Elements in post-order");
tree.postOrder((node) => console.log(node.data));
console.log("Elements in in-order");
tree.inOrder((node) => console.log(node.data));

tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.print();

console.log(
  tree.isBalanced() ? "the tree is balanced" : "the tree is not balanced"
);

console.log("Balancing the tree");
tree.rebalance();
tree.print();

console.log(
  tree.isBalanced() ? "the tree is balanced" : "the tree is not balanced"
);

console.log("Elements in level-order");
tree.levelOrder((node) => console.log(node.data));
console.log("Elements in pre-order");
tree.preOrder((node) => console.log(node.data));
console.log("Elements in post-order");
tree.postOrder((node) => console.log(node.data));
console.log("Elements in in-order");
tree.inOrder((node) => console.log(node.data));
