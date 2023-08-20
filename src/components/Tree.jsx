import React, { useState, useEffect } from 'react';

function TreeNode({ node }) {
    return (
        <li>
            {node.name}
            {node.type === "directory" && (
                <ul>
                    {node.children.map((child) => (
                        <TreeNode key={child.name} node={child} />
                    ))}
                </ul>
            )}
        </li>
    );
}

function App() {
    const [directoryTree, setDirectoryTree] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000')
            .then(response => response.json())
            .then(data => setDirectoryTree(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <h1>Directory Tree</h1>
            <ul>
                {directoryTree.map(node => (
                    <TreeNode key={node.name} node={node} />
                ))}
            </ul>
        </div>
    );
}

export default App;
