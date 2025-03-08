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

  const deleteItem = (value) =>
    (deleteItemRec = function (node, value) {
      /*             if (node.data === value ) {
                if(node.right !== null) {
                    node.data = node.right.data
                    deleteItemRec(node, node.data)
                } else {
                    node = null
                    return
                }
            } */
      if (node.left !== null) {
        if (node.left.data === value) {
          if (node.left.right !== null) {
            node.left.data = node.left.right.data;
            deleteItemRec(node.left, node.left.data);
          } else {
            node.left = null;
            return;
          }
        }
      }
      if (node.right !== null) {
        if (node.right.data === value) {
          if (node.right.right !== null) {
            node.right.data = node.right.right.data;
            deleteItemRec(node.right, node.right.data);
          } else {
            node.right = null;
            return;
          }
        }
      }
      if (value > node.data) {
        if (node.right === null) return;
        else deleteItemRec(node.right, value);
      } else {
        if (node.left === null) return;
        else deleteItemRec(node.left, value);
      }
    })(root, value);

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
