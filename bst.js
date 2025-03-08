const Node = (data = null, left = null, right = null) => ({
  data,
  left,
  right,
});

const Tree = (array) => {
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

  const sortAndRemoveDuplicates = (array) =>
    [...new Set(array)].sort((a, b) => a - b); //converting array in Set removes duplicates

  const buildTree = (array) => {
    if (!array.length) return null;
    const rootIndex = Math.floor(array.length / 2);
    const root = Node(array[rootIndex]);
    root.left = buildTree(array.slice(0, rootIndex));
    root.right = buildTree(array.slice(rootIndex + 1));
    return root;
  };

  const insert = (value) =>
    (insertRec = function (node) {
      if (value === node.data) return;
      if (value > node.data) {
        if (node.right === null) node.right = Node(value);
        else insertRec(node.right);
      } else {
        if (node.left === null) node.left = Node(value);
        else insertRec(node.left);
      }
    })(root);

    const deleteItem = (value) => {
        const node = find(value)
        if (node === null) return

        //check if node is a leaf
        if(node.left === null && node.right === null) {
            //delete leaf
            (findLeaf = function (node, parent = null) {
                if(node.data === value) {
                    if (parent.left !== null){
                        if(parent.left.data === value) parent.left = null
                    } else parent.right = null
                    return
                }
                if (value > node.data) {
                    if (node.right === null) return
                    findLeaf(node.right, node)
                } else {
                    if (node.left === null) return
                    findLeaf(node.left, node)
                }
            })(root)
        }

        //check if node has single child
        if((node.left === null) !== (node.right === null)) {
            //delete node and connect parent with child
            (findSingleChild = function (node, parent = null) {
                if(node.data === value) {
                    if(parent.left.data === value) {
                        if (node.left !== null) parent.left = node.left
                        else parent.left = node.right
                    } else {
                        if (node.left !== null) parent.right = node.left
                        else parent.right = node.right
                    }
                    return
                }
                if (value > node.data) {
                    if (node.right === null) return
                    findSingleChild(node.right, node)
                } else {
                    if (node.left === null) return
                    findSingleChild(node.left, node)
                }
            })(root)
        }

        //check if node has both children
        if((node.left !== null) && (node.right !== null)) {
            //find next bigger, delete it and put it in place
            const nextBigger = (findNextBigger = function (node) {
                if (node.left === null) return node
                else return findNextBigger(node.left)
            })(node.right)

            deleteItem(nextBigger.data)
            node.data = nextBigger.data           
        }

    }

  const find = (value) =>
    (findRec = function (node) {
      if (value === node.data) return node;
      if (value > node.data)
        return node.right === null ? null : findRec(node.right);
      else return node.left === null ? null : findRec(node.left);
    })(root);

  const levelOrder = (callBack) => {
    if (callBack === undefined) throw new Error("A callback is required");
    return (levelOrderRec = function (queue) {
      if (!queue.length) return;
      const node = queue[0];
      callBack(node);
      let newQueue = queue.slice(1, queue.length);
      if (node.left !== null) newQueue = [...newQueue, node.left];
      if (node.right !== null) newQueue = [...newQueue, node.right];
      levelOrderRec(newQueue);
    })([root]);
  };

  const inOrder = (callBack) => {
    if (callBack === undefined) throw new Error("A callback is required");
    return (inOrderRec = function (node) {
      if (node.left !== null) inOrderRec(node.left);
      callBack(node);
      if (node.right !== null) inOrderRec(node.right);
    })(root);
  };

  const preOrder = (callBack) => {
    if (callBack === undefined) throw new Error("A callback is required");
    return (preOrderRec = function (node) {
      callBack(node);
      if (node.left !== null) preOrderRec(node.left);
      if (node.right !== null) preOrderRec(node.right);
    })(root);
  };

  const postOrder = (callBack) => {
    if (callBack === undefined) throw new Error("A callback is required");
    return (postOrderRec = function (node) {
      if (node.left !== null) postOrderRec(node.left);
      if (node.right !== null) postOrderRec(node.right);
      callBack(node);
    })(root);
  };

  const height = (node) =>
    (heightRec = function (level, edges) {
      let nextLevel = [];
      level.forEach((node) => {
        if (node.left !== null) nextLevel = [...nextLevel, node.left];
        if (node.right !== null) nextLevel = [...nextLevel, node.right];
      });
      if (!nextLevel.length) return edges;
      else return heightRec(nextLevel, edges + 1);
    })([node], 0);

  const depth = (node) =>
    (depthRec = function (level, edges) {
      if (!level.length) return null;
      if (level.includes(node)) return edges;
      else {
        let nextLevel = [];
        level.forEach((node) => {
          if (node.left !== null) nextLevel = [...nextLevel, node.left];
          if (node.right !== null) nextLevel = [...nextLevel, node.right];
        });
        return depthRec(nextLevel, edges + 1);
      }
    })([root], 0);

  const isBalanced = () =>
    (isBalancedRec = function (node) {
      let leftHeight = 0;
      let rightHeight = 0;
      if (node.left !== null) leftHeight = 1 + height(node.left);
      if (node.right !== null) rightHeight = 1 + height(node.right);

      if (Math.abs(leftHeight - rightHeight) > 1) return false;
      else return true || isBalanced(node.left) || isBalanced(node.right);
    })(root);

  const rebalance = () => {
    const newArray = [];
    inOrder((node) => newArray.push(node.data));
    root = buildTree(sortAndRemoveDuplicates(newArray));
  };

  let root = buildTree(sortAndRemoveDuplicates(array));

  return {
    root: () => root,
    insert,
    deleteItem,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
    print: () => prettyPrint(root),
  };
};

module.exports = Tree;
