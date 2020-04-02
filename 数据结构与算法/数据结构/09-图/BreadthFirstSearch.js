import Queue from '../03-队列/Queue.js'
import Stack from '../02-栈/Stack.js'

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
export const breadthFirstSearch = (graph, startVertex, callback) => {
    // 获取图的顶点列表
    const vertices = graph.getVertices();
    // 获取图的邻接表
    const adjList = graph.getAdjList();
    // 初始化每个顶点的状态（颜色）为未访问（白色）
    const color = initializeColor(vertices);
    // 创建队列，存储待访问和待探索的顶点
    const queue = new Queue();

    // 将起始顶点入列
    queue.enqueue(startVertex);

    // 判断队列是否为空
    while(!queue.isEmpty()){
        // 如果队列非空
        // 将队首顶点出队
        const u = queue.dequeue();
        // 获取该顶点的邻接表   
        const neighbors = adjList.get(u);
        // 设置该顶点的状态为被访问（灰色）
        color[u] = Colors.GREY;
        // 遍历该顶点的邻接表
        for (let i = 0; i < neighbors.length; i++) {
            // 获取邻点
            const w = neighbors[i];
            // 判断邻点是否被访问过
            if(color[w] === Colors.WHITE) {
                // 若没被访问（白色），则将其状态改为被访问（灰色），并且加入队列
                color[w] = Colors.GREY;
                queue.enqueue(w);
            }
        }
        // 将该顶点的状态改为已访问（黑色）
        color[u] = Colors.BLACK;
        // 是否有回调函数，若有则执行
        if(callback) {
            callback(u);
        }
    }
};
// BFS 计算最短路径
export const BFS = (graph, startVertex) => {
    // 获取图的顶点列表
    const vertices = graph.getVertices();
    // 获取图的邻接表
    const adjList = graph.getAdjList();
    // 初始化每个顶点的状态（颜色）为未访问（白色）
    const color = initializeColor(vertices);
    // 创建队列，存储待访问和待探索的顶点
    const queue = new Queue();
    // 表示顶点的距离===================================================
    const distances = {};
    // 表示顶点的前溯点=================================================
    const predecessors = {};
    // 将起始顶点入列
    queue.enqueue(startVertex);

    // 初始化每个顶点的距离为 0，前溯点为 null ==========================
    for (let i = 0; i < vertices.length; i++) {
        distances[vertices[i]] = 0;
        predecessors[vertices[i]] = null;
    }

    // 判断队列是否为空
    while(!queue.isEmpty()){
        // 如果队列非空
        // 将队首顶点出队
        const u = queue.dequeue();
        // 获取该顶点的邻接表   
        const neighbors = adjList.get(u);
        // 设置该顶点的状态为被访问（灰色）
        color[u] = Colors.GREY;
        // 遍历该顶点的邻接表
        for (let i = 0; i < neighbors.length; i++) {
            // 获取邻点
            const w = neighbors[i];
            // 判断邻点是否被访问过
            if(color[w] === Colors.WHITE) {
                // 若没被访问（白色），则将其状态改为被访问（灰色），并且加入队列
                color[w] = Colors.GREY;
                // 加 1 来增加 u 和 w 之间的距离========================
                distances[w] = distances[u] + 1;
                // u 是 w 的前溯点=====================================
                predecessors[w] = u;
                queue.enqueue(w);
            }
        }
        // 将该顶点的状态改为已访问（黑色）
        color[u] = Colors.BLACK;
    }
    // 返回一个包含  distances 和 predecessors 的对象 ==================
    return {
        distances,
        predecessors
    }
};
/**
 * 返回指定节点的所有路径
 * @param {*} vertices 顶点列表
 * @param {*} startVertexIndex 起始顶点
 * @param {*} distances 顶点距离列表
 * @param {*} predecessors 顶点前溯点列表
 */
export const findAllPath = (vertices,startVertexIndex, shortestPath) => {
    // 获取起始顶点
    const fromVertex = vertices[startVertexIndex];
    let allPath = [];
    // 遍历其他每个顶点
    for (let i = 1; i < vertices.length; i++) {
        // 获取终止节点
        const toVertex = vertices[i];
        const path = new Stack();
        // 追溯终止顶点到起始顶点的路径
        // 每次循环后将 v 赋值为其前溯点的值，以便于反向追溯这条路径
        for(let v = toVertex; v !== fromVertex; v = shortestPath.predecessors[v]){
            // 将顶点加入栈，最后起始顶点也会被添加到栈中，以得到完整路径。
            path.push(v);
        }
        // 加入起始顶点，得到完整路径
        path.push(fromVertex);
        // 路径字符串，将起始顶点弹出
        let s = path.pop();
        while(!path.isEmpty()){
            // 当栈非空，将栈中的每一个项一处并拼接到字符串 s 后，以形成完整路径。
            s += ' - ' + path.pop();
        }
        allPath.push(s);
    }
    return allPath;
}