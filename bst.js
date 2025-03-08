const Node = (data = null, left = null, right = null) => ({
  data,
  left,
  right,
});

const Tree = (array) => ({root: buildTree(array)})

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

const sortAndRemoveDuplicates = (array) => [...new Set(array)].sort((a, b) => a - b) //converting array in Set removes duplicates

const buildTree = (array) => {
    if (!array.length) return null
    const rootIndex = Math.floor(array.length / 2)
    const root = Node(array[rootIndex])
    root.left = buildTree(array.slice(0,rootIndex))
    root.right = buildTree(array.slice(rootIndex+1))
    return root
}

const array = [
    42, -15, 73, 0, 88, -42, 15, 73, -88, 29,
    -56, 56, 91, -91, 34, -34, 67, -67, 5, -5,
    100, -100, 22, -22, 81, -81, 13, -13, 64, -64,
    42, -15, 73, 0, 88, -42, 15, 73, -88, 29,
    -56, 56, 91, -91, 34, -34, 67, -67, 5, -5
  ];

const procesedArray = sortAndRemoveDuplicates(array)
console.log(procesedArray)

tree = Tree(procesedArray)
prettyPrint(tree.root)
