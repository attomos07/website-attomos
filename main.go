package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    // Create Gin router
    router := gin.Default()
    
    // Fix: Load templates explicitly
    router.LoadHTMLFiles(
        "templates/index.html",
        "templates/partials/footer.html",
        "templates/partials/navbar.html",
    )
    
    // Serve static files
    router.Static("/static", "./static")
    router.Static("/css", "./css")
    router.Static("/js", "./js")
    
    // Routes
    router.GET("/", func(c *gin.Context) {
        c.HTML(http.StatusOK, "index.html", gin.H{
            "title": "Home Page",
        })
    })
    
    // Start server
    router.Run(":8080")
}