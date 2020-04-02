import Dictionary from '../06-字典和散列表/Dictionary.js'
export default class Graph{
    constructor(isDirected = false){
        // 接受一个参数来判断图是否有向
        this.isDirected = isDirected;
        // 存储图中所有节点的名字
        this.vertices = [];
        // 使用字典来存储邻接表：键-顶点的名称，值：邻接顶点列表
        this.adjList = new Dictionary();
    }

    // 添加顶点
    addVertex(v){
        // 判断顶点是否已存在
        if(!this.vertices.includes(v)) {
            // 将该顶点添加到顶点列表中
            this.vertices.push(v);
            // 设置顶点 v 对应的字典值为一个空数组
            this.adjList.set(v, []);
        }
    }

    // 添加顶点之间的边
    addEdge(v, w){
        // 在连接顶点之前，需要研制顶点是否存在于图中
        if(!this.adjList.get(v)){
            // 若顶点不存在，则需要加入顶点列表
            this.addVertex(v);
        }
        if(!this.adjList.get(w)){
            this.addVertex(w);
        }
        // 将 w 加入 v 的邻接表中
        this.adjList.get(v).push(w);
        // 判断是否为有向图
        if(!this.isDirected){
            // 若不是，则需要添加一条自 w 到 v 的边
            this.adjList.get(w).push(v);
        }
    }

    // 返回顶点列表
    getVertices(){
        return this.vertices;
    }
    // 返回邻接表
    getAdjList(){
        return this.adjList;
    }

    // 输出图
    toString(){
        let s = '';
        for (let i = 0; i < this.vertices.length; i++) {
            // 输出顶点名称，例如 A ->
            s += `${this.vertices[i]} -> `;
            const neighbors = this.adjList.get(this.vertices[i]);
            for (let j = 0; j < neighbors.length; j++) {
                // 输出邻接顶点,并逐个输入，例如 ABCD
                s += `${neighbors[j]} `;
            }
            s += '\n';
        }
        return s;
    }
}