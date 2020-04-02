const Colors = {
    // 白色：表示顶点还没被访问过
    WHITE: 0,
    // 灰色：表示顶点被访问过，但并未被探索过
    GREY: 1,
    // 黑色：表示该顶点被访问且被完全探索过
    BLACK: 2
}
const initializeColor = vertices => {
    // 存储顶点是否被访问过
    const color = {};
    for(let i = 0; i < vertices.length; i++){
        // 初始化每个顶点为白色（未访问状态）
        color[vertices[i]] = Colors.WHITE;
    }
    return color;
}

export const depthFirstSearch = (graph,callback) => {
    // 获取图的顶点列表
    const vertices = graph.getVertices();
    // 获取图的邻接表
    const adjList = graph.getAdjList();
    // 初始化顶点状态
    const color = initializeColor(vertices);

    // 遍历每个顶点
    for(let i = 0; i < vertices.length; i++){
        if(color[vertices[i]] === Colors.WHITE) {
            // 若顶点未被访问，则调用递归函数 depthFirstSearchVisit 去探索该顶点
            depthFirstSearchVisit(vertices[i], color, adjList, callback);
        }
    }
};

/**
 * 访问顶点的所有邻点，并对顶点执行回调函数
 * @param {*} u         被探索的顶点
 * @param {*} color     顶点状态表
 * @param {*} adjList   邻接表
 * @param {*} callback  回调函数
 */
const depthFirstSearchVisit = (u, color, adjList, callback) => {
    // 设置该顶点的状态为 被访问过（灰色）
    color[u] = Colors.GREY;
    if(callback) {
        callback(u);
    }
    // 获得 u 的邻接表
    const neighbors = adjList.get(u);
    // 遍历 u 的所有邻点
    for(let i = 0; i < neighbors.length; i++){
        const w = neighbors[i];
        if(color[w] === Colors.WHITE) {
            // 若该邻点 w 未被访问过（白色），则递归调用 depthFirstSearchVisit 函数
            depthFirstSearchVisit(w, color, adjList, callback);
        }
    }
    // 最后，在该顶点和邻点按深度访问之后，回退，
    // 意味着该顶点已被完全探索，改变状态为 已访问（黑色）
    color[u] = Colors.BLACK;
}

// 生成树
export const DFS = graph => {
    // 获取图的顶点列表
    const vertices = graph.getVertices();
    // 获取图的邻接表
    const adjList = graph.getAdjList();
    // 初始化顶点状态
    const color = initializeColor(vertices);
    
    // 初始化 d: 发现时间，f：完成探索时间，p：前溯点=================================
    const d = {};
    const f = {};
    const p = {};
    // 追踪发现时间和完成探索时间 ===================================================
    const time = { count: 0 };
    for (let i = 0; i < vertices.length; i++) {
        f[vertices[i]] = 0;
        d[vertices[i]] = 0;
        p[vertices[i]] = null;
    }

    // 遍历每个顶点
    for(let i = 0; i < vertices.length; i++){
        if(color[vertices[i]] === Colors.WHITE) {
            // 若顶点未被访问，则调用递归函数 depthFirstSearchVisit 去探索该顶点
            DFSVisit(vertices[i], color, d, f, p, time, adjList);
        }
    }

    // 返回发现时间，完成探索时间，前溯点 =============================================
    return {
        discovery: d,
        finished: f,
        predecessors: p
    }
};

const DFSVisit = (u, color, d, f, p, time, adjList) => {
    // 设置该顶点的状态为 被访问过（灰色）
    color[u] = Colors.GREY;
    // 当一个顶点第一次被发现时，追踪其发现时间 ========================================
    d[u] = ++time.count;
    // 获得 u 的邻接表
    const neighbors = adjList.get(u);
    // 遍历 u 的所有邻点
    for(let i = 0; i < neighbors.length; i++){
        const w = neighbors[i];
        if(color[w] === Colors.WHITE) {
            // 追踪前溯点 ============================================================
            p[w] = u;
            // 若该邻点 w 未被访问过（白色），则递归调用 depthFirstSearchVisit 函数
            DFSVisit(w, color, d, f, p, time, adjList);
        }
    }
    // 最后，在该顶点和邻点按深度访问之后，回退，
    // 意味着该顶点已被完全探索，改变状态为 已访问（黑色）
    color[u] = Colors.BLACK;
    // 追踪其探索完成时间 =============================================================
    f[u] = ++time.count;
}
