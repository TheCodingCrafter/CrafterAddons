import { drawLineThroughPoints } from '../../BloomCore/RenderUtils'

function drawRing(x, y, z, c, radius, segments, index=-1) {
    let theta = 2 * Math.PI / segments
    let r = 1
    let g = 1
    let b = 1

    if (c in colors) {
        let color = colors[c]
        r = color[0]
        g = color[1]
        b = color[2]
    } else {
        r = 1
        g = 1
        b = 1
    }
    
    const points = []
    for (let i = 0; i < segments; i++) {
        let angle = theta * i
        let px = x + radius * Math.cos(angle)
        let pz = z + radius * Math.sin(angle)
        points.push([px, y, pz])
    }

    drawLineThroughPoints(points, r, g, b, 1, false, 2, true)
    if (devMode) {
        Tessellator.drawString(index, x, y, z);
    }
}

const col = [1, 1, 1, 1]
const colors = {
    "normal": [1, 1, 1],
    "bounce": [0, 1, 0],
    "super": [1, 0, 0],
    "stop": [0, 0, 1],
    "stonk": [1, 0, 1],
    "interact": [0, 1, 1],
    "bonzo": [1, 1, 0],
}
let routes = {}
let shownroutes = []
let devMode = false

function loadRoutes() {
    let data = JSON.parse(FileLib.read("CrafterAddons", "features/f7routes.json"))
    routes = data
}

function loadShownRoutes() {
    let data = JSON.parse(FileLib.read("CrafterAddons", "features/shownRoutes.json"))
    shownroutes = data
}

function saveShownRoutes() {
    FileLib.write("CrafterAddons", "features/shownRoutes.json", JSON.stringify(shownroutes, null, 4))
}

function saveRoutes() {
    FileLib.write("CrafterAddons", "features/f7routes.json", JSON.stringify(routes, null, 4))
}

function drawRoute(route) {
    let points = route.points
    let pointss = []
    for (let i = 0; i < points.length; i++) {
        let point = points[i]
        pointss.push([point[0], point[1], point[2]])
    }
    drawLineThroughPoints(points, col[0], col[1], col[2], col[3], false, 2, false)

    let index = 0
    for (let value of points) {
        drawRing(value[0], value[1], value[2], value[3], 1, 25, index)
        index++
    }
}
 

register("renderWorld", () => {
    // iterate over all routes
    Object.entries(routes).forEach(([key, route]) => {
        if (!shownroutes.includes(key)) return
        drawRoute(route)
    })
})

register("gameLoad", loadRoutes)
register("gameLoad", loadShownRoutes)
register("command", (...args) => {
    if (args[0] === "show") {
        loadShownRoutes()
        let name = args[1]
        let route = routes[name]
        if (!route) {
            ChatLib.chat("&cRoute does not exist")
            return
        }
        shownroutes.push(name)
        ChatLib.chat("&7Showing route &e" + name)
        saveShownRoutes()
    }
    else if (args[0] === "hide") {
        loadShownRoutes()
        let name = args[1]
        let index = shownroutes.indexOf(name)
        if (index > -1) {
            shownroutes.splice(index, 1)
            ChatLib.chat("&7Hiding route &e" + name)
        } else {
            ChatLib.chat("&cRoute is not shown or does not exist")
        }
        saveShownRoutes()
    }
    else if (args[0] === "load") {
        loadRoutes()
        ChatLib.chat("&7Loaded routes")
    }
    else if (args[0] === "save") {
        saveRoutes()
        ChatLib.chat("&7Saved routes")
    }
    else if (args[0] == "add") {
        // add a new route
        let name = args[1]
        // check if the route already exists
        if (routes[name]) {
            ChatLib.chat("&cRoute already exists")
            return
        }

        let points = []
        routes[name] = {points}
        ChatLib.chat("&7Added route &e" + name)
    }
    else if (args[0] == "list") {
        ChatLib.chat("&bRoutes:")
        Object.entries(routes).forEach(([key, value]) => {
            ChatLib.chat("&7" + key)
        })
    }
    else if (args[0] == "remove") {
        let name = args[1]
        if (!routes[name]) {
            ChatLib.chat("&cRoute does not exist")
            return
        }
        delete routes[name]
        ChatLib.chat("&7Removed route &e" + name)
    }

    // actual manipulation of the route
    else if (args[0] == "addPoint") {
        let name = args[1]
        let x = Player.getX()
        let y = Player.getY()
        let z = Player.getZ()
        let route = routes[name]
        if (!route) {
            ChatLib.chat("&cRoute does not exist")
            return
        }
        let type = args[2] || "NONE"
        
        // insert the point at index
        let index = undefined
        if (type == "NONE") {
            type = "normal"
            index = args[2]
        } else {
            index = args[3]
        }

        if (!index) {
            route.points.push([x, y, z, type])
        } else {
            route.points.splice(index, 0, [x, y, z, type])
        }

    }

    else if (args[0] == "removePoint") {
        let name = args[1]
        let route = routes[name]
        if (!route) {
            ChatLib.chat("&cRoute does not exist")
            return
        }

        let index = args[2]
        if (!index) {
            route.points.pop()
        } else {
            route.points.splice(index, 1)
        }
    }

    else if (args[0] == "devMode") {
        devMode = !devMode
        ChatLib.chat("&7Dev mode: " + (devMode ? "&aenabled" : "&cdisabled"))
    }
}).setName("crt").setTabCompletions(["show", "hide", "load", "save", "add", "remove", "list", "addPoint", "removePoint", "devMode"])