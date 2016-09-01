import Vapor
import Leaf
import HTTP

let port = Env.get("PORT")?.int ?? 9000
let config = Config(["servers": ["leaf-fiddle": [ "port": Node(port)]]])
let drop = Droplet(config: config)

drop.get { _ in return Response(redirect: "/index.html") }

drop.post("render") { request in
    guard
        let json = try request.data["json"]?.string.flatMap({ try JSON(bytes: $0.bytes) }),
        let rawLeaf = request.data["leaf"]?.string
        else { return "Oh no!" }

    let stem = Stem(workingDirectory: "./")
    let leaf = try stem.spawnLeaf(raw: rawLeaf)
    let rendered = try stem.render(leaf, with: Context(json.makeNode()))
    return rendered.string
}

drop.serve()
