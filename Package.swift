import PackageDescription

let package = Package(
    name: "LeafFiddle",
    dependencies: [
      .Package(url: "https://github.com/vapor/vapor.git", majorVersion: 0, minor: 17)
    ]
)
