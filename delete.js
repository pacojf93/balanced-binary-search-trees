const Tree = require("./bst.js");

tree = Tree([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
]);
tree.print();

console.log(
  tree.isBalanced() ? "the tree is balanced" : "the tree is not balanced"
);

console.log("delete leafs");
tree.deleteItem(1);
tree.deleteItem(3);
tree.deleteItem(5);
tree.print();

console.log("delete node with single child");
tree.deleteItem(6);
tree.print();

console.log("delete node with both childs");
tree.deleteItem(17);
tree.print();
tree.deleteItem(16);
tree.print();

console.log("check if binary search still works");
value = 26;
console.log(`depth of ${value} is ${tree.depth(tree.find(value))}`);
